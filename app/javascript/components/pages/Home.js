import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SkillTrackerButton from "../elements/button";

const Home = ({user}) => {
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  return (
    <div>
      <p className="text-center">Welcome to SkillTracker{user.full_name ? ` ${user.full_name}`: ""}!</p>
      <div className="container-sm">
        <div className="row main-div">
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

Home.defaultProps = {
  user: {}
}

Home.propTypes = {
  user: PropTypes.object,
}

export default Home
