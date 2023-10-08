import React from 'react'
import { useAppContext } from '../AppContext'
import { truncate } from '../utils/local/app'

const SkillComponent = () => {
  const { state } = useAppContext()
  return (
    <ul className='list-div'>
      {Object.keys(state.matchedSkills).length > 0
        // eslint-disable-next-line multiline-ternary
        ? (state.matchedSkills.map((skill) => {
            return (
            <li key={skill.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{truncate(skill.name, 50)}</h5>
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

export default SkillComponent
