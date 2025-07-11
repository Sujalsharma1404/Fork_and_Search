import React from "react";
import "./../Components/Style/Contact.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../Components/Header";

function Contact() {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="contact-page">
        <Container className="contact-container py-5">
          <Row>
            <Col md={6} className="mb-4">
              <h2 className="contact-title">Get in Touch</h2>
              <p className="contact-description">
                Have a question, feedback, or just want to say hello? Fill out the form and we'll get back to you as soon as possible.
              </p>
              <ul className="contact-info">
                <li><strong>Email:</strong> support@forkandsearch.com</li>
                <li><strong>Phone:</strong> +91 9876543210</li>
                <li><strong>Address:</strong> BCA Dept, XYZ College, India</li>
              </ul>
            </Col>

            <Col md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Your Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Your Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Your Message" />
                </Form.Group>

                <Button variant="dark" type="submit" className="contact-submit-btn">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Contact;
