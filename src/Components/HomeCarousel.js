// src/Components/HeroCarousel.js
import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "./HomeCarousel.css";
import Slide1 from "../Assets/caraousel1.jpg";
import Slide2 from "../Assets/caraousel2.jpg";
import Slide3 from "../Assets/caraousel3.jpg";


const HeroCarousel = () => {
    return (
        <Container fluid className="carousel-container px-0">
            <Carousel fade controls indicators interval={3000}>
                <Carousel.Item>
  <img className="d-block w-100 carousel-image" src={Slide1} alt="Slide 1" />
</Carousel.Item>
<Carousel.Item>
  <img className="d-block w-100 carousel-image" src={Slide2} alt="Slide 2" />
</Carousel.Item>
<Carousel.Item>
  <img className="d-block w-100 carousel-image" src={Slide3} alt="Slide 3" />
</Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default HeroCarousel;
