// src/Modals/LoginModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import SignUpModal from "./SignUpModal";
import "../Modals/Modal.css";

function LoginModal({ show, handleClose }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleShowSignUp = () => {
    setShowSignUp(true);
    handleClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      handleClose(); // Close modal
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center fs-4">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-1">
              Login
            </Button>
          </Form>

        </Modal.Body>
      </Modal>

      <SignUpModal show={showSignUp} handleClose={() => setShowSignUp(false)} />
    </>
  );
}

export default LoginModal;
