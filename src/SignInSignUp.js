// SignInSignUp.js
import React, { useState } from 'react';
import SignUpForm from './SignUp';
import SignInForm from './SignIn';
import Header from './Header'; // Import the Header component
import './styles.css';

const SignInSignUp = () => {
  const [type, setType] = useState('signIn');

  const handleOnClick = (text) => {
    setType(text);
  };

  const containerClass = 'container ' + (type === 'signUp' ? 'right-panel-active' : '');

  return (
    <>
      <Header className="full-width" />
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
  <div className="overlay">
    <div className="overlay-panel overlay-left">
      <h1>Welcome Back!</h1>
      <p>To keep connected with us, please login with your personal info</p>
      <button className="ghost" id="signIn" onClick={() => handleOnClick('signIn')}>
        Sign In
      </button>
    </div>
    <div className="overlay-panel overlay-right">
      <h1>Hello, Doc!</h1>
      <p>Enter your personal details and start the journey with us</p>
      <button className="ghost" id="signUp" onClick={() => handleOnClick('signUp')}>
        Sign Up
      </button>
    </div>
  </div>
</div>
      </div>
    </>
  );
};

export default SignInSignUp;
