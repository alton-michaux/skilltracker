import React from 'react'
import { truncate } from '../utils/local/app'
import PropTypes from 'prop-types'

const SkillComponent = ({ skills }) => {
  return (
    <ul className='list-div'>
      {Object.keys(skills).length > 0
        // eslint-disable-next-line multiline-ternary
        ? (skills.map((skill) => {
            return (
            <li key={skill}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{truncate(skill, 50)}</h5>
                </div>
              </div>
            </li>
            )
          })) : (
          <p>No skills available</p>
          )}
    </ul>
  )
}

SkillComponent.defaultProps = {
  skills: []
}

SkillComponent.propTypes = {
  skills: PropTypes.array
}

export default SkillComponent
