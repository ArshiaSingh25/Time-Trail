import React, { useState } from 'react';
import scrollMorse from '../assets/scroll-morse.png';
import paper from '../assets/paper.png';
import morseChart from '../assets/morse-chart.jpg';


function Morse({ onSolve, solved }) {
  const [isSolved, setIsSolved] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [input, setInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);


  const handleImageClick = () => {
    setShowPuzzle(true);
  };


  const handleClose = () => {
    setShowPuzzle(false);
    setInput('');
    setShowSuccess(false);
    setShowIncorrect(false);
    if (!isSolved) {
      setIsSolved(true);
      if (onSolve) onSolve(); // Mark puzzle as solved
    }
  };


  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowIncorrect(false); // reset incorrect message when typing
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (input.toLowerCase().trim() === 'directions') {
        setShowSuccess(true);
        setShowIncorrect(false);
      } else {
        setShowIncorrect(true);
      }
    }
  };


  return (
    <div className="absolute bottom-[50%] right-[5%] w-[50px] h-[50px]">
      {!showPuzzle && (
        <div
          className="cursor-pointer hover:scale-105 opacity-50 transition-transform duration-300 hover:drop-shadow-[0_0_5px_black]"
          onClick={handleImageClick}
        >
          <img src={scrollMorse} alt="Scroll Morse" className="w-full h-full object-contain" />
        </div>
      )}


      {showPuzzle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="relative w-[500px] h-[600px] bg-cover bg-no-repeat bg-center pt-[60px] pr-[40px] pb-[20px] pl-[40px] flex flex-col justify-start items-center space-y-4"
            style={{ backgroundImage: `url(${paper})`, backgroundPosition: 'center 10%' }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-4 text-white bg-yellow-950 rounded-lg w-10 h-6 flex items-center justify-center"
            >
              X
            </button>


            {/* Morse Code Text */}
            <p className="text-xl font-mono text-center mb-4">
              −·· ·· ·−· · −·−· − ·· −−− −· ···
            </p>


            {/* Input Field */}
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your decoded answer"
              className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-center"
            />


            {/* Morse Chart */}
            <img
              src={morseChart}
              alt="Morse Code Chart"
              className="w-60 h-65 object-contain absolute bottom-20 border border-black"
            />


            {/* Incorrect Message */}
            {showIncorrect && (
              <p className="absolute bottom-8 text-red-600 font-ocean text-lg">
                Incorrect answer. Try again!
              </p>
            )}


            {/* Success Message */}
            {showSuccess && (
              <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-4">
                <p className="text-white text-2xl font-ocean">Message successfully decoded!</p>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    handleClose();
                  }}
                  className="bg-[#5c4033] text-white border border-white font-ocean px-6 py-2 rounded-lg"
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


export default Morse;



