import React, { useState } from 'react';
import portal from '/src/assets/portal.jpeg';
import { useNavigate } from 'react-router-dom';


const Options = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);


  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src={portal}
        alt="Portal Background"
        className="absolute w-full h-full object-cover opacity-90"
      />


      {/* Button Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-10">
        <button
          onClick={() => setShowInstructions(true)}
          className="text-3xl font-audiowide rounded-lg px-10 py-3 font-bold border border-white bg-gradient-to-r from-[#333333] via-[#999999] to-[#444444] text-white hover:shadow-[0_0_20px_#22d3ee] transition duration-300"
          style={{
            textShadow: `
              -1px -1px 0 black,
              1px -1px 0 black,
              -1px 1px 0 black,
              1px 1px 0 black
            `
          }}
        >
          HOW TO PLAY
        </button>


        <button
          onClick={() => navigate('/game')}
          className="text-3xl font-audiowide rounded-lg px-10 py-3 font-bold border border-white bg-gradient-to-r from-[#333333] via-[#999999] to-[#444444] text-white hover:shadow-[0_0_20px_#22d3ee] transition duration-300"
          style={{
            textShadow: `
              -1px -1px 0 black,
              1px -1px 0 black,
              -1px 1px 0 black,
              1px 1px 0 black
            `
          }}
        >
          START
        </button>
      </div>


      {/* Dashboard Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-lg font-audiowide rounded-lg px-6 py-2 font-bold border border-white bg-gradient-to-r from-[#333333] via-[#999999] to-[#444444] text-white hover:shadow-[0_0_20px_#22d3ee] transition duration-300"
          style={{
            textShadow: `
              -1px -1px 0 black,
              1px -1px 0 black,
              -1px 1px 0 black,
              1px 1px 0 black
            `
          }}
        >
          VIEW DASHBOARD
        </button>
      </div>


      {/* Overlay Instructions */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-20 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur p-10 rounded-lg max-w-lg text-white text-center">
            <h2 className="text-3xl font-bold mb-4 font-michroma">How to Play</h2>
            <div className="text-lg mb-6 leading-relaxed text-white">
  <p className="mb-4">
    You will explore three rooms — Egyptian, Spaceship, and Shipwreck — each filled with hidden clues and puzzles.
  </p>
  <ul className="list-disc list-inside space-y-2">
    <li>Your goal is to solve each room’s puzzle to obtain a missing piece of the time portal.</li>
    <li>Interact with objects in the rooms to discover important items that will help you progress.</li>
    <li>You will have <strong>5 minutes per room</strong>.</li>
    <li>If you fail to escape the room, you can redeem an extra <strong>2.5 minutes</strong> by using a time crystal.</li>
    <li>Collect all the portal parts to unlock the final escape and restore the timeline.</li>
  </ul>
  <p className="mt-4 font-semibold">Good luck, adventurer!</p>
</div>
            <button
              onClick={() => setShowInstructions(false)}
              className="bg-blue-800 border border-white font-michroma text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Options;



