import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./NewsletterSignup.css";

function NewsletterSignup() {
  return (
    <section className="newsletter-section">
      <Container>
        <div className="newsletter-content">
          <h2 className="newsletter-title">Deliciousness to your inbox</h2>
          <p className="newsletter-subtitle">
            Enjoy weekly hand picked recipes and recommendations
          </p>
          
          <Form className="newsletter-form">
            <Form.Group controlId="formEmail" className="email-input-group">
              <Form.Control
                type="email"
                placeholder="Email Address"
                className="email-input"
              />
              <Button variant="primary" type="submit" className="join-button">
                JOIN
              </Button>
            </Form.Group>
          </Form>
          
          <p className="terms-text">
            By joining our newsletter you agree to our Terms and Conditions
          </p>
        </div>
      </Container>
    </section>
  );
}

export default NewsletterSignup;