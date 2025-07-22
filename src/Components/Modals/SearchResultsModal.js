import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Modal.css"; // keep your modal styling here

export default function SearchResultsModal({ show, handleClose, results }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    handleClose();
    navigate(`/dish/${id}`); // ✅ make sure this matches your DishDetail route!
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
                key={recipe.id}
                className="search-result-card mb-3 p-2 border rounded d-flex align-items-center"
                onClick={() => handleClick(recipe.id)}
                style={{ cursor: "pointer", transition: "background 0.2s" }}
              >
                <img
                  src={recipe.image || "/placeholder-image.jpg"}
                  alt={recipe.name}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />

                <div className="ms-3" style={{ flex: 1 }}>
                  <h6 className="mb-1 fw-bold">{recipe.name}</h6>
                  <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                    {recipe.category || "Uncategorized"}
                  </p>
                  {recipe.description && (
                    <p
                      className="mb-0 text-truncate"
                      style={{ fontSize: "0.85rem", maxWidth: "100%" }}
                    >
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
