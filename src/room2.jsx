import React from 'react';
import spaceship from './assets/spaceship.png';
import Pipes from './puzzles/puzzle2A';
import Timer from './puzzles/puzzle2B.JSX';
import StarMap from './puzzles/puzzle2C_clue';
import Passcode from './puzzles/puzzle2C';
import { useState } from 'react';
import { auth } from './firebase/firebase';

const Room2 = ({ progressId, onRoomComplete }) => {
  // For this example, we'll assume Room2 has one puzzle with ID 2
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [roomPuzzles,setRoompuzzles]=useState([4,5,6]);
  const [showRoomCompletePopup, setShowRoomCompletePopup] = useState(false);
  
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
        // Check if all puzzles are solved (in this case just puzzle 2)
        

        if (roomPuzzles.every(puzzle => newSolved.includes(puzzle))) {
          setShowRoomCompletePopup(true); 
         
        }

        return newSolved;
      });
    } catch (error) {
      console.error('Puzzle solve error:', error);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-cover bg-center" 
         style={{ backgroundImage: `url(${spaceship})` }}>
      <Pipes
      onSolve={() => handlePuzzleSolve(4)} // Hardcoded puzzle_id 1 for simplicity
        solved={solvedPuzzles.includes(4)}
      />
      <Timer
      onSolve={() => handlePuzzleSolve(5)} // Hardcoded puzzle_id 1 for simplicity
        solved={solvedPuzzles.includes(5)}
      />
     <StarMap/>
     <Passcode
     onSolve={() => handlePuzzleSolve(6)} // Hardcoded puzzle_id 1 for simplicity
      solved={solvedPuzzles.includes(6)}
     />
      {showRoomCompletePopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="backdrop-blur-lg bg-white/20 border border-white/10 p-10 rounded-2xl shadow-lg max-w-md text-center animate-fade-in">
      <h2 className="text-3xl font-extrabold text-white mb-4">🎉 Congratulations!</h2>
      <p className="text-white text-lg mb-6">
        You’ve successfully retrieved stabiliser!
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
};

export default Room2;