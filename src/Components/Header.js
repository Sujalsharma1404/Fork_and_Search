import React, { useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FaTwitter, FaInstagram, FaFacebookF, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // For 'X' icon

import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
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

  return (
    <div className="topbar-wrapper">
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
              xs={6}
              md="auto"
              className="d-flex align-items-center justify-content-end"
            >
              {/* Search Toggle Button */}
              <Button className="btn btn-icon" onClick={toggleSearch}>
                <FaSearch className="icon" />
              </Button>

              {/* Conditionally Rendered Search Input */}
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

              {/* Login Button */}
              <Button className="btn btn-outline-dark btn-header">
                Login
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Header;
