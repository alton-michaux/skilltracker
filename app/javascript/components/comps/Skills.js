import React from 'react'
import PropTypes from 'prop-types';

const SkillComponent = ({ user }) => {
  return (
    <ul> {
      user?.skills?.map((data) => {
        return (
          <li key={data.skill.id}>
            <div className="skill-div">
              <h4>{data.skill.name}</h4>
              <p>{data.skill.description}</p>
            </div>
          </li>
        )
      })
    }
    </ul>
  )
}

SkillComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

export default SkillComponent
