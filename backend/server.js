const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json()); // Important if you're sending JSON bodies in requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none'); // Changed from require-corp
  next();
});


// Firebase Admin Setup
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        clientId: process.env.FIREBASE_CLIENT_ID,
        clientC509CertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
    }),
});

// MySQL Setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('No token provided');

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Token verification error', error);
        return res.status(403).send('Invalid Token');
    }
};

// Routes
app.get('/', (req, res) => {
    return res.json('hello from the backend :))');
});

app.get('/users', async (req, res) => {
    const [users] = await db.query('SELECT * FROM users');
    res.json(users);
});

app.post('/store-user', verifyFirebaseToken, (req, res) => {
    console.log("📥 /store-user endpoint hit");
    const { uid, email, name } = req.user;
    const sql = 'INSERT IGNORE INTO users (uid, email, name) VALUES (?, ?, ?)';
    db.query(sql, [uid, email, name || null], (err, result) => {
        if (err) {
            console.error('MySQL insert error:', err);
            return res.status(500).send('Error inserting user');
        }
        return res.status(200).send('User stored successfully');
    });
});

app.get('/rooms/:room_id/puzzles', async (req, res) => {
    const room_id = req.params.room_id;
    const [roomPuzzles] = await db.query('SELECT puzzle_id FROM room_puzzle WHERE room_id = ?', [room_id]);
    const puzzleIds = roomPuzzles.map(row => row.puzzle_id);
    const [puzzles] = await db.query('SELECT * FROM puzzles WHERE puzzle_id IN (?)', [puzzleIds]);
    res.json(puzzles); // ONLY send rows ✅
});
// Generate new progress ID

   
 const progressId = uuidv4(); 

app.post('/rooms/start', verifyFirebaseToken, async (req, res) => {
  console.log('rooms/start endpoint hit ')
  try {
    const { uid } = req.user;
    const { room_id } = req.body;
    const {lives_left}=req.body;

    // Step 1: Check if the user already has an active progress record
    const [user] = await db.query('SELECT id FROM users WHERE uid = ?', [uid]);
    if (!user.length) return res.status(404).send('User not found');
    const userId = user[0].id;

    // Check if the user already has a progress entry in this room
    const [existingProgress] = await db.query(
      'SELECT progress_id, active_room_id FROM game_progress WHERE user_id = ? AND status = "active" ORDER BY last_updated DESC LIMIT 1',
      [userId]
    );

    if (existingProgress.length > 0) {
        // Step 2: If progress exists, update the existing session
        const progressId = existingProgress[0].progress_id;
        await db.query(
            'UPDATE game_progress SET active_room_id=?, last_updated = NOW(), lives_left=? WHERE progress_id = ?',
            [room_id,lives_left,progressId]
        );
        return res.status(200).json({
          progress_id: progressId,
          message: 'Existing session updated to new room',
        });
    } 

    // Step 3: If no progress exists, insert a new progress record
    await db.query(
        `INSERT INTO game_progress (progress_id, user_id, active_room_id,hints_left, lives_left, session_started_at, last_updated)
         VALUES (?, ?, ?,3, 3, NOW(), NOW())`,
        [progressId, userId, room_id]
    );
    await db.query(
       `INSERT INTO user_room_performance (user_id, room_id, started_at) VALUES (?, ?, NOW())`,
       [userId, room_id]
   ); // Respond with the progress ID
    res.status(200).json({
        progress_id: progressId,
        message: 'New Session started',
    });

} catch (error) {
    console.error('Error starting room:', error);
    res.status(500).send('Server error');
}

});


// Update just the puzzle progress endpoint
app.post('/update-puzzle-progress', verifyFirebaseToken, async (req, res) => {
  console.log("Updating puzzle progress for:", req.body);
  try {
    const { progress_id, puzzle_id } = req.body;
    const { uid } = req.user;

     const [user] = await db.query('SELECT id FROM users WHERE uid = ?', [uid]);
    if (!user.length) return res.status(404).send('User not found');
    const userId = user[0].id;


    // Verify ownership
    const [authCheck] = await db.query(
      `SELECT user_id FROM game_progress gp
       JOIN users u ON gp.user_id = u.id
       WHERE gp.progress_id = ? AND u.uid = ?`,
      [progress_id, uid]
    );

    if (!authCheck.length) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

       // Step 1: Check if the user already has an active progress record
  

    // Always insert new row for each solve attempt
    const [result] = await db.query(
      `INSERT INTO user_puzzle_progress 
       (user_id, puzzle_id, is_solved, solved_at, progress_id)
       VALUES (?, ?, 1, NOW(), ?)`,
      [userId, puzzle_id, progress_id]
    );

    console.log("Insert result:", result);

    res.json({ 
      success: true,
      message: 'Puzzle solve recorded'
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Update failed' });
  }
});

app.post('/complete-room', verifyFirebaseToken, async (req, res) => {
    console.log('rooms/complete endpoint hit ')

  try {
    const { progress_id, room_id } = req.body;
    const { uid } = req.user;

    const [user] = await db.query('SELECT id FROM users WHERE uid = ?', [uid]);
    if (!user.length) return res.status(404).send('User not found');
    const userId = user[0].id;

    // Verify user owns this progress_id
    const [authCheck] = await db.query(
      `SELECT 1 FROM game_progress gp
       JOIN users u ON gp.user_id = u.id
       WHERE gp.progress_id = ? AND u.uid = ?`,
      [progress_id, uid]
    );

    if (!authCheck.length) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    // Mark room as completed
    await db.query(
      `UPDATE user_room_performance 
       SET completed_at = NOW(), status = 'completed',points_earned=100
       WHERE user_id = (SELECT user_id FROM game_progress WHERE progress_id = ?)
       AND room_id = ?`,
      [progress_id, room_id]
    );
    
    const nextRoom = parseInt(room_id) + 1;
    if (nextRoom <= 3) { // Assuming you have 3 rooms
      await db.query(
        `INSERT INTO user_room_performance 
         (user_id, room_id, started_at) 
         VALUES (?, ?, NOW())`,
        [userId, nextRoom]
      );
    }
   
    await db.query(
      `UPDATE game_progress 
       SET points_collected = LEAST(COALESCE(points_collected, 0) + 100, 300)
       WHERE progress_id = ?`,
      [progress_id]
    );

  

    res.json({ success: true });
  } catch (error) {
    console.error('Room completion error:', error);
    res.status(500).json({ error: 'Completion failed' });
  }
});


// Start server
app.listen(8081, () => {
    console.log('Listening on port 8081');
});   