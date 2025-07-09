import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./CategorySection.css";

const categories = [
  { name: "Indian", emoji: "🍝", color: "#FF9AA2" },
  { name: "Italian", emoji: "🍕", color: "#FFB7B2" },
  { name: "Beverages", emoji: "🌱", color: "#B5EAD7" },
  { name: "Desserts", emoji: "🍰", color: "#C7CEEA" },
  { name: "Snacks", emoji: "🥤", color: "#E2F0CB" }
];

function PopularCategories() {
  return (
    <Container className="popular-categories">
      <h2 className="section-title">Popular Categories</h2>
      <Row className="justify-content-center">
        {categories.map((category, index) => (
          <Col xs={4} sm={3} md={2} key={index} className="mb-4">
            <div 
              className="category-circle"
              style={{ backgroundColor: category.color }}
            >
              <span className="emoji">{category.emoji}</span>
              <p className="category-name">{category.name}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PopularCategories;