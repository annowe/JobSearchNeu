// src/App.js

import React, { useState } from 'react';
import Header from './components/Header'; // Make sure the path is correct
import { signUp, signIn } from './services/authService'; // Import the signUp and signIn functions
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signupStatus, setSignupStatus] = useState('');
  const [signinStatus, setSigninStatus] = useState('');

  const handleSignUp = async (userData) => {
    try {
      const response = await signUp(userData);
      setSignupStatus('Sign up successful! Welcome aboard!');
      setIsAuthenticated(true);
    } catch (error) {
      setSignupStatus(
        error.response
          ? error.response.data.message
          : 'Sign up failed. Please try again.'
      );
    }
  };

  const handleSignIn = async (userData) => {
    try {
      const response = await signIn(userData);
      setSigninStatus('Sign in successful! Welcome back!');
      setIsAuthenticated(true);
    } catch (error) {
      setSigninStatus(
        error.response
          ? error.response.data.message
          : 'Sign in failed. Please try again.'
      );
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setSigninStatus('You have been signed out.');
  };

  return (
    <div className="App">
      <Header
        isAuthenticated={isAuthenticated}
        signupStatus={signupStatus}
        signinStatus={signinStatus}
        handleSignUp={handleSignUp}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
      />
      {/* The rest of your application components go here */}
    </div>
  );
}

export default App;
