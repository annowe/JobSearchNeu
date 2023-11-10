// SignUpModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';
import SignUpForm from './SignUpForm'; // Import your existing SignUpForm

const SignUpModal = ({ show, onHide, onSignUp }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignUpForm onSignUp={onSignUp} />{' '}
        {/* Make sure to pass onSignUp here */}
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
