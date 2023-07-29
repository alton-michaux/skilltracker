import React from "react"
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import TicketComponent from "../comps/Tickets";
import SkillComponent from "../comps/Skills";

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
          <SkillComponent
            user={user}
          ></SkillComponent>
        </div>
        <div className="secondary-div">
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
  name: ""
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.number,
  name: PropTypes.string
}

export default UserProfile
