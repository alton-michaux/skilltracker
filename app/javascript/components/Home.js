import React from "react"
import SkillTrackerButton from "./elements/button";

const Home = () => {
  return (
    <div>
      <p className="text-center">Welcome to SkillTracker!</p>
      <div className="container-sm">
        <SkillTrackerButton
          variant={"primary"}
        >Log In</SkillTrackerButton>
        <SkillTrackerButton
          variant={"secondary"}
        >Sign Up</SkillTrackerButton>
      </div>
    </div>
  );
}

export default Home
