import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { userLogout } from "../utils/api/user";
import { authorizeJiraSession } from "../utils/api/jiraSessions";
import SkillTrackerButton from "./button"

const SkillTrackerNav = () => {
  const navigate = useNavigate();
  const authorizeJira = async () => {
    try {
      const response = await authorizeJiraSession();
    } catch (error) {
      toast(error)
    }
  }

  const logout = async () => {
    try {
      const response = await userLogout();
      if (response.ok) {
        navigate('/')
        toast('Logged out successfully')
      } else {
        toast(response.statusText)
      }
    } catch (error) {
      toast(error)
    }
  }
  return (
    <div className="nav">
      <SkillTrackerButton
        variant="primary"
        type="submit"
        action={authorizeJira}
      >
        Connect Jira
      </SkillTrackerButton>

      <SkillTrackerButton
        variant="danger"
        type="submit"
        action={logout}
      >
        Logout
      </SkillTrackerButton>
    </div>
  )
}

export default SkillTrackerNav
