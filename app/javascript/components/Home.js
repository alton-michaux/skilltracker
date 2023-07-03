import React from "react"
import SkillTrackerButton from "./elements/button";

const Home = () => {
  return (
    <div>
      <p className="text-center">Welcome to SkillTracker!</p>
      <SkillTrackerButton
        variant={"primary"}
      >Log In</SkillTrackerButton>
      <SkillTrackerButton
        variant={"secondary"}
      >sign Up</SkillTrackerButton>
    </div>
  );
}

export default Home
