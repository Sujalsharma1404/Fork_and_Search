import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CategorySection.css";

function PopularCategories({ categories }) {
  return (
    <Container className="popular-categories">
      <h1 className="section-title">Popular Categories</h1>
      <Row className="justify-content-center">
        {categories.map((category) => (
          <Col xs={4} sm={3} md={2} key={category.category} className="mb-4">
            <Link
              to={`/category/${category.category.toLowerCase()}`}
              className="category-link"
            >
              <div
                className="category-circle"
                style={{ backgroundColor: category.color }}
              >
                <span className="emoji">{category.emoji}</span>
                <p className="category-name">{category.category}</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PopularCategories;
