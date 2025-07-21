import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "../Components/Header";
import "../Components/Style/RecipesPage.css";

function RecipesPage() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, "categories");
        const querySnapshot = await getDocs(categoriesRef);

        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchRecipes = async () => {
      try {
        const recipesRef = collection(db, "recipes");
        const querySnapshot = await getDocs(recipesRef);

        const recipesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchCategories();
    fetchRecipes();
  }, []);

  return (
    <div className="recipes-page-wrapper">
      <Header />

      <section className="categories-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Recipe Categories</h2>
            <p className="section-description">
              Browse through our diverse selection of food categories
            </p>
          </div>

          <Row className="g-4">
            {categories.map((category) => {
              // Count how many recipes belong to this category
              const recipesInCategory = recipes.filter(
                (recipe) =>
                  recipe.category &&
                  recipe.category.toLowerCase() === category.category.toLowerCase()
              );

              // Pick first recipe image or fallback
              const previewImage =
                recipesInCategory[0]?.image || "/placeholder.jpg";

              return (
                <Col key={category.id} xs={6} md={4} lg={3}>
                  <Link
                    to={`/category/${category.category}`}
                    className="category-card-link"
                  >
                    <Card className="modern-category-card">
                      <div className="card-image-container">
                        <Card.Img
                          variant="top"
                          src={previewImage}
                          alt={category.category}
                          className="card-image"
                        />
                        <div className="image-overlay"></div>
                        <span className="recipe-count">
                          {recipesInCategory.length}{" "}
                          {recipesInCategory.length === 1 ? "Recipe" : "Recipes"}
                        </span>
                      </div>
                      <Card.Body>
                        <Card.Title className="card-title">
                          {category.emoji} {category.category}
                        </Card.Title>
                        <button className="explore-button">
                          Explore <i className="bi bi-arrow-right"></i>
                        </button>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default RecipesPage;
