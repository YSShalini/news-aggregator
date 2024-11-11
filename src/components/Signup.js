import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import NewsImage from '../assets/news.jpeg'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    interest: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/signup', formData);
      if (response.status === 201) {
        window.alert('User registered successfully!');
        setFormData({ username: '', email: '', password: '', interest: '', location: '' });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      window.alert('Signup failed! Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <img src={NewsImage} alt="Sign Up" className="signup-image" /> 
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="interest"
          placeholder="Interest"
          value={formData.interest}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
