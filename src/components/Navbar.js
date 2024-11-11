import React from 'react';
import './Navbar.css';

const Navbar = ({ onCategoryChange }) => {
  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  return (
    <nav className="navbar">
      <ul className="nav-categories">
        <li onClick={() => handleCategoryChange('business')}>BUSINESS</li>
        <li onClick={() => handleCategoryChange('entertainment')}>ENTERTAINMENT</li>
        <li onClick={() => handleCategoryChange('general')}>GENERAL</li>
        <li onClick={() => handleCategoryChange('health')}>HEALTH</li>
        <li onClick={() => handleCategoryChange('science')}>SCIENCE</li>
        <li onClick={() => handleCategoryChange('sports')}>SPORTS</li>
        <li onClick={() => handleCategoryChange('technology')}>TECHNOLOGY</li>
      </ul>

      
    </nav>
  );
};

export default Navbar;
