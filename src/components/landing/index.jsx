import React from 'react';
import Login from '../auth/login';
import landingbg from '/src/assets/landingbg.png'
import { useNavigate } from 'react-router-dom';
//import startPage from 'src/components/game/startPage.jsx';

const Landing = () => {
    const navigate=useNavigate();
    return (
      <div className="relative h-screen w-full">
        <img
          src={landingbg}
          alt="Time Travel Background"
          className="absolute w-full h-full object-cover"
        />
    
        <div className="relative p-20 justify-center h-full text-white text-center">
          <h1 className="font-audiowide text-4xl md:text-8xl font-bold mb-7">TIME TRAIL</h1>
    
          <h2 className="mx-auto mt-4 w-fit overflow-hidden whitespace-nowrap border-r-0 text-white text-3xl font-michroma animate-typewriter1">
          A crystal frozen forever
          </h2>

          <h3 className="mx-auto mt-4 w-fit overflow-hidden whitespace-nowrap border-r-0 text-white text-3xl font-michroma opacity-0 animate-typewriter2">
          until a brave voyager dares to step in and turn the chapter
          </h3>
    
          {/* Static Button */}
          <div className="absolute bottom-40 left-1/2 h-[150px] w-[250px] transform -translate-x-1/2">
            <button
              onClick={() => navigate('/startPage')}
              className="text-xl font-audiowide  rounded-lg px-10 py-3 font-bold border border-white bg-gradient-to-r from-[#333333] via-[#999999] to-[#444444] hover:shadow-[0_0_20px_#22d3ee] transition duration-300"
              style={{
                textShadow: `
                  -1px -1px 0 black,
                   1px -1px 0 black,
                  -1px  1px 0 black,
                   1px  1px 0 black
                `
              }}
            >
              GET STARTED
            </button>
          </div>
          
        </div>
       
       
      </div>
    );
    
    
};

export default Landing;
