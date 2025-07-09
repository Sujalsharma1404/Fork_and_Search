import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

import logo from "../Assets/logo1.png"; // adjust path if needed

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="py-5">
          <Col md={4} className="mb-4 mb-md-0">
            <img src={logo} alt="Fork & Search" className="footer-logo mb-3" />
            <p>Fork & Search is your go-to place for delicious recipes, updated daily. Explore, cook, and enjoy!</p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Recipes</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@forksearch.com</p>
            <p>Phone: +91 98765 43210</p>
            <div className="social-icons mt-2">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </Col>
        </Row>

        <Row className="text-center border-top pt-3">
          <Col>
            <p className="mb-0">&copy; {new Date().getFullYear()} Fork & Search. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
