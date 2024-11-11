import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Homepage.css';
import SidebarNavbar from './SidebarNavbar';
import NewsFeed from './NewsFeed'; 

const Homepage = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories] = useState(['general', 'business', 'entertainment', 'automobile', 'sports', 'technology', 'india']);
    const [selectedSource, setSelectedSource] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [savedArticles, setSavedArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Breaking and Latest News');
    const [selectedLocality, setSelectedLocality] = useState('Erode');  
  
    const rssFeeds = {
        breaking: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
        latest: "https://tamil.news18.com/commonfeeds/v1/tam/rss/international.xml",
        businessEnglish: "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms",
        businessTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/business.xml",
        entertainmentEnglish: "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms",
        entertainmentTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/entertainment.xml",
        automobileEnglish: "https://timesofindia.indiatimes.com/rssfeeds/74317216.cms",
        automobileTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/automobile.xml",
        sportsEnglish: "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms",
        sportsTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/sports.xml",
        technologyEnglish: "https://timesofindia.indiatimes.com/rssfeeds/66949542.cms",
        technologyTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/technology.xml",
        indiaEnglish: "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
        indiaTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/national.xml"
    };

    const localityFeeds = {
        erodeTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/erode.xml",
        coimbatoreEnglish: "https://timesofindia.indiatimes.com/rssfeeds/7503091.cms",
        coimbatoreTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/coimbatore.xml",
        chennaiEnglish: "https://timesofindia.indiatimes.com/rssfeeds/2950623.cms",
        chennaiTamil: "https://tamil.news18.com/commonfeeds/v1/tam/rss/chennai.xml",
        mumbaiEnglish: "https://timesofindia.indiatimes.com/rssfeeds/-2128838597.cms",
        delhiEnglish: "https://timesofindia.indiatimes.com/rssfeeds/-2128839596.cms",
        bangaloreEnglish: "https://timesofindia.indiatimes.com/rssfeeds/-2128833038.cms",
        hyderabadEnglish: "https://timesofindia.indiatimes.com/rssfeeds/-2128816011.cms",
        kolkataEnglish: "https://timesofindia.indiatimes.com/rssfeeds/-2128830821.cms"
    };

    const sources = [
        { name: 'BBC News', code: 'bbc-news' },
        { name: 'CNN', code: 'cnn' },
        { name: 'Fox News', code: 'fox-news' },
        { name: 'Al Jazeera', code: 'al-jazeera-english' },
        { name: 'Reuters', code: 'reuters' },
        { name: 'HuffPost', code: 'the-huffington-post' },
    ];
    

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                let url;
                if (searchQuery.trim()) {
                    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=en&sortBy=publishedAt&apiKey=865ddffae2e24b718e573163a244a932&pageSize=15`;
                } else if (selectedSource) {
                    url = `https://newsapi.org/v2/top-headlines?sources=${selectedSource}&language=en&apiKey=865ddffae2e24b718e573163a244a932&pageSize=15`;
                } else {
                    url = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=865ddffae2e24b718e573163a244a932&pageSize=15`;
                }

                const response = await axios.get(url);
                setNews(response.data.articles);
            } catch (err) {
                if (err.response && err.response.status === 429) {
                    setError("You have exceeded the number of allowed requests. Please try again later.");
                } else {
                    setError(`An error occurred while fetching news: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        const debounceFetchNews = setTimeout(fetchNews, 1000);
        return () => clearTimeout(debounceFetchNews);
    }, [selectedCategory, selectedSource, searchQuery]);

     
        const handleCategorySelect = (category) => {
            console.log('Selected category:', category);
              };
        
           const handleLocalitySelect = (locality) => {
            console.log('Selected locality:', locality);
          };
          const handleSourceChange = (e) => {
            setSelectedSource(e.target.value);
            setSearchQuery('');
            
            document.getElementById("extranews").scrollIntoView({ behavior: "smooth" });
        };
        
        const handleSearchSubmit = (e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
                setSelectedSource('');
                
                document.getElementById("extranews").scrollIntoView({ behavior: "smooth" });
            }
        };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const shareOnWhatsApp = (title, url) => {
        const message = encodeURIComponent(`${title} - ${url}`);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
        window.open(whatsappUrl, '_blank');
      };
      

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
    };

    const handleProfileOptionClick = (option) => {
        console.log(`Clicked on ${option}`);
        setIsProfileDropdownOpen(false);
    };

    const handleSaveArticle = (article) => {
        const articleTitle = article.title;
        const articleUrl = article.url;
    
        if (!savedArticles.some(saved => saved.title === articleTitle)) {
            setSavedArticles(prevArticles => [
                ...prevArticles,
                { title: articleTitle, url: articleUrl }
            ]);
            alert("Article saved successfully!");
        } else {
            alert("Article already saved.");
        }
    };
    
    

    return (
        <div className="homepage-container">
            <button onClick={toggleDarkMode} className="toggle-dark-mode">
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>

            <h1 className="header">NEWS SPHERE</h1>
            <div className="profile-dropdown">
            <span onClick={toggleProfileDropdown} style={{ cursor: 'pointer', fontSize: '40px' }}>
                   <FontAwesomeIcon icon={faUserCircle} />
            </span>
                {isProfileDropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={() => handleProfileOptionClick("View Profile")}>View Profile</button>
                        <button onClick={() => handleProfileOptionClick("Settings")}>Settings</button>
                        <button onClick={() => handleProfileOptionClick("Logout")}>Logout</button>
                        <div className="saved-articles-section">
                            <h3>Saved Articles</h3>
                            <ul>
                                {savedArticles.length === 0 ? (
                                    <li>No saved articles.</li>
                                ) : (
                                    savedArticles.map((article, index) => (
                                        <li key={index}>
                                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                {article.title}
                                            </a>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

                    

            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search latest news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="source-dropdown-container">
                <select value={selectedSource} onChange={handleSourceChange} className="source-dropdown">
                    <option value="">Select News Source</option>
                    {sources.map((source) => (
                        <option key={source.code} value={source.code}>
                            {source.name}
                        </option>
                    ))}
                </select>
            </div>

            <SidebarNavbar 
                onCategorySelect={setSelectedCategory} 
                onLocalitySelect={setSelectedLocality} 
            />  
            <section id="breaking-and-latest-news"></section>
            <h5>BREAKING NEWS</h5>          
            <NewsFeed rssUrl={rssFeeds.breaking} saveArticle={handleSaveArticle} />
            
            <NewsFeed rssUrl={rssFeeds.latest} saveArticle={handleSaveArticle}/>
            <section id="business"></section>
            <h5>BUSINESS</h5>    
            <NewsFeed rssUrl={rssFeeds.businessEnglish} saveArticle={handleSaveArticle}/>
            <NewsFeed rssUrl={rssFeeds.businessTamil} saveArticle={handleSaveArticle}/>
            <section id="entertainment"></section>
            <h5>ENTERTAINMENT</h5>    
            <NewsFeed rssUrl={rssFeeds.entertainmentEnglish}saveArticle={handleSaveArticle} />
             <NewsFeed rssUrl={rssFeeds.entertainmentTamil} saveArticle={handleSaveArticle} />
            <section id="automobile"></section>
            <h5>AUTOMOBILE</h5>    
            <NewsFeed rssUrl={rssFeeds.automobileEnglish} saveArticle={handleSaveArticle}/>
            <NewsFeed rssUrl={rssFeeds.automobileTamil} saveArticle={handleSaveArticle}/>
            <section id="sports"></section>
            <h5>SPORTS</h5>    
            <NewsFeed rssUrl={rssFeeds.sportsEnglish} saveArticle={handleSaveArticle}/>
            <NewsFeed rssUrl={rssFeeds.sportsTamil}saveArticle={handleSaveArticle} />
            <section id="technology"></section>
            <h5>TECHNOLOGY</h5>    
            <NewsFeed rssUrl={rssFeeds.technologyEnglish} saveArticle={handleSaveArticle}/>
            <NewsFeed rssUrl={rssFeeds.technologyTamil}saveArticle={handleSaveArticle} />
            <section id="india"></section>
            <h5>INDIA</h5>    
            <NewsFeed rssUrl={rssFeeds.indiaEnglish} saveArticle={handleSaveArticle}/>
            <NewsFeed rssUrl={rssFeeds.indiaTamil} saveArticle={handleSaveArticle}/>
            
            <section id="erode">
    <h5>ERODE</h5>    
    <NewsFeed rssUrl={localityFeeds.erodeTamil} saveArticle={handleSaveArticle}/>
    
</section>

<section id="coimbatore">
    <h5>COIMBATORE</h5>    
    <NewsFeed rssUrl={localityFeeds.coimbatoreEnglish} saveArticle={handleSaveArticle}/>
    <NewsFeed rssUrl={localityFeeds.coimbatoreTamil} saveArticle={handleSaveArticle}/>
   
</section>

<section id="chennai">
    <h5>CHENNAI</h5>    
    <NewsFeed rssUrl={localityFeeds.chennaiEnglish} saveArticle={handleSaveArticle}/>
   
    <NewsFeed rssUrl={localityFeeds.chennaiTamil} saveArticle={handleSaveArticle}/>
   
</section>

<section id="delhi">
    <h5>DELHI</h5>    
    <NewsFeed rssUrl={localityFeeds.delhiEnglish}saveArticle={handleSaveArticle} />
    
</section>

<section id="mumbai">
    <h5>MUMBAI</h5>    
    <NewsFeed rssUrl={localityFeeds.mumbaiEnglish} saveArticle={handleSaveArticle}/>
    
</section>

<section id="bangalore">
    <h5>BANGALORE</h5>    
    <NewsFeed rssUrl={localityFeeds.bangaloreEnglish}saveArticle={handleSaveArticle} />
   
</section>

<section id="kolkata">
    <h5>KOLKATA</h5>    
    <NewsFeed rssUrl={localityFeeds.kolkataEnglish}saveArticle={handleSaveArticle} />
   
</section>

<section id="hyderabad">
    <h5>HYDERABAD</h5>     
    <NewsFeed rssUrl={localityFeeds.hyderabadEnglish}saveArticle={handleSaveArticle}/>
    
</section>

            
                
<section id="extranews"></section>
<div className="news-grid">
  {loading && <p className="loading">Loading news...</p>}
  {error && <p className="error">{error}</p>}
  {!loading && !error && news.length > 0 ? (
    news.map((article, index) => (
      <article key={index} className="news-article">
        {article.urlToImage && (
          <img src={article.urlToImage} alt={article.title} className="article-image" />
        )}
        <h3 className="article-title">{article.title}</h3>
        <p className="article-description">{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read more
        </a>
        <button 
          className="share-btn" 
          onClick={() => shareOnWhatsApp(article.title, article.url)}
        >
          Share on WhatsApp
        </button>
      </article>
    ))
  ) : (
    !loading && <p>No news articles found.</p>
  )}
</div>

        </div>
    );
};

export default Homepage;   


