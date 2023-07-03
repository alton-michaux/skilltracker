import React from "react"
import SkillTrackerButton from "./elements/button";
import { userLogin, userRegister } from "./utils/api/user";

const Home = () => {
  return (
    <div>
      <p className="text-center">Welcome to SkillTracker!</p>
      <div className="container-sm">
        <SkillTrackerButton
          variant={"primary"}
          action={userLogin}
        >Log In</SkillTrackerButton>
        <SkillTrackerButton
          variant={"secondary"}
          action={userRegister}
        >Sign Up</SkillTrackerButton>
      </div>
    </div>
  );
}

export default Home
