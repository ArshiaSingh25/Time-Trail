import React from 'react';
import Login from '../auth/login';
import landingbg from '/Users/arshiasingh/Desktop/timetrail/src/assets/landingbg.png'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate=useNavigate();
  return (
    <div className="relative h-screen w-full">
      <img
        src={landingbg}
        alt="Time Travel Background"
        className="absolute w-full h-full object-cover"
      />
      
      <div className="relative p-20 justify-center h-full text-white  text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-7">Time Trail</h1>
        <button onClick={()=>navigate('/login')}className="text-xl rounded-lg  px-6 py-2 font-bold border border-cyan-400 text-white hover:shadow-[0_0_20px_#22d3ee] transition duration-300">Can you Escape?</button>
      </div>
    </div>
  );
};

export default Landing;
