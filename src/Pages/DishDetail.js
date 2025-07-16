import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import categoryData from '../Components/Data/CategoryData.json';
import "../Components/Style/DishDetail.css";
import Header from "../Components/Header";


function DishDetail() {
  const { dishId } = useParams();
  const [dish, setDish] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Safely find dish with proper error handling
    try {
      let foundDish = null;
      const parsedId = parseInt(dishId);

      if (Array.isArray(categoryData)) {
        for (const category of categoryData) {
          if (Array.isArray(category?.dishes)) {
            const dishMatch = category.dishes.find(d => d?.id === parsedId);
            if (dishMatch) {
              foundDish = {
                ...dishMatch,
                category: category?.name || 'Unknown Category'
              };
              break;
            }
          }
        }
      }
      setDish(foundDish);
    } catch (error) {
      console.error("Error loading dish:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dishId]);

  if (isLoading) {
    return (
      <Container className="loading-state">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (!dish) {
    return (
      <Container className="not-found">
        <h2>Dish not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </Container>
    );
  }

  // Helper function to render list items safely
  const renderListItems = (items, isOrdered = false) => {
    if (!Array.isArray(items) || items.length === 0) return null;

    const ListComponent = isOrdered ? 'ol' : 'ul';

    return (
      <ListComponent className={isOrdered ? 'steps-list' : 'tips-list'}>
        {items.map((item, index) => (
          <li key={index}>{item || 'No information available'}</li>
        ))}
      </ListComponent>
    );
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <Container className="dish-detail">


        <Row>
          <Col lg={6} className="mb-4">
            <Card className="dish-image-card">
              <Card.Img
                variant="top"
                src={dish.image || '/placeholder-image.jpg'}
                alt={dish.name || 'Dish image'}
                className="img-fluid"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="dish-info-card">
              <Card.Body>
                <Card.Title className="dish-title">
                  {dish.name || 'Untitled Dish'}
                </Card.Title>

                <div className="dish-meta mb-3">
                  <span className="time">⏱ {dish.time || 'Not specified'}</span>
                  <span className="difficulty">⚡ {dish.difficulty || 'Not specified'}</span>
                  {dish.quantity && (
                    <span className="serves">🍽 {dish.quantity}</span>
                  )}
                </div>

                {dish.ingredients?.length > 0 && (
                  <>
                    <Card.Subtitle className="mb-2 section-title">
                      Ingredients
                    </Card.Subtitle>
                    <ListGroup variant="flush" className="mb-3">
                      {dish.ingredients.map((ingredient, index) => (
                        <ListGroup.Item key={`ing-${index}`}>
                          {ingredient.name || 'Unnamed ingredient'}:{' '}
                          <strong>{ingredient.quantity || 'As needed'}</strong>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                  </>
                )}

                {dish.steps?.length > 0 && (
                  <>
                    <Card.Subtitle className="mb-2 section-title">
                      Instructions
                    </Card.Subtitle>
                    {renderListItems(dish.steps, true)}
                  </>
                )}

                {dish.tips?.length > 0 && (
                  <>
                    <Card.Subtitle className="mb-2 section-title">
                      Chef's Tips
                    </Card.Subtitle>
                    {renderListItems(dish.tips)}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DishDetail;