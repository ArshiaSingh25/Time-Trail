import React from 'react';
import shipwreck from './assets/shipwreck.png';
import Morse from './puzzles/puzzle3A.jsx';
import Box from './puzzles/puzzle3B.jsx';
import Map from './puzzles/puzzle3C_clue.jsx';
import Chest from './puzzles/puzzle3C.jsx';
import { useState } from 'react';
import { auth } from './firebase/firebase.js';


const Room3 = ({ progressId, onRoomComplete }) => {
 const [solvedPuzzles, setSolvedPuzzles] = React.useState([]);
 const [roomPuzzles,setRoompuzzles]=useState([7, 8, 9]);




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
          onRoomComplete?.();
        }
       return newSolved;
     });
   } catch (error) {
     console.error('Puzzle solve error:', error);
   }
 };




 return (
   <div className="relative w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${shipwreck})` }}>
     <Morse
      onSolve={() => handlePuzzleSolve(7)}
      solved={solvedPuzzles.includes(7)}
    />
    <Box  
      onSolve={() => handlePuzzleSolve(8)}
      solved={solvedPuzzles.includes(8)}
    />
    <Map/>
    <Chest
      onSolve={() => handlePuzzleSolve(9)}
      solved={solvedPuzzles.includes(9)}
    />  
       
   </div>
 );
};




export default Room3;







