import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signin.css';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/signin", { email, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsLoading(false);
      navigate("/homepage");
    } catch (error) {
      console.error("Sign in error:", error);
      setErrorMessage("Invalid credentials, please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <header className="header">
        <h1 className="header-title">
          <span className="news">NEWS</span>
          <br />
          <span className="sphere">SPHERE</span>
        </h1>
      </header>

      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

         <div className="input-container">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Signin;
