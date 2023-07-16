import React from "react"
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserProfile = () => {
  const { id, name } = useParams();
  return (
    <div className="text-center">
      <p>
        Welcome {name}!
      </p>
    </div>
  )
}

UserProfile.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default UserProfile
