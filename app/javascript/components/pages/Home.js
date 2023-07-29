import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SkillTrackerButton from "../elements/button";

const Home = ({ user }) => {
  return (
    <div>
      <p className="text-center">Welcome to SkillTracker{user.full_name ? ` ${user.full_name}` : ""}!</p>
      <div className="container-sm">
        <div className="row main-div">
          {
            user ? <>
            </> : <>
              <SkillTrackerButton
                variant={"primary"}
                destination={"/api/v1/login"}
              >Log In</SkillTrackerButton>
              <SkillTrackerButton
                variant={"secondary"}
                destination={"/api/v1/signup/sign_up"}
              >Sign Up</SkillTrackerButton>
            </>
          }
        </div>
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
