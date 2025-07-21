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
    <Container className="popular-categories" style={{ padding: "80px 0" }}>
      <h1 className="section-title" style={{
        fontSize: "42px",
        fontWeight: "700",
        marginBottom: "60px",
        position: "relative",
        textAlign: "center",
        color: "#2a2a2a",
        width: "100%"
      }}>
        Categories
        <span style={{
          display: "block",
          width: "100px",
          height: "4px",
          backgroundColor: "#ff6b6b",
          margin: "20px auto 0",
          borderRadius: "2px"
        }}></span>
      </h1>
      
      <Row className="justify-content-center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {categories.slice(0, 6).map((category) => (
          <Col 
            xs={6} 
            sm={4} 
            md={4} 
            lg={2} 
            key={category.id} 
            style={{ padding: "15px" }}
          >
            <Link
              to={`/category/${category.category}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="category-card"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(0, 0, 0, 0.05)"
                }}
              >
                <div style={{
                  fontSize: "48px",
                  marginBottom: "12px",
                  transition: "transform 0.3s ease"
                }}>
                  {category.emoji}
                </div>
                <p style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  margin: "0",
                  color: "#333333",
                  textAlign: "center"
                }}>
                  {category.category}
                </p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PopularCategories;