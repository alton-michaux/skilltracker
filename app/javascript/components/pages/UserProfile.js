import React from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import TicketComponent from '../comps/Tickets'
import SkillComponent from '../comps/Skills'

const UserProfile = ({ user }) => {
  const { name } = useParams()
  return (
    <>
      <h2 className="text-center">
        Welcome {name}!
      </h2>
      <div className="text-center main-div user-profile-div">
        <div className="secondary-div user-skills-div">
          <h2>Your Skills</h2>
          <SkillComponent
            user={user}
          ></SkillComponent>
        </div>
        <div className="secondary-div user-tickets-div">
          <h2>Your Work</h2>
          <TicketComponent
            user={user}
          ></TicketComponent>
        </div>
      </div>
    </>
  )
}

UserProfile.defaultProps = {
  id: 0,
  name: ''
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.number,
  name: PropTypes.string
}

export default UserProfile
