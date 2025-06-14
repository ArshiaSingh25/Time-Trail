import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { auth } from '../../firebase/firebase';
import { useEffect, useState } from 'react';
import dashboardBg from '/Users/arshiasingh/Desktop/timetrail/src/assets/dashboardbg.png';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    roomsCompleted: 0,
    puzzlesSolved: 0,
    timeCrystals: 3
  });

  useEffect(() => {
    if (auth.currentUser) {
      setUser({
        name: auth.currentUser.displayName || 'Time Traveler',
        email: auth.currentUser.email,
      });
      
      // Here you would fetch actual user stats from your backend
      // fetchUserStats();
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate('/');
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleStartGame = () => {
    navigate('/game');
  };

 return (
  <div
    className="relative w-screen h-screen bg-cover bg-center flex flex-col"
    style={{ backgroundImage: `url(${dashboardBg})` }}
  >
    {/* Header */}
    <div className="flex justify-between items-center p-4 bg-black bg-opacity-50">
      <h1 className="text-3xl font-michroma text-white">TimeTrail Dashboard</h1>
      <button
        onClick={handleSignOut}
        className="px-6 py-2 font-michroma border border-white bg-gradient-to-r from-[#333333] via-[#999999] to-[#444444] text-white rounded-lg hover:shadow-[0_0_20px_#22d3ee] transition duration-300"
        style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }}
      >
        Sign Out
      </button>
    </div>

    {/* Content */}
    <div className="flex flex-1 p-8">
      {/* Profile Section */}
      <div className="w-1/3 bg-white bg-opacity-10 rounded-xl p-6 shadow-lg mr-4 backdrop-blur-md text-white">
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover mb-4"
          />
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-300">{user?.email}</p>
        </div>

        <button
          onClick={() => navigate('/options')}
          className="w-full py-3 text-xl font-michroma font-bold border border-white bg-gradient-to-r from-[#333333] via-[#999999] to-[#444444] text-white rounded-lg hover:shadow-[0_0_20px_#22d3ee] transition duration-300 mb-4"
          style={{ textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black" }}
        >
          Continue Adventure
        </button>

        <div className="p-4 bg-white bg-opacity-10 rounded-lg text-white">
          <h3 className="font-semibold mb-2 text-lg">Game Progress</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Rooms Explored:</span>
              <span className="font-bold">3/3</span>
            </div>
            <div className="flex justify-between">
              <span>Puzzles Solved:</span>
              <span className="font-bold">9/9</span>
            </div>
            <div className="flex justify-between">
              <span>Time Crystals:</span>
              <span className="font-bold">{stats.timeCrystals}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-1 bg-white bg-opacity-10 rounded-xl p-6 shadow-lg backdrop-blur-md text-white">
        <h2 className="text-2xl font-michroma mb-6">Your Time Travel Stats</h2>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-200">Fastest Completion</h3>
            <p className="text-3xl font-bold">4:32</p>
            <p className="text-sm text-blue-100">Room 2: Space Odyssey</p>
          </div>

          <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-semibold text-green-200">Puzzle Mastery</h3>
            <p className="text-3xl font-bold">83%</p>
            <p className="text-sm text-green-100">Average success rate</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-lg">Recent Achievements</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-2">✓</span>
              Completed Room 1: Medieval Times
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-2">✓</span>
              Solved 5 puzzles without hints
            </li>
            <li className="flex items-center text-gray-400">
              <span className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white mr-2">3</span>
              Complete all rooms (in progress)
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="bg-black bg-opacity-50 text-white text-center p-3 font-michroma">
      © 2025 TimeTrail - A Historical Puzzle Adventure
    </div>
  </div>
);

};

export default Dashboard;