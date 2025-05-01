import React, { useState } from 'react';
import bgImage from './assets/left_wall.png';
import scrollImage from './assets/scroll-icon.png';
import crowImage from './assets/crow.png';
import sunImage from './assets/sun_shiny.png';
import cropsImage from './assets/Corn crop.png';

const initialOrder = [
  { id: 'sun', image: sunImage },
  { id: 'crow', image: crowImage },
  { id: 'crops', image: cropsImage },
];

function App() {
  const [order, setOrder] = useState(initialOrder);
  const [solved, setSolved] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = e.dataTransfer.getData('index');
    if (sourceIndex === null) return;

    const newOrder = [...order];
    const temp = newOrder[targetIndex];
    newOrder[targetIndex] = newOrder[sourceIndex];
    newOrder[sourceIndex] = temp;

    setOrder(newOrder);

    if (
      newOrder[0].id === 'crow' &&
      newOrder[1].id === 'crops' &&
      newOrder[2].id === 'sun'
    ) {
      setSolved(true);
    }
  };

  const handleProceed = () => {
    // Your code for proceeding to the original page or scene
    console.log('Proceed to the original page');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Panel with 50% opacity */}
      <div className="absolute inset-0 bg-yellow-700/80 z-10" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Scroll */}
      <div
        className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-cover bg-no-repeat bg-center pt-[60px] pr-[40px] pb-[20px] pl-[40px] flex flex-col justify-start items-center shadow-lg z-40"
        style={{ backgroundImage: `url(${scrollImage})`, backgroundPosition: 'center 10%' }}
      >
        <p className="text-[18px] text-[#3a2e1a] text-center italic font-serif leading-relaxed mb-16">
          {solved
            ? "✨ Puzzle Solved! The crow led you to the sun."
            : '"The shadowed wings rise, golden fields sway below, and above, the blazing eye keeps its eternal glow."'}
        </p>

        {/* Squares */}
        <div className="flex justify-between w-full max-w-[400px] relative mb-16">
          {order.map((piece, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] bg-yellow-800/60 rounded-lg shadow-md shadow-yellow-900/100 flex justify-center items-center mx-2"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
            >
              <img
                src={piece.image}
                alt={piece.id}
                className="w-18 h-18 object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Proceed Button */}
        {solved && (
          <button
            onClick={handleProceed}
            className="mt-4 px-6 py-3 bg-yellow-700 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300"
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
