import React, { useState, useEffect } from 'react';
import timerImage from '/src/assets/timer.png';


function Timer({ onSolve, solved }) {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [inputTime, setInputTime] = useState("");
  const [feedback, setFeedback] = useState("");


  const handleOpen = () => {
    setShowPuzzle(true);
    setSeconds(0);
    setRunning(true);
    setInputTime("");
    setFeedback("");
  };


  const handleClose = () => {
    setShowPuzzle(false);
    setRunning(false);
  };


  const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };


  useEffect(() => {
    if (!running) return;


    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev < 11) return prev + 1;
        clearInterval(interval); // stop at 11
        setRunning(false);
        return 11;
      });
    }, 1000);


    return () => clearInterval(interval);
  }, [running]);


  const formatTime = (totalSeconds) => {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };


  const handleSubmit = () => {
    if (inputTime.trim() === "00:13") {
      setFeedback("✅ Countdown resumed!");
      if (onSolve && !solved) onSolve();
    } else {
      setFeedback("❌ Incorrect. Try again.");
      // Show the feedback message for 2 seconds before resetting
      setTimeout(() => {
        setFeedback("");
        setSeconds(0);
        setRunning(true);
      }, 2000);
    }
  };


  const handleProceed = () => {
    setShowPuzzle(false);
    setRunning(false);
  };


  return (
    <div className="absolute bottom-[55%] left-[36%]">
      {!showPuzzle && (
        <img
          src={timerImage}
          alt="Prime Timer Puzzle"
          className="w-[50px] cursor-pointer hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_aqua]"
          onClick={handleOpen}
        />
      )}


      {showPuzzle && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-black w-[1000px] h-[600px] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white/20 text-4xl text-white px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>


            <div className={`text-9xl border border-white px-4 py-4 absolute top-20 font-mono ${isPrime(seconds) ? "text-red-600" : "text-white"}`}>
              {formatTime(seconds)}
            </div>


            {seconds === 11 && (
              <div className="absolute top-[50%] flex flex-col items-center">
                <p className="text-white text-xl italic mb-4">What will be the next crucial time?</p>
                <input
                  type="text"
                  placeholder="e.g., 00:21"
                  value={inputTime}
                  onChange={(e) => setInputTime(e.target.value)}
                  className="px-4 py-2 rounded text-black text-lg"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-4 px-6 py-2 bg-white font-audiowide border border-black text-black rounded-full"
                >
                  Submit
                </button>
                {feedback && <p className="mt-4 text-white text-lg">{feedback}</p>}


               {feedback === "✅ Countdown resumed!" && (
  <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 rounded-lg text-center">
    <div className="transform -translate-y-10">
      <p className="text-3xl text-white font-audiowide italic mb-6 whitespace-nowrap">
        Countdown resumed!
      </p>
      <button
        onClick={handleProceed}
        className="px-6 py-3 bg-white text-black font-audiowide rounded-full shadow-lg transition-all duration-300"
      >
        Proceed
      </button>
    </div>
  </div>
)}






              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default Timer;





