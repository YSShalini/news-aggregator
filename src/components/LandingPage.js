import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewsGrid from '../components/NewsGrid';
import Navbar from '../components/Navbar';
import './LandingPage.css'; // Import your CSS file for styling

const LandingPage = () => {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState('general');

    const apiKey = '865ddffae2e24b718e573163a244a932'; // Your API key

    useEffect(() => {
        fetchNews();
    }, [category]);

    const fetchNews = async () => {
        try {
            // Get today's date in YYYY-MM-DD format
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();

            // Create the date string
            const fromDate = `${yyyy}-${mm}-${dd}`;

            // Update the URL to include the from date
            const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&pageSize=15&from=${fromDate}`;
            console.log('Fetching URL:', url);

            const response = await axios.get(url);
            console.log('Response:', response.data);

            if (response.data.articles) {
                // Filter out articles with '[Removed]' in their content
                const filteredArticles = response.data.articles.filter(article => {
                    return article.content && !article.content.includes('[Removed]');
                });

                setNews(filteredArticles);
                console.log('Fetched articles:', filteredArticles); // Log the filtered articles
            } else {
                console.error('No articles found:', response.data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    return (
        <div>
            <header className="header">
                <h1>NewsSphere</h1> {/* Header Title */}
            </header>
            <Navbar 
                onCategoryChange={setCategory} 
            />
            <div className="buttons">
                <Link to="/signin">
                    <button className="auth-button">Sign In</button>
                </Link>
                <Link to="/signup">
                    <button className="auth-button">Sign Up</button>
                </Link>
            </div>
            <NewsGrid news={news} />
        </div>
    );
};

export default LandingPage;
