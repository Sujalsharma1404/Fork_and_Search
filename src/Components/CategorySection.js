import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./CategorySection.css";

function PopularCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container className="popular-categories">
      <h1 className="section-title text-center mb-4">Popular Categories</h1>
      <Row className="justify-content-center">
        {categories.slice(0, 6).map((category) => (
          <Col xs={4} sm={3} md={2} key={category.id} className="mb-4">
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
