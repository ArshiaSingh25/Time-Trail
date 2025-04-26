const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const admin = require('firebase-admin');
const fetch=require('dotenv');
require('dotenv').config();


const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json()); // Important if you're sending JSON bodies in requests

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

  require('dotenv').config();

  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('No token provided');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("🔓 Decoded user:", decodedToken);

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

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
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

// Start server
app.listen(8081, () => {
  console.log('listening');
});
