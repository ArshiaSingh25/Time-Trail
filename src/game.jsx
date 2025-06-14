import { useState, useEffect, Suspense } from "react";
import Room1 from "./room1";
import Room3 from "./room3";
import Room2 from "./room2";
import React from "react";
import { useNavigate } from "react-router-dom";
import inventoryIcon from './assets/inventory-icon.png';
import time_crystal from './assets/time_crystal.png'
import { auth } from "./firebase/firebase";
import A1 from './assets/A1.png';
import A2 from './assets/A2.png';
import A3 from './assets/A3.png';


const Game = () => {
  const [currentRoom, setCurrentRoom] = useState(1);
  const [livesLeft,setLivesleft]=useState(3);
  const [timeLeft,setTimeLeft]=useState(300);
  const [ showPopup, setShowPopup]=useState(false);
  const [inventory,openInventory]=useState(false);
  const [roomSolved,setRoomSolved]=useState(false);
  const [progressId,setProgressId]=useState(null);
    const [showGameCompletePopup, setShowGameCompletePopup] = useState(false);
 const [collectedArtifacts, setCollectedArtifacts] = useState([]);


const artifactImages = {
  1: A1,
  2: A2,
  3: A3
};
  const navigate=useNavigate();


   useEffect(() => {
      const startSession = async () => {
          const user = auth.currentUser;
         if (!user || progressId) return;
          const token = await user.getIdToken();
          const response = await fetch('http://localhost:8081/rooms/start', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ room_id: currentRoom,lives_left:livesLeft })  // maybe pass currentRoom, or always 1 at start
          });

          if (response.ok) {
              const data = await response.json();             
               setProgressId(data.progress_id);
          } else {
              console.error('Failed to start game session');
          }
      };

    startSession();
  }, [currentRoom,progressId,livesLeft]);  // Only run once on mount




  useEffect(() => {
      const timer = setInterval(() => {
          setTimeLeft(prev => {
              if (prev > 0) return prev - 1;
              if (prev === 0) {
                  setShowPopup(true);
              }
              return prev;
          });
      }, 1000);

      return () => clearInterval(timer);
  }, []);


const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;


 const handleUseLife=()=>{
  setShowPopup(false);
  setLivesleft(prev=>prev-1);
  setTimeLeft(150);
}

const handleGoHome=()=>{
  navigate('/dashboard');
}



const handleRoomCompletion = React.useCallback(async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
  
    const token = await user.getIdToken();
    const nextRoom = currentRoom + 1;

    setCollectedArtifacts(prev => [...prev, currentRoom]);

    
   
     // Complete current room
    const completeResponse = await fetch('http://localhost:8081/complete-room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        progress_id: progressId,
        room_id: currentRoom
      })
    });
     if (!completeResponse.ok) {
      throw new Error('Failed to complete room');
    }
     // Start next room
     if (currentRoom == 3) {
        setShowGameCompletePopup(true);
        return;
      }

    const startResponse = await fetch('http://localhost:8081/rooms/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ room_id: nextRoom,lives_left:livesLeft })
    });
     if (!startResponse.ok) {
      throw new Error('Failed to start next room');
    }
     const { progress_id } = await startResponse.json();
    setProgressId(progress_id);
    setCurrentRoom(nextRoom);
    setTimeLeft(300);
    setShowPopup(false);
   } catch (error) {
    console.error('Room transition error:', error);
    // Handle error (show to user, etc.)
  }
}, [currentRoom, progressId,livesLeft]);



const InventoryPopup = () => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg max-w-3xl w-full">
      <h2 className="text-3xl font-semibold text-white mb-8 text-center">Your Collected Artifacts</h2>

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((roomId) => (
          <div
            key={roomId}
            className="backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl flex flex-col items-center shadow-md transition-transform hover:scale-105"
          >
            {collectedArtifacts.includes(roomId) ? (
              <>
                <img
                  src={artifactImages[roomId]}
                  alt={`Room ${roomId} Artifact`}
                  className="w-28 h-28 object-contain mb-2"
                />
                <span className="text-white">Room {roomId}</span>
              </>
            ) : (
              <div className="w-28 h-28 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-gray-300 text-sm">
                Empty
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => openInventory(false)}
          className="bg-white/20 text-white backdrop-blur-sm px-6 py-2 rounded-lg border border-white/30 hover:bg-white/30 transition-colors"
        >
          Close Inventory
        </button>
      </div>
    </div>
  </div>
);


   return (
  <>
  {currentRoom === 1 && (
<Room1
  progressId={progressId}
  onRoomComplete={handleRoomCompletion}  // This must be passed
/>
)}
{currentRoom === 2 && (
  <Room2
    progressId={progressId}
    onRoomComplete={handleRoomCompletion}
  />
)}
 {currentRoom === 3 && (
  <Room3
    progressId={progressId}
    onRoomComplete={handleRoomCompletion}
  />
)}
  {/*timer*/}
  <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/40 rounded-lg px-6 py-3  z-30">
      <span className="text-white font-bold text-3xl">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
   {/*inventory*/}
   <button
        className="absolute top-5 right-5 bg-white/40 rounded p-2 z-30"
        onClick={() => openInventory(true)}
      >
        <img src={inventoryIcon} alt="Inventory" className="w-12 h-12" />
      </button>
      
      {/* Inventory Popup */}
      {inventory && <InventoryPopup />}


  {/**lives */}
   <div className="absolute top-5 left-8 flex items-center gap-3 z-20">
          {Array.from({length:livesLeft}).map((_, i) => (
            <img key={i} src={time_crystal} alt="Heart" className="w-12 h-12" />
          ))}
        </div>




  {/** popup shown when timer ends */}
  {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="backdrop-blur-lg bg-white/20 border border-white/10 rounded-xl p-6 shadow-2xl text-center max-w-sm w-full">
      {livesLeft > 0 ? (
        <>
          <p className="text-lg font-semibold text-white mb-4">
            Do you want to use a time crystal?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleUseLife}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded transition shadow-md hover:shadow-lg"
            >
              Yes
            </button>
            <button
              onClick={handleGoHome}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded transition shadow-md hover:shadow-lg"
            >
              No
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg font-semibold text-white mb-4">No lives left</p>
          <button
            onClick={handleGoHome}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded transition shadow-md hover:shadow-lg"
          >
            Go Home
          </button>
        </>
      )}
    </div>
  </div>
)}

 
    {showGameCompletePopup && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
    <div className="bg-white/10 border border-white/20 backdrop-blur-2xl p-8 rounded-2xl shadow-xl max-w-md w-full text-center text-white">
      <h2 className="text-3xl font-extrabold mb-4">🌟 Amazing Achievement!</h2>
      <p className="mb-6 text-lg">You've successfully completed all rooms!</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setShowGameCompletePopup(false);
            navigate('/dashboard');
          }}
          className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => {
            setShowGameCompletePopup(false);
            setCurrentRoom(1);
            setLivesleft(3);
            setTimeLeft(300);
            setProgressId(null); // Start new session
          }}
          className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Restart Game
        </button>
         <button
    onClick={() => {
      openInventory(true);
      setShowGameCompletePopup(false);
    }}
    className="bg-white/30 hover:bg-white/50 text-white font-bold py-2 px-4 rounded"
  >
    Check Inventory
  </button>
      </div>
    </div>
  </div>
)}

  </>
  )
};




export default Game;

