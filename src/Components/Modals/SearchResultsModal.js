// ✅ src/Components/YourModalFolder/SearchResultsModal.js

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

export default function SearchResultsModal({ show, handleClose, results }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    handleClose();
    navigate(`/dish/${id}`); // ✅ this must match your DishDetail route
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="search-results-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {results && results.length > 0 ? (
          <div className="search-results-list">
            {results.map((recipe) => (
              <div
                key={recipe.firestoreId}
                className="search-result-card"
                onClick={() => handleClick(recipe.firestoreId)}
              >
                <img
                  src={recipe.image || "/placeholder-image.jpg"}
                  alt={recipe.name}
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />

                <div className="result-info">
                  <h5>{recipe.name}</h5>
                  <p className="result-category">
                    {recipe.category || "Uncategorized"}
                  </p>
                  {recipe.description && (
                    <p className="result-description">
                      {recipe.description.slice(0, 80)}...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No recipes found.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
