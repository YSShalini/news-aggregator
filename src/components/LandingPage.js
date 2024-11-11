import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Navbar from './Navbar'; 
import NewsGrid from './NewsGrid'; 

const LandingPage = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [category, setCategory] = useState('');
    const [isGrid, setIsGrid] = useState(false);
    const [tamilNews, setTamilNews] = useState([]); 
    const apiKey = '865ddffae2e24b718e573163a244a932';

    useEffect(() => {
        if (category) {
            fetchNewsByCategory();
        } else {
            fetchLatestNewsRSS();
        }
    }, [category]);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
            }, 2000); 

            return () => clearInterval(interval); 
        }
    }, [isHovered, news]);

    
    const fetchLatestNewsRSS = async () => {
        try {
            const urls = [
                'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', 
                'https://timesofindia.indiatimes.com/rssfeeds/1221656.cms',   
                'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms'  
            ];

            const fetchPromises = urls.map(url => axios.get(`http://localhost:5001/rss-proxy?url=${url}`)); 
            const responses = await Promise.all(fetchPromises);

            let allItems = [];
            const parser = new DOMParser();

            responses.forEach(response => {
                const xml = parser.parseFromString(response.data, 'application/xml');
                const items = Array.from(xml.querySelectorAll('item')).map((item) => ({
                    title: item.querySelector('title').textContent,
                    link: item.querySelector('link').textContent,
                    description: item.querySelector('description').textContent,
                    image: item.querySelector('enclosure')?.getAttribute('url') || item.querySelector('description')?.textContent.match(/src="([^"]+)"/)?.[1], // Extract image URL from description or enclosure
                    pubDate: item.querySelector('pubDate').textContent,
                }));
                allItems = [...allItems, ...items];
            });

            setNews(allItems.slice(0, 10)); 
        } catch (error) {
            console.error('Error fetching RSS news:', error);
            setError('Failed to load news');
        }
    };




const fetchNewsByCategory = async () => {
    try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();

        const fromDate = `${yyyy}-${mm}-${dd}`;
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&pageSize=15&from=${fromDate}`;
        const response = await axios.get(url);

        if (response.data.articles) {
            const filteredArticles = response.data.articles.filter(article => {
                return article.content && !article.content.includes('[Removed]');
            });

            const validatedArticles = filteredArticles.map((article) => ({
                title: article.title || 'No Title',  
                link: article.link || '#',  
                description: article.description || 'No Description',  
                image: article.urlToImage || 'https://via.placeholder.com/150', 
                pubDate: article.publishedAt || 'No Date',  
            }));

            setNews(validatedArticles);
            setIsGrid(true); 
        } else {
            console.error('No articles found:', response.data);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news');
    }
};



useEffect(() => {
    // Fetching the XML data from the provided URL
    fetch('https://tamil.news18.com/commonfeeds/v1/tam/rss/international.xml')
        .then((response) => response.text()) // Parse the response as text (XML)
        .then((xmlText) => {
            const news = parseTamilNewsXml(xmlText);
            setTamilNews(news); // Update state with the parsed news articles
        })
        .catch((error) => console.error('Error fetching news:', error));
}, []);

function parseTamilNewsXml(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
    const news = [];

    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0]?.textContent;
        const link = items[i].getElementsByTagName('link')[0]?.textContent;
        const description = items[i].getElementsByTagName('description')[0]?.textContent;
        
        // Extract image URL from <media:content> tag
        const mediaContent = items[i].getElementsByTagName('media:content')[0];
        const image = mediaContent ? mediaContent.getAttribute('url') : null;

        news.push({ title, link, description, image });
    }

    return news;
}


    return (
        <div className="landing-page">
            <header className="header">
                <h1>NEWS SPHERE</h1>
            </header>

            <Navbar onCategoryChange={(cat) => setCategory(cat)} />

             <div className="news-ticker">
                <div className="ticker-content">
                    {news.slice(0, 10).map((article, index) => (
                        <a 
                            key={index} 
                            href={article.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="ticker-item"
                        >
                            {article.title}
                        </a>
                    ))}
                </div>
            </div>

            <div className="buttons">
                <Link to="/signin">
                    <button className="auth-button">Sign In</button>
                </Link>
                <Link to="/signup">
                    <button className="auth-button">Sign Up</button>
                </Link>
            </div>

            <div className="main-content">
                <div className="carousel-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="carousel">
                        {news.length > 0 ? (
                            <div className="carousel-item" key={currentIndex}>
                                <a href={news[currentIndex].link} target="_blank" rel="noopener noreferrer">
                                    <div className="carousel-image">
                                        <img
                                            src={news[currentIndex].image}
                                            alt={news[currentIndex].title}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="carousel-text">
                                        <h2>{news[currentIndex].title}</h2>
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <p>{error || 'Loading news...'}</p>
                        )}
                    </div>
                </div>

               
                <div className="recent-stories">
    <h3>Recent Stories</h3>
    <div className="news-list">
        {news.slice(0, 6).map((article, index) => (
            <div key={index} className="news-item">
                {article.image && (
                    <img 
                        src={article.image} 
                        alt={article.title} 
                        style={{ 
                            width: '100%', 
                            height: 'auto', 
                            maxHeight: '300px', 
                            objectFit: 'cover', 
                            marginBottom: '10px' 
                        }} 
                    />
                )}
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">
                    <h3>{article.title}</h3>
                </a>
            </div>
        ))}
    </div>


</div>

<div className="tamil-news">
            <div className="news-row">
                {tamilNews.slice(0, 4).map((article, index) => (  // Limit to 6 news articles
                    <div key={index} className="news-item">
                        {article.image ? (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="news-image"
                            />
                        ) : (
                            <div className="no-image">No Image Available</div>
                        )}
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">
                            <h3 className="news-title">{article.title}</h3>
                        </a>
                        
                    </div>
                ))}
            </div>
        </div>
            </div>
        </div>
    );
};

export default LandingPage;
