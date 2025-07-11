import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../Components/Style/About.css";
import Header from "../Components/Header";

function About() {
  return (
   <>
   <div>
           <Header />
         </div>
    <div className="about-page">
      
      {/* Hero Section */}
      <div className="about-hero text-center">
        <Container>
          <h1 className="about-title">About Fork & Search</h1>
          <p className="about-subtitle">Discover. Cook. Share. Repeat.</p>
        </Container>
      </div>

      {/* Content Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <Image
              src="https://fabrx.co/preview/tastebite/assets/img/about-img.jpg"
              fluid
              rounded
              className="about-img"
            />
          </Col>
          <Col md={6}>
            <h2>Our Story</h2>
            <p>
              Fork & Search was born out of the passion for cooking and sharing homemade recipes with the world. From delicious meals to tasty desserts, our platform makes it easy for everyone to find, share, and enjoy recipes made with love.
            </p>
            <p>
              Whether you’re a beginner or a professional, we bring food lovers together to explore cuisines, post their own creations, and learn something new every day.
            </p>
          </Col>
        </Row>

        <hr className="my-5" />

        <Row className="text-center">
          <Col md={4}>
            <h3>500+</h3>
            <p>Recipes Shared</p>
          </Col>
          <Col md={4}>
            <h3>1,000+</h3>
            <p>Happy Users</p>
          </Col>
          <Col md={4}>
            <h3>100%</h3>
            <p>Free & Open</p>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default About;
