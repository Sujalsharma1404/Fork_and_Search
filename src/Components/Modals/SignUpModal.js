import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { auth } from "../../firebase"; // ✅ Import auth
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUpModal({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      handleClose(); // Close the modal
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center fs-4">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <Form onSubmit={handleSignUp}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </Form.Group>

          <Button type="submit" className="w-100">Create Account</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
