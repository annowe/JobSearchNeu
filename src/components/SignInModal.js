// SignInModal.js

import React from 'react';
import { Modal } from 'react-bootstrap';
import SignInForm from './SignInForm'; // Ensure this path is correct

const SignInModal = ({ show, onHide, onSignIn }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignInForm onSignIn={onSignIn} /> {/* Pass onSignIn to SignInForm */}
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
