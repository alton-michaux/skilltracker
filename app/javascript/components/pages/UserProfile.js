import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SkillTrackerButton from '../elements/button';
import { userLogout } from "../utils/api/user";

const UserProfile = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();

  const logout = async () => {
    try {
      const response = await userLogout();
      if (response.ok) {
        navigate('/')
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className="text-center">
      <p>
        Welcome {name}!
      </p>
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

UserProfile.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default UserProfile
