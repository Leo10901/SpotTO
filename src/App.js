import React, { useState, useEffect } from 'react';
import Orb from './Orb.jsx';
import './Orb.css';
import opportunitiesData from './opportunities.json';
import spotImage from './test.jpg';
import { Helmet } from 'react-helmet';
import faviconImage from './favicon.ico';



// Remove default browser margins/padding and add Inter font
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  max-width: 20rem;          /* max-w-xs = 320px */
  }
  
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .nav-container {
    width: 100%;
    z-index: 1000;
    padding: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: transparent;
  }

  .nav-links {
    display: flex;
    gap: 30px;
  }

  .nav-links a {
    text-decoration: none;
    color: white !important;
    font-weight: bold;
    transition: color 0.1s ease;
    padding: 8px 16px;
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
  }

  .nav-links a:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 120px;
    padding-bottom: 80px;
    z-index: 50;
    text-align: center;
    position: relative;
  }

  .orb-container-wrapper {
    position: relative;
    width: 500px;
    height: 500px;
    margin-bottom: 60px;
  }

  .spotto-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 64px;
    font-weight: bold;
    z-index: 60;
    text-shadow: 0 0 30px rgba(255,255,255,0.5);
    font-family: Helvetica, Arial, sans-serif;
    letter-spacing: -0.05em;
    font-stretch: condensed;
    line-height: 1;
  }

  .text-content {
    color: white;
    text-align: center;
    margin: 20px 0;
    font-family: 'Inter', sans-serif;
  }

  .text-content h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 0 0 20px rgba(255,255,255,0.3);
    font-family: 'Inter', sans-serif;
  }

  .text-content h2 {
    font-size: 1.8rem;
    margin: 20px 0;
    font-family: 'Inter', sans-serif;
  }

  .text-content p {
    font-size: 1.2rem;
    margin: 10px 0;
    opacity: 0.9;
    font-family: 'Inter', sans-serif;
  }

 .search-container {
            margin: 30px auto;
            text-align: center;
            max-width: 800px;
            padding: 0 20px;
            position: relative;
        }

        .search-bar-wrapper {
            display: inline-block;
            position: relative;
            width: 100%;
        }

        .search-input {
            width: 100%;
            padding: 12px 44px 12px 12px;
            font-size: 18px;
            border-radius: 40px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            color: white;
            outline: none;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
            transition: all 0.2s ease;
        }

        .search-input:focus {
            border-color: rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.15);
        }

        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        .search-icon {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
        }

        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 8px;
            background: rgba(20, 20, 20, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            display: none;
        }

        .search-results.show {
            display: block;
        }

        .search-result-item {
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
        }

        .search-result-item:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .search-result-item:last-child {
            border-bottom: none;
        }

        .result-title {
            color: white;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 6px;
            line-height: 1.3;
        }

        .result-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }

        .result-type {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: white;
        }

        .result-deadline {
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
        }

        .result-description {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            line-height: 1.4;
        }

        .no-results {
            padding: 20px;
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-style: italic;
        }

        .results-header {
            padding: 12px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px 12px 0 0;
        }

        .results-count {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            font-weight: 500;
        }

        /* Custom scrollbar */
        .search-results::-webkit-scrollbar {
            width: 6px;
        }

        .search-results::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
        }

        .search-results::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
        }

        .search-results::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }
/* Add these styles to your existing globalStyles string - just append them */

/* AI Window About Section Styles */
.about-section {
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 40px;
  color: white;
}

.about-content {
  display: flex;
  align-items: flex-start;
  gap: 60px;
  margin-bottom: 60px;
}

.about-text {
  flex: 1;
  text-align: left;
}

.about-text h2 {
  font-size: 2.2rem;
  margin-bottom: 24px;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(255,255,255,0.3);
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  opacity: 0.9;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* EXACT AI Window Design */
.ai-window {
  position: relative;
  width: 100%;
  height: 700px;
  border-radius: 24px;
  overflow: hidden;
  background: #000000;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

/* Small header text - EXACT match */
.ai-small-header {
  position: absolute;
  top: 20px;
  left: 45px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  z-index: 4;
  font-family: 'Inter', sans-serif;
}

/* Main headline - EXACT typography match */


/* Your image - fills entire container */
.ai-main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  z-index: 2;
  border-radius: 24px;
}


/* Remove gradient overlay - image provides the gradient */

/* Responsive adjustments */
@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .about-text {
    text-align: center;
  }
  
  .ai-window {
    height: 500px;
  }
  
  
  .ai-headline {
  position: absolute;
  top: 35px;
  left: 45px;
  color: #ffffff;
  font-size: 30px;
  font-weight: 300;
  line-height: 0.95;
  margin: 0;
  z-index: 10;
  font-family: 'Inter', sans-serif;
  max-width: 450px;
  text-shadow: none;
}
  
  .ai-small-header {
    top: 20px;
    left: 30px;
    font-size: 14px;
  }
}
 .ai-headline {
  position: absolute;
  top: 55px;
  left: 45px;
  color: #ffffff;
  font-size: 1.25rem;        /* text-xl = 20px */
  font-weight: 600;          /* font-semibold */
  line-height: 1.2;          /* Default for text-wrap:balance */
  margin: 0;
  z-index: 10;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  max-width: 20rem;          /* max-w-xs = 320px */
  text-align: left;
  text-wrap: balance;
}

@media (min-width: 768px) {
  .ai-headline {
    font-size: 1.875rem;      /* md:text-3xl = 30px */
  }
} 
       

        /* Contact Section Styles */
        .contact-section {
            width: 100%;
            background: rgba(255, 255, 255, 0.03);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 60px 40px 40px;
            margin-top: 80px;
        }

        .contact-content {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
            color: white;
        }

        .contact-content h2 {
            font-size: 2.2rem;
            margin-bottom: 30px;
            font-weight: 700;
            text-shadow: 0 0 20px rgba(255,255,255,0.3);
        }

        .contact-info {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }

        .contact-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .contact-icon {
            width: 24px;
            height: 24px;
            opacity: 0.8;
        }

        .contact-label {
            font-size: 0.9rem;
            opacity: 0.7;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }

        .contact-value {
            font-size: 1.1rem;
            font-weight: 500;
        }

        .contact-value a {
            color: white;
            text-decoration: none;
            transition: opacity 0.2s ease;
        }

        .contact-value a:hover {
            opacity: 0.7;
        }

        .footer-text {
            font-size: 0.9rem;
            opacity: 0.6;
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .about-content {
                flex-direction: column;
                gap: 40px;
            }

            .about-text {
                text-align: center;
            }

            .contact-info {
                flex-direction: column;
                gap: 30px;
            }

            .about-text h2, .contact-content h2 {
                font-size: 1.8rem;
            }

            .orb-container-wrapper {
                width: 300px;
                height: 300px;
            }

            .spotto-text {
                font-size: 40px;
            }
        }

`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [opportunities, setOpportunities] = useState([]);


  // Typewriter effect for placeholder
  const searchOptions = [
    'Internships',
    'Scholarships',
    'Volunteering',
    'Research Programs',
    'Summer Programs',
    'Grants ',
    'STEM Opportunities',
    'Entreprenuership Opportunities'
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typeTimeout;

    const typeWriter = () => {
      const fullText = `Search for ${searchOptions[currentIndex]}`;
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }

      setPlaceholderText(currentText);

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % searchOptions.length;
        typeSpeed = 200;
      }

      typeTimeout = setTimeout(typeWriter, typeSpeed);
    };

    // Only run typewriter when not focused on input
    if (!document.activeElement || document.activeElement.className !== 'search-input') {
      typeWriter();
    }

    return () => clearTimeout(typeTimeout);
  }, []);

  // Your opportunities data - you'll need to add this back from your original file
  useEffect(() => {
    // Method 2: Direct import from src folder
    setOpportunities(opportunitiesData);
  }, []);
  // Type color mapping
  const typeColors = {
    'internship': '#3B82F6',
    'summer': '#10B981',
    'volunteer': '#F59E0B',
    'grant': '#8B5CF6',
    'scholarship': '#EF4444',
    'entrepreneurship': '#EC4899',
    'research': '#06B6D4',
    'stem': '#84CC16'
  };

  const getTypeColor = (type) => {
    return typeColors[type.toLowerCase()] || '#6B7280';
  };

  // Search functionality
  const filterOpportunities = (query) => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return opportunities.filter(opp => 
      opp.title.toLowerCase().includes(searchTerm) ||
      opp.type.toLowerCase().includes(searchTerm) ||
      opp.description.toLowerCase().includes(searchTerm)
    ).slice(0, 6);
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      const results = filterOpportunities(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim();
      if (query) {
        const results = filterOpportunities(query);
        setSearchResults(results);
        setShowResults(true);
      }
    }
  };

  const handleResultClick = (link) => {
    window.open(link, '_blank');
  };

  const handleInputFocus = () => {
    setPlaceholderText('Search for opportunities...');
  };

  const handleInputBlur = () => {
    if (!searchQuery) {
      // Restart typewriter effect when input loses focus and is empty
      setPlaceholderText('');
    }
  };

  // Click outside to close results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
    <Helmet>
      <link rel="icon" href={faviconImage} />
    </Helmet>
    <style>{globalStyles}</style>
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      background: '#000000',
      position: 'relative',
      margin: 0,
      padding: 0
    }}></div>
      <style>{globalStyles}</style>
      <div style={{ 
        width: '100vw', 
        minHeight: '100vh', 
        background: '#000000',
        position: 'relative',
        margin: 0,
        padding: 0
      }}>
        {/* Navigation */}
        <nav className="nav-container">
          <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
          <a href="blog.html" target="_blank">BLOG</a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          {/* Single Orb with SpotTO Text */}
          <div className="orb-container-wrapper">
            <Orb
              hoverIntensity={0}
              rotateOnHover={false}
              hue={0}
              forceHoverState={false}
            />
            <div className="spotto-text">SpotTO</div>
          </div>

          {/* Content Below Orb */}
          <div className="text-content">
            <h1>Volunteering, Internships, and Beyond</h1>
            <h1> for High School Students</h1>
            <p><i><b>Affiliated with Bloor Collegiate Institute</b></i></p>

            {/* Search Bar */}
            <div className="search-container">
              <div className="search-bar-wrapper">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder={placeholderText}
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <span className="search-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>

              {/* Search Results */}
              <div className={`search-results ${showResults ? 'show' : ''}`}>
                <div className="results-header">
                  <div className="results-count">
                    {searchResults.length === 0 && showResults ? 'No results found' : 
                     showResults ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found` : ''}
                  </div>
                </div>
                <div>
                  {searchResults.length === 0 && showResults ? (
                    <div className="no-results">No opportunities found for "{searchQuery}"</div>
                  ) : (
                    searchResults.map((opp, index) => (
                      <div key={index} className="search-result-item" onClick={() => handleResultClick(opp.link)}>
                        <div className="result-title">{opp.title}</div>
                        <div className="result-meta">
                          <span className="result-type" style={{backgroundColor: getTypeColor(opp.type)}}>{opp.type}</span>
                          <span className="result-deadline">Due: {opp.deadline}</span>
                        </div>
                        <div className="result-description">{opp.description}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
        {/* About Section - Add this right after your search container closing div */}
        <div className="about-section" id="about">
          <div className="about-content">
            <div className="about-text">
              <h2>About SpotTO</h2>
              <p>
                SpotTO is a centralized hub or the "Spot" for students to find volunteering, internships, scholarships, grants, our blog and more!
              </p>
              <br></br>
              <p>
                To access the services simply search for a specific opportunity (eg. Sick Kids Hospital) or a type (Volunteer, Internship, Scholarship)
              </p>
              <br></br>
              <p>
                Founded in partnership with Bloor Collegiate Institute, we understand the challenges students 
                face when searching for meaningful experiences. Our mission is to connect ambitious young students 
                with hundreds of opportunities  
              </p>
            </div>
            
            {/* AI Window Design - EXACT replica */}
            <div className="about-image">
              <div className="ai-window">
                {/* Small header text - EXACT positioning */}
                <div className="ai-small-header">Student Opportunities</div>
                
                {/* Main headline - EXACT styling */}
                <h1 className="ai-headline">
                  Enhance your<br/>
                   productivity.
                </h1>
                
                {/* YOUR IMAGE - Replace with your actual image */}
                <img 
                  src={spotImage}
                  alt="This should work" 
                  className="ai-main-image"
                />
                
            

              </div>
            </div>
          </div>
        </div>

        </div>

        {/* Contact Section */}
        <div className="contact-section" id="contact">
          <div className="contact-content">
            <h2>Get in Touch</h2>
            <div className="contact-info">
              <div className="contact-item">
                <svg className="contact-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <div className="contact-label">Email</div>
                <div className="contact-value">
                  <a href="mailto:info@spotto.ca">spot.to.biz@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-item">
                <svg className="contact-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div className="contact-label">Location</div>
                <div className="contact-value">Toronto, Ontario</div>
              </div>
              
              <div className="contact-item">
  <svg className="contact-icon" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
                <div className="contact-label">Feedback?</div>
                <div className="contact-value"><a href="https://docs.google.com/forms/d/e/1FAIpQLSf8rAsUGypAwW9lltC5UL2627HOXmn7ypdRC89ROah5N6Vcng/viewform?usp=header">Click Here!</a></div>
              </div>
            </div>
            
            <div className="footer-text">
              © 2025 SpotTO. Students realizing true potential.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;