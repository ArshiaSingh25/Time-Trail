import React, { useState,useEffect } from 'react';
import scrollPuzzleIcon from '../assets/scroll-puzzle.png'; // Make sure this is imported
import crowImage from '../assets/crow.png';
import sunImage from '../assets/sun_shiny.png';
import cropsImage from '../assets/Corn crop.png';
import openScroll from '../assets/scroll-icon.png'


const initialOrder = [
 { id: 'sun', image: sunImage },
 { id: 'crow', image: crowImage },
 { id: 'crops', image: cropsImage },
];


function Scroll({ onSolve,solved }) {
 const [order, setOrder] = useState(initialOrder);
 const [localSolved, setLocalSolved] = useState(solved);
 const [showPuzzle, setShowPuzzle] = useState(false);


 useEffect(() => {
   setLocalSolved(solved);
 }, [solved]);


 const handleDragStart = (e, index) => {
   e.dataTransfer.setData('index', index);
 };


 const handleDrop = (e, targetIndex) => {
   if(localSolved) return;


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
     setLocalSolved(true);
     if (onSolve) onSolve(); // Notify parent component
   }
 };


 const handleScrollClick = () => {
   setShowPuzzle(true);
 };


 const handleClosePuzzle = () => {
   setShowPuzzle(false);
   // Notify parent component to close
 };


 return (
   <div className="relative w-full h-full">
     {/* Clickable scroll icon (only shown when puzzle is hidden) */}
     {!showPuzzle && (   
         <img className=' absolute top-[40%] cursor-pointer ml-10 left-[1%} w-[75px] h-[100px] object-contain hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] transition-all duration-300'
           src={scrollPuzzleIcon}
           alt="Scroll Puzzle"
           onClick={handleScrollClick}
          />
       
     )}


     {/* Puzzle overlay (shown when scroll is clicked) */}
     {showPuzzle && (
       <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
         <div className="relative w-[600px] h-[500px] bg-cover bg-no-repeat bg-center pt-[60px] pr-[40px] pb-[20px] pl-[40px] flex flex-col justify-start items-center "
           style={{ backgroundImage: `url(${openScroll})`, backgroundPosition: 'center 10%' }}>
          
           {/* Close button */}
           <button
             onClick={handleClosePuzzle}
             className="absolute top-2 right-4 text-white bg-yellow-950  rounded-lg w-10 h-6 flex items-center justify-center"
           >
             X
           </button>


           <p className="text-[18px] text-[#3a2e1a] text-center italic font-serif leading-relaxed mb-16">
             {solved
               ? "✨ Puzzle Solved! The crow led you to the sun.Three chimes, — the veil grows thin, beware what walks at quarter past sin. "
               : '"The shadowed wings rise, golden fields sway below, and above, the blazing eye keeps its eternal glow."'}
           </p>


           {/* Puzzle pieces */}
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


           {/* Proceed Button (only shown when solved) */}
           {solved && (
             <button
               onClick={handleClosePuzzle}
               className="mt-4 px-6 py-3 bg-yellow-700 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300"
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

export default Scroll;
