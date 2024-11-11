import React, { useState, useEffect, useRef} from 'react';
import './SidebarNavbar.css'; // Ensure your CSS file is correctly linked

const SidebarNavbar = ({ onCategorySelect, onLocalitySelect }) => {
    const [openCategory, setOpenCategory] = useState(null);
    const [openLocality, setOpenLocality] = useState(null);
    const [openCity, setOpenCity] = useState(null); // Track which city is selected
    const [openSubcategory, setOpenSubcategory] = useState(null); // Track subcategories like Tamil/English
    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLocality, setSelectedLocality] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const sidebarRef = useRef(null); // Track subcategories (Tamil/English)
  // Track sidebar visibility
  
  const categories = [
    { name: 'Breaking and Latest News', subcategories: ['Tamil', 'English'] },
    { name: 'Business', subcategories: ['Tamil', 'English'] },
    { name: 'Entertainment', subcategories: ['Tamil', 'English'] },
    { name: 'Automobile', subcategories: ['Tamil', 'English'] },
    { name: 'Sports', subcategories: ['Tamil', 'English'] },
    { name: 'Technology', subcategories: ['Tamil', 'English'] },
    { name: 'India', subcategories: ['Tamil', 'English'] },
   
  ];

  const localities = [
    { name: 'Erode', subcategories: [] },
    { name: 'Coimbatore', subcategories: [] },
    { name: 'Chennai', subcategories: [] },
    { name: 'Mumbai', subcategories: [] },
    { name: 'Delhi', subcategories: [] },
    { name: 'Bangalore', subcategories: [] },
    { name: 'Hyderabad', subcategories: [] },
    { name: 'Kolkata', subcategories: [] },
  ];
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
        setSidebarOpen(false);
    }
};

useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [sidebarOpen]);


  const handleCategoryClick = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    onCategorySelect(category.name);
};

const handleLocalityClick = (locality) => {
    setOpenCity(openCity === locality.name ? null : locality.name);
    onLocalitySelect(locality.name);
};

const toggleSubcategory = (subcategory) => {
    setOpenSubcategory(openSubcategory === subcategory ? null : subcategory);
};

return (
    <div>
        <button className="hamburger-icon" onClick={toggleSidebar}>&#9776;</button>
        <div className={`sidebar-navbar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <a href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}`} onClick={() => handleCategoryClick(category)}>
                            {category.name}
                        </a>
                        {openCategory === category && (
                            <ul>
                                {category.subcategories.map((subcategory, subIndex) => (
                                    <li key={subIndex}>
                                        <a href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}-${subcategory.toLowerCase()}`} onClick={() => toggleSubcategory(subcategory)}>
                                            {subcategory}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
                <li>
                <button onClick={() => setOpenLocality(!openLocality)}>
    Localities
</button>
{openLocality && (
    <ul>
        {localities.map((locality, index) => (
            <li key={index}>
                <a href={`#${locality.name.replace(/\s+/g, '-').toLowerCase()}`} onClick={() => handleLocalityClick(locality)}>
                    {locality.name}
                </a>
                {openCity === locality.name && (
                    <ul>
                        {locality.subcategories.map((subcategory, subIndex) => (
                            <li key={subIndex}>
                                <a href={`#${locality.name.replace(/\s+/g, '-').toLowerCase()}-${subcategory.toLowerCase()}`} onClick={() => toggleSubcategory(subcategory)}>
                                    {subcategory}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ))}
    </ul>
)}

                </li>
            </ul>
        </div>
        {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
);
};

export default SidebarNavbar;