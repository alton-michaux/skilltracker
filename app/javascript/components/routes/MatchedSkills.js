import React from 'react'
import PropTypes from 'prop-types'

const MatchedSkills = () => {
  return (
    <div className="text-center">Matched Skills</div>
  )
}

MatchedSkills.defaultProps = {
  id: 0
}

MatchedSkills.propTypes = {
  id: PropTypes.number.isRequired
}

export default MatchedSkills
