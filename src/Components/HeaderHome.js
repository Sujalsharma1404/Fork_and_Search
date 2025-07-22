import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { FaTwitter, FaInstagram, FaFacebookF, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import logo from "../Assets/logo1.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeaderHome.css";

import LoginModal from "./Modals/LoginModal";
import SearchModal from "./Modals/SearchResultsModal";
import MobileSearchModal from "./Modals/MobileSearchModal";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { searchRecipes } from "../Search"; // ✅ Firebase search

function HeaderHome() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleSearch = () => {
    if (window.innerWidth < 768) {
      setShowMobileSearch(true);
    } else {
      setShowSearch(!showSearch);
    }
  };

  const closeSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    runSearch();
  };

  const runSearch = async () => {
    if (searchQuery.trim() !== "") {
      const found = await searchRecipes(searchQuery);
      setSearchResults(found);
      setShowSearchModal(true);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert("Logged out successfully!"))
      .catch((err) => alert("Logout failed: " + err.message));
  };

  return (
    <div className="topbar-wrapper">
      {/* === Desktop Topbar === */}
      <Container fluid className="topbar d-none d-md-block">
        <Container className="py-2 element-bar">
          <Row className="align-items-center justify-content-between">
            <Col className="d-flex align-items-center gap-2">
              <FaTwitter className="icon" />
              <FaInstagram className="icon" />
              <FaFacebookF className="icon" />
            </Col>
            <Col className="d-flex align-items-center justify-content-end gap-2">
              <Button className="btn btn-icon" onClick={toggleSearch}>
                <FaSearch className="icon" />
              </Button>
              {showSearch && (
                <Form className="mx-2" onSubmit={handleSearchSubmit}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search recipes..."
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <Button
                      variant="outline-secondary"
                      type="submit"
                      className="btn-close-search"
                    >
                      <FaSearch />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={closeSearch}
                      className="btn-close-search"
                    >
                      <IoClose />
                    </Button>
                  </InputGroup>
                </Form>
              )}
              {user ? (
                <Button
                  className="btn btn-outline-danger btn-header"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="btn btn-outline-dark btn-header"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Container>

      {/* === Logo Row === */}
      <div className="logo-row py-3">
        <Container>
          {/* Mobile */}
          <Row className="align-items-center justify-content-between d-flex d-md-none">
            <Col xs="auto">
              <FaSearch
                className="icon-action"
                onClick={toggleSearch} // ✅ opens MobileSearchModal
              />
            </Col>
            <Col className="text-center">
              <img src={logo} alt="Fork & Search" className="header-logo" />
            </Col>
            <Col xs="auto">
              <div className="icon-action" onClick={() => setShowMenu(true)}>
                ☰
              </div>
            </Col>
          </Row>

          {/* Desktop */}
          <Row className="d-none d-md-flex justify-content-center">
            <Col md="auto">
              <img src={logo} alt="Fork & Search" className="header-logo" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* === Offcanvas Menu === */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                setShowMenu(false);
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setShowMenu(false);
                navigate("/recipes");
              }}
            >
              Recipes
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setShowMenu(false);
                navigate("/contact");
              }}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setShowMenu(false);
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            {user ? (
              <Nav.Link
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => {
                  setShowLogin(true);
                  setShowMenu(false);
                }}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid>
        <Container>
          <Row className="d-none d-md-flex justify-content-center mt-3">
            <Col md={10}>
              <Tabs
                defaultActiveKey="home"
                id="navigation-tabs"
                className="justify-content-center nav-tabs-custom"
                fill
                onSelect={(key) => {
                  if (key === "home") navigate("/");
                  if (key === "recipes") navigate("/recipes");
                  if (key === "contact") navigate("/contact");
                  if (key === "about") navigate("/about");
                }}
              >
                <Tab eventKey="home" title="Home" />
                <Tab eventKey="recipes" title="Recipes" />
                <Tab eventKey="contact" title="Contact" />
                <Tab eventKey="about" title="About Us" />
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Container>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <SearchModal
        show={showSearchModal}
        handleClose={() => setShowSearchModal(false)}
        results={searchResults}
      />
      <MobileSearchModal
        show={showMobileSearch}
        handleClose={() => setShowMobileSearch(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        runSearch={runSearch}
      />
    </div>
  );
}

export default HeaderHome;
