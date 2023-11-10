// src/App.js

import React, { useState } from 'react';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import { signUp, signIn } from './services/authService'; // Import the signUp and signIn function
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // State to track the sign-up and sign-in status messages
  const [signupStatus, setSignupStatus] = useState({
    success: false,
    message: '',
  });
  const [signinStatus, setSigninStatus] = useState({
    success: false,
    message: '',
  });

  const handleSignUp = async (userData) => {
    try {
      const response = await signUp(userData); // Call the signUp function
      console.log('Sign up success:', response.data);
      setSignupStatus({
        success: true,
        message: 'Sign up successful! Welcome aboard!',
      });
      // Here, you can clear the form or redirect the user as needed
    } catch (error) {
      console.error(
        'Sign up failed:',
        error.response ? error.response.data : error.message
      );
      setSignupStatus({
        success: false,
        message: 'Sign up failed. Please try again.',
      });
    }
  };

  const handleSignIn = async (userData) => {
    try {
      const response = await signIn(userData);
      console.log('Sign in success:', response.data);
      // Handle successful sign in here, like storing the token and updating UI
      setSigninStatus({
        success: true,
        message: 'Sign in successful! Welcome back!',
      });
      localStorage.setItem('userToken', response.data.token);
    } catch (error) {
      console.error(
        'Sign in failed:',
        error.response ? error.response.data : error.message
      );
      setSigninStatus({
        success: false,
        message: 'Sign in failed. Please try again.',
      });
    }
  };

  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('userToken');
    setSigninStatus({ success: false, message: 'You have been signed out.' });
    // Update the UI to reflect that the user is signed out
  };

  return (
    <div className="App">
      <h1>Sign Up</h1>
      {/* Display the sign-up status message */}
      {signupStatus.message && (
        <div
          className={`alert ${
            signupStatus.success ? 'alert-success' : 'alert-danger'
          }`}>
          {signupStatus.message}
        </div>
      )}
      <SignUpForm onSignUp={handleSignUp} />

      <h1>Sign In</h1>
      {/* Display the sign-in status message */}
      {signinStatus.message && (
        <div
          className={`alert ${
            signinStatus.success ? 'alert-success' : 'alert-danger'
          }`}>
          {signinStatus.message}
        </div>
      )}
      <SignInForm onSignIn={handleSignIn} />

      {/* Sign Out Button */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;
