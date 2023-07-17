import React from "react"
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserProfile = () => {
  const { id, name } = useParams();
  return (
    <>
      <p className="text-center mt-2">
        Welcome {name}!
      </p>
      <div className="text-center main-div">
        <div className="secondary-div">
          <p>Your Skills</p>
        </div>
        <div className="secondary-div">
          <p>Your Work</p>
        </div>
      </div>
    </>
  )
}

UserProfile.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default UserProfile
