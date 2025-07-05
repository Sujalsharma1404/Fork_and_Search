import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./HeaderHome.css";
import logo from "../Assets/Forkandsearch_LOGO.png"; // Your logo path

function HeaderHome() {
  return (
    <Navbar expand="md" className="py-4 header-home" bg="white" variant="light">
      <Container className="flex-column text-center">
        {/* Logo */}
        <Navbar.Brand href="#">
          <img src={logo} alt="Fork & Search" className="home-logo mb-2" />
        </Navbar.Brand>

        {/* Collapsible Nav */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-center">
          <Nav className="gap-4 header-home-nav">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Recipes</Nav.Link>
            <Nav.Link href="#">Categories</Nav.Link>
            <Nav.Link href="#">Blog</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderHome;
