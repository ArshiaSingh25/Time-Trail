import React, { useState } from 'react';
import planeImage from '/src/assets/plane4.png';
import starMapImage from '/src/assets/starmap.png'; // <-- Add your star map image here


function StarMap() {
  const [showClue, setshowClue] = useState(false);


  const handleOpen = () => setshowClue(true);
  const handleClose = () => {
    setshowClue(false);
  }


  return (
    <div className="absolute bottom-[37%] left-[47%]">
      {!showClue && (
        <img
          src={planeImage}
          alt="Star Map"
          className="w-[50px] rotate-[15deg] cursor-pointer hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_aqua]"
          onClick={handleOpen}
        />
      )}


      {showClue && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-black w-[1000px] h-[600px] rounded-lg shadow-lg p-6 flex items-center justify-center">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white/20 text-4xl text-white px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>
            <p className="text-white font-audiowide text-2xl italic absolute top-10">Watch where stars align...</p>
            <img
              src={starMapImage}
              alt="Star Map Clue"
              className="w-[600px] h-[600px] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}


export default StarMap;





