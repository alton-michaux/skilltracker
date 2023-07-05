import React from "react"
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserProfile = () => {
  const { id } = useParams();

  return(
    <div className="text-center">User Profile</div>
  )
}

UserProfile.propTypes = {
  id: PropTypes.number.isRequired
}

export default UserProfile
