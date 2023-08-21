import React from 'react'
import { useAppContext } from '../AppContext'
import PropTypes from 'prop-types'

const Skills = () => {
  const { state } = useAppContext()

  return (
    <>
      <div className="text-center">Skills</div>
      <ul>
        {
          state.skills.map((skill) => {
            return (
              <li key={skill.id}>{skill.name}</li>
            )
          })
        }
      </ul>
    </>
  )
}

Skills.defaultProps = {
  skills: {}
}

Skills.propTypes = {
  skills: PropTypes.object
}

export default Skills
