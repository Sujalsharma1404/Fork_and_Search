import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "../Modals/Modal.css";

function SignUpModal({ show, handleClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Create Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Create user doc in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        isAdmin: false, // default
        createdAt: serverTimestamp(),
      });

      alert("Account created successfully!");
      handleClose();
    } catch (error) {
      alert("Error creating account: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="w-100 text-center fs-4">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <Form onSubmit={handleSignUp}>
          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 rounded-1">
            Create Account
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
