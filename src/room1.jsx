import React, { useState, useEffect } from 'react';
import egyptian_room from './assets/egyptian_room.png';
import scrollPuzzleIcon from './assets/scroll-puzzle.png';
import { auth } from './firebase/firebase.js';
import Scroll from './puzzles/puzzle1A.jsx';
import MemoryGame from './puzzles/puzzle1C.jsx';
import SunDial from './puzzles/puzzle1B.jsx'

function Room1({ progressId, onRoomComplete }) {
 const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [roomPuzzles,setRoompuzzles]=useState([1,2,3]);
    const [showRoomCompletePopup, setShowRoomCompletePopup] = useState(false);


useEffect(() => {
  console.log('Solved puzzles:', solvedPuzzles);
}, [solvedPuzzles]);

 const handlePuzzleSolve = async (puzzleId) => {
   try {
     const user = auth.currentUser;
     if (!user) return;
    
     const response = await fetch('http://localhost:8081/update-puzzle-progress', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${await user.getIdToken()}`
       },
       body: JSON.stringify({
         progress_id: progressId,
         puzzle_id: puzzleId
       })
     });


     if (!response.ok) throw new Error('Update failed');
    
     setSolvedPuzzles(prev => {
       const newSolved = [...prev, puzzleId];
      
       // Check if all puzzles in the room are solved
       if (roomPuzzles.every(puzzle => newSolved.includes(puzzle))) {
          setShowRoomCompletePopup(true); 
       }
      
       return newSolved;
     });
    
     // If you need room completion logic, add it here
   } catch (error) {
     console.error('Puzzle solve error:', error);
   }
 };


 return (
   <div className="relative w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${egyptian_room})` }}>
     <Scroll
       onSolve={() => handlePuzzleSolve(1)} // Hardcoded puzzle_id 1 for simplicity
       solved={solvedPuzzles.includes(1)}
     />
      <SunDial
       onSolve={() => handlePuzzleSolve(2)} // Hardcoded puzzle_id 1 for simplicity
       solved={solvedPuzzles.includes(2)}
     />
      <MemoryGame
       onSolve={() => handlePuzzleSolve(3)} // Hardcoded puzzle_id 1 for simplicity
       solved={solvedPuzzles.includes(3)}
     />
   {showRoomCompletePopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="backdrop-blur-lg bg-white/20 border border-white/10 p-10 rounded-2xl shadow-lg max-w-md text-center animate-fade-in">
      <h2 className="text-3xl font-extrabold text-white mb-4">🎉 Congratulations!</h2>
      <p className="text-white text-lg mb-6">
        You’ve successfully retrieved quantum flux capacitor!
      </p>
      <button
        onClick={() => {
          setShowRoomCompletePopup(false);
          onRoomComplete();
        }}
        className="bg-white/20 text-white hover:bg-white/10 font-semibold py-2 px-6 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
      >
        Go to Next Room
      </button> 
    </div>
  </div>
)}

   </div>
 );
}


export default Room1;

