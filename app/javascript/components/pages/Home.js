import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SkillTrackerButton from "../elements/button";
import { userLogin, userRegister } from "../utils/api/user";

const Home = () => {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');


  const handleLogin = () => {
    // Make the login API call
    userLogin(formData)
      .then((response) => {
        // Handle the successful login response
        if (response.status === 200) {
          // Redirect to a different page or update the state
          navigate('/api/v1/login');
        } else {
          setLoginError('Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        setLoginError('An error occurred during login.');
      });
  };

  const handleSignup = () => {
    // Make the sign-up API call
    userRegister(formData)
      .then((response) => {
        // Handle the successful sign-up response
        if (response.status === 200) {
          // Redirect to a different page or update the state
          navigate('api/v1/signup/sign_up');
        } else {
          setSignupError('Sign-up failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Sign-up error:', error);
        setSignupError('An error occurred during sign-up.');
      });
  };
  return (
    <div>
      <p className="text-center">Welcome to SkillTracker!</p>
      <div className="container-sm">
        <div className="row login-card">
          <SkillTrackerButton
            variant={"primary"}
            action={handleLogin}
          >Log In</SkillTrackerButton>
          <SkillTrackerButton
            variant={"secondary"}
            action={handleSignup}
          >Sign Up</SkillTrackerButton>
        </div>

        {/* Display any login or sign-up errors */}
        {loginError && <p>{loginError}</p>}
        {signupError && <p>{signupError}</p>}
      </div>
    </div>
  );
}

export default Home
