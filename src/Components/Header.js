import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import logo from "../Assets/logo1.png";
import "./Header.css";

import LoginModal from "../Components/Modals/LoginModal";
import SearchResultsModal from "../Components/Modals/SearchResultsModal";

import { searchRecipes } from "../Search"; // ✅ use updated Firebase search

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleSearch = () => setShowSearch(!showSearch);
  const closeSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const results = await searchRecipes(searchQuery);
    setSearchResults(results);
    setShowResults(true);
    closeSearch();
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert("Logged out successfully!"))
      .catch((err) => alert("Logout failed: " + err.message));
  };

  return (
    <header className="common-header">
      <Container>
        <div className="header-content">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="Fork & Search" className="header-logo" />
            </Link>
          </div>

          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/recipes" className="nav-link">Recipes</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          <div className="header-actions">
            <button className="search-btn" onClick={toggleSearch}>
              <FaSearch size={18} />
            </button>

            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="search-wrapper">
                <input
                  type="text"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                />
                <button className="close-search-btn" onClick={closeSearch} type="button">
                  <IoClose size={18} />
                </button>
              </form>
            )}

            {user ? (
              <Button variant="danger" className="login-btn" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="primary" className="login-btn" onClick={() => setShowLogin(true)}>
                Login
              </Button>
            )}
          </div>

          <button className="menu-toggle" onClick={() => setShowMobileMenu(true)}>
            <FaBars size={24} />
          </button>
        </div>
      </Container>

      {showMobileMenu && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <div className="menu-header">
              <button className="close-btn" onClick={() => setShowMobileMenu(false)}>
                <FaTimes size={24} />
              </button>
            </div>

            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link to="/recipes" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Recipes</Link>
              <Link to="/about" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>About Us</Link>
              <Link to="/contact" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Contact</Link>

              {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="search-wrapper mobile-search-wrapper">
                  <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                  />
                  <button className="close-search-btn" onClick={closeSearch} type="button">
                    <IoClose size={18} />
                  </button>
                </form>
              ) : (
                <button className="mobile-nav-link" onClick={toggleSearch}>
                  <FaSearch size={18} /> Search
                </button>
              )}

              {user ? (
                <Button className="btn btn-outline-danger btn-header" onClick={() => { handleLogout(); setShowMobileMenu(false); }}>
                  Logout
                </Button>
              ) : (
                <Button className="btn btn-outline-dark btn-header" onClick={() => { setShowLogin(true); setShowMobileMenu(false); }}>
                  Login
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <SearchResultsModal show={showResults} handleClose={() => setShowResults(false)} results={searchResults} />
    </header>
  );
}

export default Header;
