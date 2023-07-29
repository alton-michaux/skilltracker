import React from "react"
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserProfile = ({ user }) => {
  const { id, name } = useParams();
  return (
    <>
      <p className="text-center mt-2">
        Welcome {name}!
      </p>
      <div className="text-center main-div">
        <div className="secondary-div">
          <h2>Your Skills</h2>
          {
            user?.skills?.map((data) => {
              return (
                <div id={data.skill.id}>
                  <h4>{data.skill.name}</h4>
                  <p>{data.skill.description}</p>
                </div>
              )
            })}
        </div>
        <div className="secondary-div">
          <h2>Your Work</h2>
          {
            user?.tickets?.map((ticket) => {
              return (
                <div id={ticket.id}>
                  <h4>{ticket.title}</h4>
                  <p>{ticket.status}</p>
                  <p>{ticket.description}</p>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

UserProfile.defaultProps = {
  id: 0,
  name: ""
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.number,
  name: PropTypes.string
}

export default UserProfile
