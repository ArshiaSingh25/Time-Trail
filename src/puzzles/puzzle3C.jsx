import React, { useState } from 'react';
import chest from '/src/assets/chest.png';
import chestMap from '/src/assets/chest-map.png';


const correctAnswer = ['E', 'S', 'W', 'S', 'E'];


function Chest({ onSolve }) {
  const [tiles, setTiles] = useState(['N', 'N', 'N', 'N', 'N']);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);


  const handleTileClick = (index) => {
    setTiles((prev) => {
      const newTiles = [...prev];
      const next = { N: 'S', S: 'W', W: 'E', E: 'N' };
      newTiles[index] = next[newTiles[index]];
      return newTiles;
    });
  };


  const checkAnswer = () => {
    if (JSON.stringify(tiles) === JSON.stringify(correctAnswer)) {
      setIsSuccess(true);
      setMessage('Success! You solved the puzzle!');
      setIsSolved(true);
      if (onSolve) onSolve();
    } else {
      setMessage('Wrong sequence! Try again.');
      setIsSuccess(false);
      setTimeout(() => {
        setTiles(['N', 'N', 'N', 'N', 'N']);
        setMessage('');
      }, 2000);
    }
  };


  const handleClose = () => setShowPuzzle(false);
  const handleProceed = () => {
  setShowPuzzle(false);
  setIsSolved(false);      // Hide success overlay
  setIsSuccess(false);     // Reset success state
  setMessage('');          // Clear message
 
};
  const handleOpen = () => setShowPuzzle(true);


  return (
    <div className="absolute bottom-[-5%] right-[23%] w-[200px] h-[200px]">
      {!showPuzzle && (
        <div
          className="cursor-pointer rotate-[9deg] hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_black]"
          onClick={handleOpen}
        >
          <img src={chest} alt="Treasure Chest" className="w-full h-full object-contain" />
        </div>
      )}


      {showPuzzle && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[1000px] h-[600px] rounded-lg shadow-lg p-6 bg-sky-700 bg-opacity-70 flex flex-col items-center justify-start">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white/20 text-4xl text-white px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>


            {/* Title */}
            <p className="text-white font-ocean text-2xl italic mb-4 mt-2">
              Follow the treasure, and the answer will follow...
            </p>


            {/* Chest Map Image */}
            <img
              src={chestMap}
              alt="Chest Map"
              className="w-[700px] h-[700px] object-contain rounded-lg"
            />


            {/* Tiles */}
            <div className="flex gap-4 mt-4 absolute top-[20%]">
              {tiles.map((letter, index) => (
                <div
                  key={index}
                  onClick={() => handleTileClick(index)}
                  className="w-20 h-20 text-white flex items-center justify-center text-2xl font-bold border-2 border-gray-400 rounded cursor-pointer hover:brightness-110 bg-[rgba(70,59,25,0.6)] font-ocean"
                >
                  {letter}
                </div>
              ))}
            </div>


            {/* Submit Button */}
            <button
              onClick={checkAnswer}
              className="py-2 px-4 bg-blue-500 text-white text-2xl border border-white rounded hover:bg-blue-600 font-ocean absolute bottom-[20%]"
            >
              Submit
            </button>
          </div>
        </div>
      )}


      {/* Success Overlay */}
      {isSolved && isSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black/60 text-white rounded-lg p-6 w-[400px] flex flex-col items-center">
            <div className="text-2xl font-ocean mb-4 text-center">{message}</div>
            <button
              onClick={handleProceed}
              className="py-2 px-4 bg-green-500 text-xl text-white rounded hover:bg-green-600 font-ocean"
            >
              Proceed
            </button>
          </div>
        </div>
      )}


      {/* Failure Overlay */}
      {message && !isSuccess && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black/60 text-white rounded-lg p-6 w-[400px] flex items-center justify-center">
            <div className="text-2xl font-ocean text-center">{message}</div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Chest;



