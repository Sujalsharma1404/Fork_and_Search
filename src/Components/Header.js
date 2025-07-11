import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../Assets/logo1.png";
import "./Header.css";
import { IoClose } from "react-icons/io5";

// ✅ Import LoginModal — update path if needed
import LoginModal from "../Components/Modals/LoginModal";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false); // ✅ added

  const toggleSearch = () => setShowSearch(!showSearch);
  const closeSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    closeSearch();
  };

  return (
    <header className="common-header">
      <Container>
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="Fork & Search" className="header-logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/recipes" className="nav-link">Recipes</Link>
            <Link to="/about" className="nav-link">About us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* CTA Button */}
          <div className="header-actions">
            {/* Search Toggle */}
            <button className="search-btn" onClick={toggleSearch}>
              <FaSearch size={18} />
            </button>

            {/* Conditionally render input (desktop only) */}
            {showSearch && (
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                />
                <button className="close-search-btn" onClick={closeSearch}>
                  <IoClose size={18} />
                </button>
              </div>
            )}

            {/* ✅ Login Button — opens LoginModal */}
            <Button
              variant="primary"
              className="login-btn"
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={() => setShowMobileMenu(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <div className="menu-header">
              <button
                className="close-btn"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaTimes size={24} />
              </button>
            </div>
            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link to="/recipes" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Recipes</Link>
              <Link to="/about" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>About us</Link>
              <Link to="/contact" className="mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Contact</Link>
              <Link className="mobile-nav-link" onClick={toggleSearch}>
                <FaSearch size={18} /> Search
              </Link>

              {showSearch && (
                <div className="search-wrapper">
                  <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                  />
                  <button className="close-search-btn" onClick={closeSearch}>
                    <IoClose size={18} />
                  </button>
                </div>
              )}

              {/* ✅ Mobile Login Button — also opens LoginModal */}
              <Button
                
                className="btn btn-outline-dark btn-header d-none d-md-inline"
                onClick={() => {
                  setShowLogin(true);
                  setShowMobileMenu(false);
                }}
              >
                Login
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* ✅ Login Modal */}
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </header>
  );
}

export default Header;
