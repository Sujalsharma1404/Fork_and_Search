// src/Components/HeroCarousel.js
import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "./HomeCarousel.css";
import Slide1 from "../Assets/videoo1.mp4";
import Slide2 from "../Assets/videoo2.mp4";
import Slide3 from "../Assets/videoo3.mp4";
import Slide4 from "../Assets/videoo4.mp4"


const HeroCarousel = () => {
  return (
    <Container className="carousel-wrapper">
      <Carousel fade controls indicators interval={8000}>
        <Carousel.Item>
          <video
            className="d-block w-100 carousel-image"
            src={Slide1}
            autoPlay
            loop
            muted
            playsInline

          />
        </Carousel.Item>
        <Carousel.Item>
          <video
            className="d-block w-100 carousel-image"
            src={Slide2}
            autoPlay
            loop
            muted
            playsInline
          />        </Carousel.Item>
        <Carousel.Item>
          <video
            className="d-block w-100 carousel-image"
            src={Slide3}
            autoPlay
            loop
            muted
            playsInline
          />        </Carousel.Item>
          <Carousel.Item>
          <video
            className="d-block w-100 carousel-image"
            src={Slide4}
            autoPlay
            loop
            muted
            playsInline
          />        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default HeroCarousel;
