import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillTrackerButton from "../elements/button";

const Home = () => {
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  return (
    <div>
      <p className="text-center">Welcome to SkillTracker!</p>
      <div className="container-sm">
        <div className="row login-card">
          <SkillTrackerButton
            variant={"primary"}
            destination={"/api/v1/login"}
          >Log In</SkillTrackerButton>
          <SkillTrackerButton
            variant={"secondary"}
            destination={"/api/v1/signup/sign_up"}
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
