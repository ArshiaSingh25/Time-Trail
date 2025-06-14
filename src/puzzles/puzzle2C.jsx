import React, { useState } from 'react';
import planeImage from '/src/assets/keypad.png';


function Passcode({ onSolve, solved }) {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');


  const correctCode = "571250";


  const handleOpen = () => {
    setShowPuzzle(true);
    setInput('');
    setFeedback('');
  };


  const handleClose = () => {
    setShowPuzzle(false);
  };


  const handleButtonClick = (digit) => {
    if (input.length < 6) {
      setInput((prev) => prev + digit);
    }
  };


  const handleClear = () => {
    setInput('');
    setFeedback('');
  };


  const handleSubmit = () => {
    if (input === correctCode) {
      setFeedback('✅ Access Granted');
      if (onSolve && !solved) onSolve();
    } else {
      setFeedback('❌ Incorrect Code');
      setTimeout(() => {
        setInput('');
        setFeedback('');
      }, 2000);
    }
  };


  const handleProceed = () => {
    setShowPuzzle(false);
  };


  return (
    <div className="absolute bottom-[53%] left-[31.5%]">
      {!showPuzzle && (
        <img
          src={planeImage}
          alt="Keypad"
          className="w-[40px] cursor-pointer hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_aqua]"
          onClick={handleOpen}
        />
      )}


      {showPuzzle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-black w-[1000px] h-[600px] rounded-lg shadow-lg p-6 text-white font-terminal">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white/20 text-4xl text-white px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>


            <div className="flex flex-col items-center justify-center h-full">
              {/* Keypad Container */}
              <div className="bg-black border-4 border-green-500 rounded-xl p-8">
                {/* Input Field */}
                <div className="text-4xl tracking-widest bg-black text-green-400 px-8 py-4 border-2 border-green-500 rounded mb-6 text-center w-full">
                  {input.padEnd(6, '_')}
                </div>


                {/* Keypad */}
                <div className="grid grid-cols-3 gap-4 text-2xl">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⏎'].map((key) => (
                    <button
                      key={key}
                      onClick={() =>
                        key === 'C'
                          ? handleClear()
                          : key === '⏎'
                          ? handleSubmit()
                          : handleButtonClick(key.toString())
                      }
                      className="bg-black text-green-400 border-2 border-green-500 px-6 py-4 rounded-lg hover:bg-green-900 transition"
                    >
                      {key}
                    </button>
                  ))}
                </div>


                {/* Feedback */}
                {feedback && (
                  <p className="text-xl text-center mt-6">{feedback}</p>
                )}
              </div>


              {/* Success Overlay */}
              {feedback === '✅ Access Granted' && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 rounded-lg text-center">
                  <div className="transform -translate-y-10">
                    <p className="text-3xl text-green-400 font-audiowide italic mb-6 whitespace-nowrap">
                      Access Granted!
                    </p>
                    <button
                      onClick={handleProceed}
                      className="px-6 py-3 bg-green-500 text-black font-audiowide rounded-full shadow-lg transition-all duration-300"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Passcode;





