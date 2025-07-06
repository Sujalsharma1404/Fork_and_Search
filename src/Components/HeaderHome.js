import React, { useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FaTwitter, FaInstagram, FaFacebookF, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // For 'X' icon
import logo from "../Assets/logo1.png";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeaderHome.css";
import { Offcanvas, Nav } from "react-bootstrap";


function HeaderHome() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => setShowSearch(!showSearch);
  const closeSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    closeSearch(); // auto-close after Enter
  };
  const [showMenu, setShowMenu] = useState(false);


  return (
    <div className="topbar-wrapper">
      {/* Top Bar */}
      <Container fluid className="topbar">
        <Container className="py-2 element-bar">
          <Row className="align-items-center justify-content-between">
            {/* Left: Social Icons */}
            <Col xs={6} md="auto" className="d-flex align-items-center">
              <FaTwitter className="icon" />
              <FaInstagram className="icon" />
              <FaFacebookF className="icon" />
            </Col>

            {/* Right: Search toggle + Login */}
            <Col
  xs={12}
  md="auto"
  className="d-flex align-items-center justify-content-end flex-wrap gap-2"
>
  {/* Search Icon Button */}
  <Button className="btn btn-icon" onClick={toggleSearch}>
    <FaSearch className="icon" />
  </Button>

  {/* Conditionally Rendered Search Input (visible only on desktop) */}
  <div className="d-none d-md-inline-block">
    {showSearch && (
      <Form className="mx-2 d-inline-block" onSubmit={handleSearchSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
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
  </div>

  {/* Login Button */}
  <Button className="btn btn-outline-dark btn-header">
    Login
  </Button>
</Col>

          </Row>
        </Container>
      </Container>

      {/* Row 2: Centered Logo */}
      <div className="logo-row py-3">
        <Container>
          {/* Mobile: Search | Logo | Hamburger */}
          <Row className="align-items-center justify-content-between d-flex d-md-none">
            <Col xs="auto">
              <FaSearch className="icon-action" />
            </Col>
            <Col className="text-center">
              <img
                src={logo}
                alt="Fork & Search"
                className="header-logo"
              />

            </Col>
            <Col xs="auto">
              <div className="icon-action" onClick={() => setShowMenu(true)}>
                ☰
              </div>
            </Col>

          </Row>
          <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="#">Recipes</Nav.Link>
                <Nav.Link href="#">Categories</Nav.Link>
                <Nav.Link href="#">Contact</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>


          {/* Desktop: Centered logo */}
          <Row className="d-none d-md-flex justify-content-center">
            <Col md="auto">
              <img
                src={logo}
                alt="Fork & Search"
                className="header-logo"
              />

            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid>
        <Container>
          <Row className="d-none d-md-flex justify-content-center mt-3">
            <Col md={10}>
              <Tabs
                defaultActiveKey="home"
                id="navigation-tabs"
                className="justify-content-center nav-tabs-custom"
                fill
              >
                <Tab eventKey="home" title="Home"></Tab>
                <Tab eventKey="recipes" title="Recipes"></Tab>
                <Tab eventKey="categories" title="Categories"></Tab>
                <Tab eventKey="contact" title="Contact"></Tab>
                <Tab eventKey="about us" title="About us"></Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default HeaderHome;
