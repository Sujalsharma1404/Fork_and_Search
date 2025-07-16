import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import categoryData from "../Components/Data/CategoryData.json";
import Header from "../Components/Header";
import "../Components/Style/RecipesPage.css";

function RecipesPage() {
  return (
    <div className="recipes-page-wrapper">
      <Header />

      {/* Hero Section - Modern Design */}
     

      {/* Category Section - Grid Layout */}
      <section className="categories-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Recipe Categories</h2>
            <p className="section-description">
              Browse through our diverse selection of food categories
            </p>
          </div>

          <Row className="g-4">
            {categoryData.map((category) => (
              <Col key={category.category} xs={6} md={4} lg={3}>
                <Link
                  to={`/category/${category.category}`} // ✅ CORRECTED
                  className="category-card-link"
                >
                  <Card className="modern-category-card">
                    <div className="card-image-container">
                      <Card.Img
                        variant="top"
                        src={category.dishes[0]?.image || "/placeholder.jpg"}
                        alt={category.category}
                        className="card-image"
                      />
                      <div className="image-overlay"></div>
                      <span className="recipe-count">
                        {category.dishes.length}{" "}
                        {category.dishes.length === 1 ? "Recipe" : "Recipes"}
                      </span>
                    </div>
                    <Card.Body>
                      <Card.Title className="card-title">
                        {category.category}
                      </Card.Title>
                      <button className="explore-button">
                        Explore <i className="bi bi-arrow-right"></i>
                      </button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     
    </div>
  );
}

export default RecipesPage;
