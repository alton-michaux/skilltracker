import React from 'react'
import { useAppContext } from '../AppContext'
import PropTypes from 'prop-types'

const Skills = () => {
  const { state } = useAppContext()
  console.log('🚀 ~ file: Skills.js:7 ~ Skills ~ state:', state.skills)

  return (
    <>
      <div className="text-center">Skills</div>
      <ul>
        {
          Object.keys(state.skills).length > 0 &&
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
