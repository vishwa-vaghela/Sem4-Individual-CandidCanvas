import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './CandidCanvasLogo_2.png';
import { useNavigate } from 'react-router-dom';

function Navbar({user}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate=useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search input
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
};

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleSearch = () => {
    if (searchQuery) {
      // Navigate to the search results page and pass the search query as a URL parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 0);
    };
    

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);


  }, []);
  
  function handleLogin(){
    window.location.href='/login';
  }


  return (
    <div>
        <div>
          <header>
            <a href="#" className="logo">
              <img src={logo} alt="logo" height="95px" width="95px" />
            </a>

            <ul>
              <li><a href={`/?username=${user}`} >Home</a></li>
              <li><a href="/trending">Trending</a></li>
              <li><a href={`/profile/?username=${user}`}>Profile</a></li>
              <li><a href="/aboutus">About Us</a></li>
              {user ? (
                        <button className="login-button" onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className="login-button" onClick={handleLogin}>Login</button>
                    )}
              
              <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state with input value
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Handle search on 'Enter' key press
              />
                <div className="search" onClick={handleSearch}></div>
              </div>
            </ul>
            <div className="menu-icon" onClick={toggleMobileMenu}>
              ☰
            </div>
          </header>

          <div className={`mobile-nav ${mobileMenuOpen ? "show" : ""}`}>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Trending</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

        </div>
      </div>
  );
}

export default Navbar;