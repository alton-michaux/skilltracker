import React from 'react'
import PropTypes from 'prop-types'

const Skills = ({skills}) => {

  return (
    <div className="text-center">Skills</div>
  )
}

Skills.defaultProps = {
  skills: {}
}

Skills.propTypes = {
  skills: PropTypes.object
}

export default Skills
