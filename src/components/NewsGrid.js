// NewsGrid.js
import React from 'react';
import { formatTime } from './utils'; 
import './NewsGrid.css';

const NewsGrid = ({ news }) => {
  return (
    <div className="news-grid">
      {news.map((article) => (
        <div key={article.url} className="news-item">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <p>Published: {formatTime(article.publishedAt)}</p> 
          <img src={article.urlToImage} alt={article.title} />
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
