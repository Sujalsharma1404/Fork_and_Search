import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import "../Modals/Modal.css";

function MobileSearchModal({
  show,
  handleClose,
  searchQuery,
  setSearchQuery,
  runSearch,
}) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    runSearch();
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen
      dialogClassName="mobile-search-modal"
    >
      <Modal.Header className="border-0 justify-content-between">
        <Form className="w-100 d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="text"
            placeholder="Search recipes..."
            className="mobile-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <Button
            variant="light"
            onClick={handleClose}
            className="mobile-search-close"
          >
            <IoClose size={24} />
          </Button>
        </Form>
      </Modal.Header>
    </Modal>
  );
}

export default MobileSearchModal;
