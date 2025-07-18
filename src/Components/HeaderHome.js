import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

import recipeData from "./Data/CategoryData.json";

function HeaderHome() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const toggleSearch = () => setShowSearch(!showSearch);
  const closeSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setShowSearchModal(true);
    }
  };

  const navigate = useNavigate();

  // ✅ FLATTEN the data correctly
  const allRecipes = recipeData.flatMap(category => category.dishes);

  // ✅ Safe filter with optional chaining and fallback
  const filteredRecipes = allRecipes.filter(recipe =>
    recipe?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="topbar-wrapper">
      {/* === Top Bar === */}
      <Container fluid className="topbar">
        <Container className="py-2 element-bar">
          <Row className="align-items-center justify-content-between">
            <Col xs={6} md="auto" className="d-flex align-items-center">
              <FaTwitter className="icon" />
              <FaInstagram className="icon" />
              <FaFacebookF className="icon" />
            </Col>

            <Col
              xs={6}
              md="auto"
              className="d-flex align-items-center justify-content-end gap-2"
            >
              <Button
                className="btn btn-icon d-none d-md-inline"
                onClick={toggleSearch}
              >
                <FaSearch className="icon" />
              </Button>

              {showSearch && (
                <Form
                  className="mx-2 d-none d-md-inline-block"
                  onSubmit={handleSearchSubmit}
                >
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

              <Button
                className="btn btn-outline-dark btn-header d-none d-md-inline"
                onClick={() => setShowLogin(true)}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* === Logo Row === */}
      <div className="logo-row py-3">
        <Container>
          <Row className="align-items-center justify-content-between d-flex d-md-none">
            <Col xs="auto">
              <FaSearch
                className="icon-action"
                onClick={() => setShowSearchModal(true)}
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

          <Row className="d-none d-md-flex justify-content-center">
            <Col md="auto">
              <img src={logo} alt="Fork & Search" className="header-logo" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* === Offcanvas === */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
        backdrop
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => { setShowMenu(false); navigate("/"); }}>Home</Nav.Link>
            <Nav.Link onClick={() => { setShowMenu(false); navigate("/recipes"); }}>Recipes</Nav.Link>
            <Nav.Link onClick={() => { setShowMenu(false); navigate("/contact"); }}>Contact</Nav.Link>
            <Nav.Link onClick={() => { setShowMenu(false); navigate("/about"); }}>About</Nav.Link>
            <Nav.Link onClick={() => { setShowLogin(true); setShowMenu(false); }}>Login</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* === Tabs (Desktop only) === */}
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

      {/* === Modals === */}
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <SearchModal
        show={showSearchModal}
        handleClose={() => setShowSearchModal(false)}
        results={filteredRecipes}
      />
    </div>
  );
}

export default HeaderHome;
