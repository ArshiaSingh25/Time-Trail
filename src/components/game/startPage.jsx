import React, { useState } from 'react';
import portalbg from '/intro_animation.mp4';
import Login from '/src/components/auth/login/index.jsx';

const StartPage = () => {
  const [videoEnded, setVideoEnded] = useState(false);

  const showLogin = () => {
    setVideoEnded(true);
  };

  return (
    <div className="relative bg-black w-full h-screen overflow-hidden">
      {!videoEnded && (
        <>
          {/* Video Background */}
          <video
            autoPlay
            muted
            playsInline
            className="w-screen h-screen object-cover opacity-80"
            onEnded={showLogin}
          >
            <source src={portalbg} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Skip Button */}
          
          <button
            onClick={showLogin}
            className="absolute top-4 right-4 z-20 text-white text-2xl font-audiowide rounded-lg px-10 py-3 font-bold border border-white bg-gradient-to-r from-[#333333] via-[#999999] to-[#444444] hover:shadow-[0_0_20px_#22d3ee] transition duration-300"
            style={{
              textShadow: `
                -1px -1px 0 black,
                 1px -1px 0 black,
                -1px  1px 0 black,
                1px  1px 0 black
      `
            }}>
          
          SKIP
        </button>
        </>
      )}

      {/* Hello World Component after video ends or skip */}
      {videoEnded && (
        <div className="justify-center items-center bg-black">
          <Login />
        </div>
      )}
    </div>
  );
};

export default StartPage;
