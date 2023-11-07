// Header.js
import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';

const Header = () => {
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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" style={{ paddingLeft: '1%' }}>
          JobSearch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#resume-builder">Resume Builder</Nav.Link>
          </Nav>
          {user && (
            <Nav className="ml-auto">
              <Navbar.Text>
                Signed in as: <a href="#login">{user.name}</a>
              </Navbar.Text>
              <Button variant="outline-danger" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
        {!user && (
          <div className="ml-auto">
            <Button
              id="signIn"
              variant="outline-primary"
              onClick={handleShowSignIn}>
              Sign In
            </Button>
            <Button
              id="signUp"
              variant="outline-success"
              onClick={handleShowSignUp}
              style={{ marginLeft: '10px' }}>
              Sign Up
            </Button>
          </div>
        )}
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
};

export default Header;
