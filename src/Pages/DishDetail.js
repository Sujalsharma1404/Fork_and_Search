import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import "../Components/Style/DishDetail.css";
import Header from "../Components/Header";

function DishDetail() {
  const { dishId } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const docRef = doc(db, "recipes", dishId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDish(docSnap.data());
        } else {
          setDish(null);
        }
      } catch (error) {
        console.error("Error fetching dish:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [dishId]);

  if (loading) {
    return (
      <Container className="loading-state text-center py-5">
        <Spinner animation="border" role="status" />
        <p>Loading dish...</p>
      </Container>
    );
  }

  if (!dish) {
    return (
      <Container className="not-found text-center py-5">
        <h2>Dish not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  const renderListItems = (items, isOrdered = false) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    const ListComponent = isOrdered ? 'ol' : 'ul';

    return (
      <ListComponent>
        {items.map((item, index) => (
          <li key={index}>{item || 'No information available'}</li>
        ))}
      </ListComponent>
    );
  };

  return (
    <>
      <Header />

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
                <Card.Title>{dish.name || 'Untitled Dish'}</Card.Title>

                <div className="dish-meta mb-3">
                  <span>⏱ {dish.time || 'Not specified'}</span>
                  <span>⚡ {dish.difficulty || 'Not specified'}</span>
                  {dish.quantity && (
                    <span>🍽 {dish.quantity}</span>
                  )}
                </div>

                {dish.ingredients?.length > 0 && (
                  <>
                    <h5>Ingredients</h5>
                    <ListGroup variant="flush" className="mb-3">
                      {dish.ingredients.map((ing, index) => (
                        <ListGroup.Item key={index}>{ing}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                )}

                {dish.steps?.length > 0 && (
                  <>
                    <h5>Instructions</h5>
                    {renderListItems(dish.steps, true)}
                  </>
                )}

                {dish.tips?.length > 0 && (
                  <>
                    <h5>Chef's Tips</h5>
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
