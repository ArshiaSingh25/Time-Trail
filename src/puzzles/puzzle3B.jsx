import React, { useEffect, useState, useRef } from 'react';
import boxImage from '/src/assets/box.png';


const seaCreatures = ['🐠', '🐙', '🦀', '🐬', '🦞', '🐳', '🦐', '🐡'];


function Box({ onSolve, solved }) {
  const [isSolved, setIsSolved] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [gameResult, setGameResult] = useState(null); // "success" | "fail"
  const intervalRef = useRef(null);


  const handleImageClick = () => {
    setShowPuzzle(true);
    startGame();
  };


  const handleClose = () => {
    setShowPuzzle(false);
    stopGame();
  };


  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameResult(null);
    setShowOverlay(false);


    intervalRef.current = setInterval(() => {
      const newGrid = Array(9).fill(null);
      const randomIndex = Math.floor(Math.random() * 9);
      const randomEmoji = seaCreatures[Math.floor(Math.random() * seaCreatures.length)];
      newGrid[randomIndex] = randomEmoji;
      setGrid(newGrid);
    }, 800);
  };


  const stopGame = () => {
    clearInterval(intervalRef.current);
    setGameActive(false);
    setGrid(Array(9).fill(null));
  };


  const handleWhack = (index) => {
    if (grid[index]) {
      setScore((prev) => prev + 1);
      const newGrid = [...grid];
      newGrid[index] = null;
      setGrid(newGrid);
    }
  };


  // Timer countdown
  useEffect(() => {
    if (!gameActive) return;


    if (timeLeft <= 0) {
      stopGame();
      const result = score >= 20 ? 'success' : 'fail';
      setGameResult(result);
      setShowOverlay(true);


      if (result === 'success') {
        setIsSolved(true);
        if (onSolve) onSolve();
      }
      return;
    }


    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 800);


    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);


  const handleTryAgain = () => {
    startGame();
  };


  const handleProceed = () => {
    setShowPuzzle(false);
    setShowOverlay(false);
  };


  return (
    <div className="absolute bottom-[2%] left-[21%] w-[200px] h-[200px]">
      {!showPuzzle && (
        <div
          className="cursor-pointer hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_black]"
          onClick={handleImageClick}
        >
          <img src={boxImage} alt="box" className="w-full h-full object-contain" />
        </div>
      )}


      {showPuzzle && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-sky-600 opacity-90 w-[1000px] h-[600px] rounded-lg shadow-lg p-6 flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white/20 text-4xl text-white px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>


            {/* Timer & Score */}
            <div className="absolute top-2 left-2 bg-sky-900 text-white px-4 py-2 rounded font-ocean text-xl">
              Time: {timeLeft}s
            </div>
            <div className="absolute top-2 right-16 bg-sky-900 text-white px-4 py-2 rounded font-ocean text-xl">
              Score: {score}/20
            </div>


            <p className="text-white text-2xl font-ocean mt-4 mb-6">
              Whack the sea creatures!
            </p>


            {/* Grid */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {grid.map((cell, index) => (
                <div
                  key={index}
                  onClick={() => handleWhack(index)}
                  className="w-[100px] h-[100px] bg-sky-900 rounded-lg flex items-center justify-center border-2 border-white text-4xl cursor-pointer hover:scale-110 transition-transform"
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>


          {/* Overlay on timeout */}
          {showOverlay && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60">
              <div className="bg-white/50 p-8 rounded-lg flex flex-col items-center gap-4 w-[400px]">
                <p className="text-3xl font-ocean text-black text-center">
                  {gameResult === 'success'
                    ? 'Success! You whacked them all!'
                    : 'Time’s up! Try again?'}
                </p>
                <button
                  onClick={gameResult === 'success' ? handleProceed : handleTryAgain}
                  className="px-6 py-2 bg-blue-800 text-black border border-white rounded-lg font-ocean text-xl hover:scale-105 transition-transform"
                >
                  {gameResult === 'success' ? 'Proceed' : 'Try Again'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


export default Box;



