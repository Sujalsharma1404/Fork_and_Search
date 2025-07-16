import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../Modals/Modal.css";
import SignUpModal from "./SignUpModal"; // ✅ Import the new SignUpModal

function LoginModal({ show, handleClose }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignUp = () => {
    setShowSignUp(true);
    handleClose(); // Close login when opening signup
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center fs-4">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-1">
              Login
            </Button>

            <div className="text-center mt-3">
              <span>Don’t have an account? </span>
              <button
                type="button"
                className="link-button"
                onClick={handleShowSignUp}
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ✅ Sign Up Modal */}
      <SignUpModal show={showSignUp} handleClose={() => setShowSignUp(false)} />
    </>
  );
}

export default LoginModal;
