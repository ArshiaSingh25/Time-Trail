import React, { useState, useEffect } from 'react';
import Room1Puzzle1 from './room-1-puzzle-1';

import bgImage from './assets/bg-egyptian_blank.jpg';
import inventoryIcon from './assets/inventory-icon.png';
import hintIcon from './assets/hint-icon.png';
import heartIcon from './assets/heart-icon.png';
import scrollPuzzleIcon from './assets/scroll-puzzle.png';

function App() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [activePuzzle, setActivePuzzle] = useState(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Lives */}
      <div className="absolute top-5 left-8 flex items-center gap-3 z-20">
        {[1, 2, 3].map((_, i) => (
          <img key={i} src={heartIcon} alt="Heart" className="w-12 h-12" />
        ))}
      </div>

      {/* Inventory */}
      <button
        className="absolute top-5 right-5 bg-yellow-700/60 rounded p-2 z-30"
        onClick={() => alert('Inventory clicked!')}
      >
        <img src={inventoryIcon} alt="Inventory" className="w-12 h-12" />
      </button>

      {/* Timer */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-yellow-700/60 px-6 py-3 rounded z-30">
        <span className="text-white font-bold text-3xl">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>

      {/* Hint */}
      <div
        className="absolute bottom-5 right-5 w-12 h-12 bg-yellow-700/80 rounded-full flex justify-center items-center cursor-pointer z-30"
        onClick={() => alert('Hint clicked!')}
      >
        <img src={hintIcon} alt="Hint" className="w-10 h-10" />
      </div>

      {/* Scroll Puzzle Object (only if puzzle not active) */}
      {!activePuzzle && (
        <div
          className="absolute top-[40%] left-[1%] w-[450px] h-[450px] cursor-pointer z-30 transition-all duration-300 hover:drop-shadow-[0_0_5px_gold]"
          onClick={() => setActivePuzzle(1)}
        >
          <img
            src={scrollPuzzleIcon}
            alt="Scroll Puzzle"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Puzzle Layer */}
      {activePuzzle === 1 && <Room1Puzzle1 />}
    </div>
  );
}

export default App;
