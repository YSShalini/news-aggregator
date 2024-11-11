// NavbarHome.js
import React, { useState } from 'react';
import './Navbar.css';

const NavbarHome = ({ onSearch, onCategoryChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  return (
    <nav className="navbar">
      <ul className="nav-categories">
        <li onClick={() => handleCategoryChange('business')}>Business</li>
        <li onClick={() => handleCategoryChange('entertainment')}>Entertainment</li>
        <li onClick={() => handleCategoryChange('general')}>General</li>
        <li onClick={() => handleCategoryChange('health')}>Health</li>
        <li onClick={() => handleCategoryChange('science')}>Science</li>
        <li onClick={() => handleCategoryChange('sports')}>Sports</li>
        <li onClick={() => handleCategoryChange('technology')}>Technology</li>
      </ul>

      <div className="nav-actions">
         <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search latest news..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </form>

        <button className="signin-btn">Sign In</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default NavbarHome;
