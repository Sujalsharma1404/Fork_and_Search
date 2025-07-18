import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Modal.css"; // ✅ your modal styling

function SearchResultsModal({ show, handleClose, results }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    handleClose();
    navigate(`/recipe/${id}`);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="search-results-modal">
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {results && results.length > 0 ? (
          results.map((recipe) => (
            <div
              key={recipe.id}
              className="search-result-card mb-3 p-2 border rounded d-flex align-items-center"
              onClick={() => handleClick(recipe.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
              />
              <div className="ms-3" style={{ flex: 1 }}>
                <h6 className="mb-1">{recipe.name}</h6>
                <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>{recipe.category}</p>
                {recipe.description && (
                  <p className="mb-0" style={{ fontSize: "0.85rem" }}>{recipe.description.slice(0, 60)}...</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchResultsModal;
