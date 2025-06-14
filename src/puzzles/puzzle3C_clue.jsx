import React, { useState } from 'react';
import mapImage from '/src/assets/map-prop.png';
import mapClue from '/src/assets/map-clue.png';


function Map() {
  const [showClue, setshowClue] = useState(false);


  const handleOpen = () => setshowClue(true);
  const handleClose = () => setshowClue(false);


  return (
    <div className="absolute bottom-[57%] left-[13%]">


      {!showClue && (
        <img
          src={mapImage}
          alt="Map"
          className="w-[50px] rotate-[-10deg] cursor-pointer hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_black]"
          onClick={handleOpen}
        />
      )}


      {showClue && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative z-50 relative bg-sky-600 opacity-70 w-[1000px] h-[600px] rounded-lg shadow-lg p-6 flex items-center justify-center">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white/20 text-4xl text-white px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>
            <p className="text-white font-ocean text-2xl italic absolute top-10">Follow the treasure, but watch where you go...</p>
            <img
              src={mapClue}
              alt="Map Clue"
              className="w-[600px] h-[600px] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}


export default Map;



