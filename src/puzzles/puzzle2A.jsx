import React, { useState, useEffect } from 'react';
import pipesImage from '/src/assets/pipe.png';
import pipe1 from '/src/assets/pipe1.png';
import pipe2 from '/src/assets/pipe2.png';
import pipe3 from '/src/assets/pipe3.png';
import pipe4 from '/src/assets/pipe4.png';
import pipe8 from '/src/assets/pipe8.png';


const pipeImages = {
  0: pipe1,
  1: pipe2,
  2: pipe3,
  6: pipe4,
  7: pipe8,
};


const pipeImageStyles = {
  0: "w-[230px] h-[180px] object-contain absolute bottom-0 right-0 -mr-11",
  1: "w-[230px] h-[225px] object-contain -ml-12",
  2: "w-[230px] h-[114px] object-contain absolute top-0 -ml-12",
  6: "w-[230px] h-[114px] object-contain absolute bottom-0 mr-8",
  7: "w-[225px] h-[222px] object-contain transform -translate-x-9",
};


function Pipes({ onSolve,solved }) {
  const [rotations, setRotations] = useState(Array(8).fill(0));
  const [isSolved, setIsSolved] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const solvedState = {
    0: 270,
    1: 90,
    2: 270,
    6: 180,
    7: 90,
  };


  const handleImageClick = () => setShowPuzzle(true);


  const handleClose = () => {
    setShowPuzzle(false);
    if (!isSolved) {
      setIsSolved(true);
    }
  };


  const handleTileClick = (index) => {
    setRotations((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + 90) % 360;
      return updated;
    });
  };


  useEffect(() => {
    const allSolved = Object.entries(solvedState).every(
      ([index, expected]) => rotations[Number(index)] === expected
    );


    if (allSolved && !isSolved) {
      setIsSolved(true);
      if (onSolve) onSolve();
        const timer = setTimeout(() => {
        setShowSuccessMessage(true);
      }, 500);
    }
  }, [rotations, onSolve, isSolved,solved]);

 
      


  return (
    <div className="absolute top-[18%] left-[14.5%] w-[100px] h-[100px]">
      {!showPuzzle && (
        <div
          className="rotate-[45deg] cursor-pointer hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_aqua]"
          onClick={handleImageClick}
        >
          <img src={pipesImage} alt="Oxygen Pipes Puzzle" className="w-full h-full object-contain" />
        </div>
      )}


      {showPuzzle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-gray-600/80 w-[1000px] h-[600px] rounded-lg shadow-lg p-6 flex flex-col items-center">


            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white text-2xl px-3 rounded-full hover:bg-red-600"
            >
              ✕
            </button>


            <div className="grid grid-cols-4 grid-rows-2 w-full h-full">
                 <p className="absolute z-10 left-11 text-2xl font-bold font-audiowide text-white">Start</p>

              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={`flex items-center justify-center ${index < 4 ? "mt-14" : ""}`}>
                  <div
                    onClick={() => handleTileClick(index)}
                    className="w-[230px] h-[230px] bg-black rounded-lg border border-white flex items-center justify-center cursor-pointer transition-transform duration-300"
                    style={{
                      transform: `rotate(${rotations[index]}deg)`,
                      transformOrigin: 'center',
                      willChange: 'transform',
                    }}
                  >
                    {pipeImages[index] && (
                      <img
                        src={pipeImages[index]}
                        alt={`Pipe ${index}`}
                        className={`${pipeImageStyles[index]} pointer-events-none`}
                      />
                    )}
                  </div>
                </div>
              ))}
            <p className="absolute bottom-2 right-11 font-bold text-2xl font-audiowide text-white">End</p>
            </div>


            {isSolved &&  showSuccessMessage && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 rounded-lg">
                <p className="text-3xl text-white font-audiowide italic mb-6">
                  You've restored the oxygen flow!
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-white text-black font-audiowide rounded-full shadow-lg transition-all duration-300"
                >
                  Proceed
                </button>
              </div>
            )}


          </div>
        </div>
      )}
    </div>
  );
}


export default Pipes;





