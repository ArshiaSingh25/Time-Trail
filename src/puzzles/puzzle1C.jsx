import React, { useEffect, useState } from 'react';
import paintingIcon from '../assets/painting-icon.png';
import scrollBG from '../assets/scroll-icon.png';
import image1 from '/src/assets/image1.png';
import image2 from '/src/assets/image2.png';
import image3 from '/src/assets/image3.png';
import image4 from '/src/assets/image4.png';
import image5 from '/src/assets/image5.png';
import image6 from '/src/assets/image6.png';
import image7 from '/src/assets/image7.png';
import image8 from '/src/assets/image8.png';


const images = [image1, image2, image3, image4, image5, image6, image7, image8];


const generateShuffledTiles = () => {
  const pairs = images.flatMap((img) => [img, img]); // two of each image
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((img, index) => ({
    id: index,
    value: img, // this will now be the image path
    flipped: false,
    matched: false,
  }));
};


function MemoryGame({ onSolve, solved }) {
  const [isSolved, setIsSolved] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState([]);


  useEffect(() => {
    if (showPuzzle) {
      setTiles(generateShuffledTiles());
      setSelected([]);
      setIsSolved(false);
    }
  }, [showPuzzle,solved]);


  const handleTileClick = (index) => {
    if (tiles[index].flipped || tiles[index].matched || selected.length === 2) return;


    const updatedTiles = [...tiles];
    updatedTiles[index].flipped = true;
    const newSelected = [...selected, index];


    setTiles(updatedTiles);
    setSelected(newSelected);


    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      setTimeout(() => {
        const matched = updatedTiles[first].value === updatedTiles[second].value;
        if (matched) {
          updatedTiles[first].matched = true;
          updatedTiles[second].matched = true;
        } else {
          updatedTiles[first].flipped = false;
          updatedTiles[second].flipped = false;
        }
        setTiles([...updatedTiles]);
        setSelected([]);


        // Check for complete match
        if (updatedTiles.every((tile) => tile.matched)) {
            setIsSolved(true);
          if (onSolve) onSolve();
        }
      }, 800);
    }
  };


  const handlePaintingClick = () => setShowPuzzle(true);
  const handleClosePuzzle = () => {
    setShowPuzzle(false);
  }


  return (
    <div className="absolute top-[30%] left-[60%] w-[100px] h-[100px]">
      {!showPuzzle && (
        <div
          className="cursor-pointer hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_5px_gold]"
          onClick={handlePaintingClick}
        >
          <img src={paintingIcon} alt="Open Memory Puzzle" />
        </div>
      )}


      {showPuzzle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="relative w-[600px] h-[600px] bg-cover bg-no-repeat bg-center pt-[60px] px-[40px] pb-[20px] flex flex-col items-center"
            style={{ backgroundImage: `url(${scrollBG})`, backgroundPosition: 'center 10%' }}
          >
            <button
              onClick={handleClosePuzzle}
              className="absolute top-2 right-4 text-white bg-yellow-950 rounded-lg w-10 h-6 flex items-center justify-center"
            >
              X
            </button>


            {/* Memory Grid */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {tiles.map((tile, index) => (
                <div
                  key={tile.id}
                  className={`w-16 h-16 border border-yellow-600 rounded shadow-md flex items-center justify-center text-lg font-bold cursor-pointer transition-transform duration-300 ${
                    tile.flipped || tile.matched ? 'bg-yellow-200' : 'bg-yellow-100'
                  }`}
                  onClick={() => handleTileClick(index)}
                >
                  {tile.flipped || tile.matched ? (
                    <img src={tile.value} alt="Tile" className="w-full h-full object-cover rounded" />
                    ) : ('')
                  }


                </div>
               
              ))}
            </div>
            {isSolved && (
                <div className="mt-6 text-center">
                    <p className="text-[18px] text-[#3a2e1a] text-center italic font-serif leading-relaxed mb-10">
                        🎉 You've matched all the pieces!
                    </p>    
                    <button
                        onClick={handleClosePuzzle}
                        className="mt-2 px-6 py-3 bg-yellow-700 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300"
                    >
                    Proceed
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
     
    </div>
  );
}


export default MemoryGame;



