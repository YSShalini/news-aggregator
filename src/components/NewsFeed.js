import React, { useEffect, useState } from 'react';
import './NewsFeed.css';

const NewsFeed = ({ rssUrl }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [savedNews, setSavedNews] = useState([]); 

  
  useEffect(() => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsItems(data.items.slice(0, 9)); 
      })
      .catch((error) => console.error('Error fetching RSS feed:', error));
  }, [rssUrl]);

  const shareOnWhatsApp = (title, link) => {
    const message = `${title} - ${link}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  const saveHeadline = (title) => {
    setSavedNews((prevSaved) => [...prevSaved, title]);
  };

  return (
    <div className="news-feed">
      <div className="news-grid">
        {newsItems.map((item, index) => (
          <div key={index} className="news-item">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">
              <img
                src={item.enclosure?.link || item.thumbnail}
                alt="News"
                className="news-image"
              />
              <h3 className="news-title">{item.title}</h3>
            </a>
            <div className="news-actions">
              <button onClick={() => shareOnWhatsApp(item.title, item.link)} className="share-btn">
                Share on WhatsApp
              </button>
              <button onClick={() => saveHeadline(item.title)} className="save-btn">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default NewsFeed;
