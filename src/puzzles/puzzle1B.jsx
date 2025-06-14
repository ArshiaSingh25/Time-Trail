import React, { useState, useEffect } from 'react';
import { LocalizationProvider, TimeClock } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Button } from '@mui/material';
import clockIcon from '../assets/clock-scroll.png';
import openScroll from '../assets/scroll-icon.png';

function SunDial({ onSolve, solved }) {
  const [value, setValue] = useState(new Date());
  const [localSolved, setLocalSolved] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);

  // Sync localSolved with the solved prop
  useEffect(() => {
    setLocalSolved(solved);
  }, [solved]);

  const handleTimeChange = (newValue) => {
    if (!newValue || localSolved) return;

    setValue(newValue);

    const hours = newValue.getHours();
    const minutes = newValue.getMinutes();

    console.log('⏰ Selected time:', `${hours}:${minutes}`);

    // Check for 3:15 PM (15:15 in 24-hour format)
    if ((hours === 15 || hours === 3) && minutes === 15) {
      console.log('✅ Correct time selected!');
      setLocalSolved(true);
      if (onSolve) onSolve(); // Notify parent component
    }
  };

  const handleScrollClick = () => {
    setShowPuzzle(true);
  };

  const handleClosePuzzle = () => {
    setShowPuzzle(false);
  };

  return (
    <div className="relative w-[50px] h-[50px] bottom-[30%] left-[70%]">
      {!showPuzzle && (
        <div
          className="relative w-[50px] h-[50px] cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_5px_gold]"
          onClick={handleScrollClick}
        >
          <img src={clockIcon} alt="Clock Puzzle Icon" />
        </div>
      )}

      {showPuzzle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="relative w-[600px] h-[500px] bg-cover bg-no-repeat bg-center pt-[60px] pr-[40px] pb-[20px] pl-[40px] flex flex-col justify-start items-center"
            style={{ backgroundImage: `url(${openScroll})`, backgroundPosition: 'center 10%' }}
          >
            <button
              onClick={handleClosePuzzle}
              className="absolute top-2 right-4 text-white bg-yellow-950 rounded-lg w-10 h-6 flex items-center justify-center"
            >
              X
            </button>

            <p className="text-[18px] text-[#3a2e1a] text-center italic font-serif leading-relaxed mb-10">
              {localSolved
                ? "✨ You synced with the right moment in time!"
                : '"Align the clock to a time seen in the past..."'}
            </p>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box className="bg-white p-4 rounded-lg shadow-lg">
                <TimeClock
                  value={value}
                  onChange={handleTimeChange}
                  ampm
                />
              </Box>
            </LocalizationProvider>

            {localSolved && (
              <button
                onClick={handleClosePuzzle}
                className="mt-6 px-6 py-3 bg-yellow-700 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300"
              >
                Proceed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SunDial;