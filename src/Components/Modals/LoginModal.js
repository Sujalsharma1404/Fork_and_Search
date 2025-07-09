import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../Modals/Modal.css";

function LoginModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} centered className="login-modal">
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

                    <Button variant="dark" type="submit" className="w-100 rounded-1">
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;
