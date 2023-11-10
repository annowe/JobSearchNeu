// Header.jsx

import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import SignInModal from './SignInModal'; // Adjust the path according to your file structure
import SignUpModal from './SignUpModal'; // Adjust the path according to your file structure

const Header = ({
  isAuthenticated,
  signupStatus,
  signinStatus,
  handleSignUp,
  handleSignIn,
  handleSignOut,
}) => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home">JobSearch</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#resume-builder">Resume Builder</Nav.Link>
            <Nav.Link href="#about-us">About Us</Nav.Link>
            {/* Search bar */}
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search jobs"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          <Nav className="justify-content-end" style={{ width: '100%' }}>
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowSignInModal(true)}
                  className="ml-2">
                  Sign In
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowSignUpModal(true)}
                  className="ml-2">
                  Sign Up
                </Button>
              </>
            ) : (
              <NavDropdown
                title={<BsPerson size="1.5em" />}
                id="collasible-nav-dropdown"
                alignRight>
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modals */}
      <SignInModal
        show={showSignInModal}
        onHide={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
        signinStatus={signinStatus}
      />
      <SignUpModal
        show={showSignUpModal}
        onHide={() => setShowSignUpModal(false)}
        onSignUp={handleSignUp}
        signupStatus={signupStatus}
      />
    </>
  );
};

export default Header;
