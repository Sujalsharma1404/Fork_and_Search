import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import categoryData from '../Components/Data/CategoryData.json';
import "../Components/Style/CategoryPage.css";
import Header from "../Components/Header";

function CategoryPage() {
  const { categoryName } = useParams();

  // Safely find category with null checks
  const category = Array.isArray(categoryData)
    ? categoryData.find(cat =>
      cat?.category?.toLowerCase?.() === categoryName?.toLowerCase?.()
    )
    : null;

  if (!category) {
    return (

      <Container className="not-found">
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </Container>
    );
  }

  // Safely access dishes array
  const dishes = Array.isArray(category.dishes) ? category.dishes : [];

  return (
    <>
      <div>
        <Header />
      </div>

      <Container className="category-page">
        <h1 className="category-title">
          {category?.category || 'Category'} Recipes
        </h1>

        {dishes.length === 0 ? (
          <div className="no-recipes">No recipes found in this category</div>
        ) : (
          <Row className="recipe-grid">
            {dishes.map(dish => (
              <Col key={dish?.id || Math.random()} sm={6} md={4} lg={3} className="mb-4">
                <Link to={`/dish/${dish?.id || ''}`} className="recipe-link">
                  <Card className="recipe-card">
                    <Card.Img
                      variant="top"
                      src={dish?.image || ''}
                      alt={dish?.name || 'Dish image'}
                      className="dish-image"
                    />
                    <Card.Body>
                      <Card.Title className="dish-name">
                        {dish?.name || 'Untitled Dish'}
                      </Card.Title>
                      <p>{dish?.description}</p>
                      <div className="dish-meta">
                        <span>⏱ {dish?.time || 'N/A'}</span>
                        <span>⚡ {dish?.difficulty || 'N/A'}</span>
                        
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}

          </Row>
        )}
      </Container>
    </>
  );
}

export default CategoryPage;