// src/App.js

import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Make sure to import your custom styles

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  const handleSignUp = (event) => {
    event.preventDefault();
    // Here you would handle the sign-up logic, e.g., sending the data to your backend
    console.log('Sign Up not implemented');
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    // Here you would handle the sign-in logic
    setUser({ name: 'Sample User', email: 'user@example.com' }); // Placeholder for signed-in user
    console.log('Sign In not implemented');
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ height: '10%' }}>
        <Navbar.Brand href="#home" style={{ height: '100%' }}>
          JobSearch
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#resume-builder">Resume Builder</Nav.Link>
        </Nav>
        <Button variant="outline-primary" onClick={handleShowSignIn}>
          Sign In
        </Button>
        <Button variant="outline-success" onClick={handleShowSignUp}>
          Sign Up
        </Button>
      </Navbar>

      {/* Sign Up Modal */}
      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignUp}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Sign In Modal */}
      <Modal show={showSignIn} onHide={handleCloseSignIn}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignIn}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* User Profile and Sign Out - For Signed In Users */}
      {user && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{user.name}</a>
          </Navbar.Text>
          <Nav>
            <Nav.Link href="#signout" onClick={handleSignOut}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      )}
    </>
  );
}

export default App;
