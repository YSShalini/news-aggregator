import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage"; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/homepage" element={<Homepage />} /> {/* Added Homepage Route */}
</Routes>

      </div>
    </Router>
  );
}

export default App;
