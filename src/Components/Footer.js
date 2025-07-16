import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Use React Router for internal links
import "./Footer.css";

import logo from "../Assets/logo1.png"; // adjust path if needed

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="py-5 align-items-start">
          {/* === Brand Info === */}
          <Col md={4} className="mb-4 mb-md-0">
            <img src={logo} alt="Fork & Search" className="footer-logo mb-3" />
            <p className="footer-description">
              Fork & Search is your go-to hub for delicious recipes, culinary
              ideas & foodie inspiration. Discover, cook, and enjoy every day!
            </p>
          </Col>

          {/* === Quick Links === */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </Col>

          {/* === Contact & Social === */}
          <Col md={4}>
            <h5 className="footer-heading">Contact Us</h5>
            <p className="mb-1">Email: support@forksearch.com</p>
            <p className="mb-3">Phone: +91 98765 43210</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
            </div>
          </Col>
        </Row>

        <Row className="text-center border-top pt-3">
          <Col>
            <p className="mb-0 small">
              &copy; {new Date().getFullYear()} Fork & Search. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
