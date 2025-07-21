import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../Components/Style/CategoryPage.css";
import Header from "../Components/Header";

function CategoryPage() {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("category", "==", categoryName));
        const snapshot = await getDocs(q);

        const fetchedRecipes = snapshot.docs.map(doc => ({
          id: doc.id,      // ✅ Firestore doc ID
          ...doc.data(),
        }));

        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName]);

  if (loading) {
    return (
      <Container className="loading-state text-center py-5">
        <Spinner animation="border" role="status" />
        <p>Loading recipes...</p>
      </Container>
    );
  }

  if (recipes.length === 0) {
    return (
      <Container className="not-found text-center py-5">
        <h2>No recipes found for “{categoryName}”</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Header />

      <Container className="category-page">
        <h1 className="category-title text-center mb-4">
          {categoryName} Recipes
        </h1>

        <Row className="recipe-grid">
          {recipes.map(dish => (
            <Col key={dish.id} sm={6} md={4} lg={3} className="mb-4">
              <Link to={`/dish/${dish.id}`} className="recipe-link">
                <Card className="recipe-card">
                  <Card.Img
                    variant="top"
                    src={dish.image || "/placeholder-image.jpg"}
                    alt={dish.name || "Dish image"}
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                    className="dish-image"
                  />
                  <Card.Body>
                    <Card.Title className="dish-name">
                      {dish.name || "Untitled Dish"}
                    </Card.Title>
                    {dish.description && (
                      <p>{dish.description}</p>
                    )}
                    <div className="dish-meta">
                      <span>⏱ {dish.time || "N/A"}</span>
                      <span>⚡ {dish.difficulty || "N/A"}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default CategoryPage;
