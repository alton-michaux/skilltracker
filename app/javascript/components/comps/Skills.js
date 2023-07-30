import React from 'react'
import PropTypes from 'prop-types';

const SkillComponent = ({ user }) => {
  return (
    user?.skills?.map((data) => {
      return (
        <div class="skill-div" id={data.skill.id}>
          <h4>{data.skill.name}</h4>
          <p>{data.skill.description}</p>
        </div>
      )
    })
  )
}

SkillComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

export default SkillComponent
