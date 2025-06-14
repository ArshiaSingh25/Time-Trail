// App.jsx
import React from "react";
import { AuthProvider } from "./contexts/authContext/index.jsx";
import Home from "./components/home/index.jsx";
import Login from "./components/auth/login/index.jsx";
import Register from "./components/auth/register/index.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./components/home/index.jsx";
import Landing from "./components/landing/index.jsx";
import Room1 from "./room1.jsx";
import Game from "./game.jsx";
import Scroll from "./puzzles/puzzle1A.jsx";
import Room2 from "./room2.jsx";
import Room3 from "./room3.jsx";
import StartPage from "./components/game/startPage.jsx";
import Options from "./components/game/options.jsx";
import SunDial from "./puzzles/puzzle1B.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game" element={<Game/>}/>
          <Route path="/room2" element={<Room2 />} />
           <Route path="/startPage" element={<StartPage />} />
<Route path="/options" element={<Options/>}/>
<Route path ="/sundial" element={<SunDial/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
