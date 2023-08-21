import React from 'react'
import { useAppContext } from '../AppContext'

const SkillComponent = () => {
  const { state } = useAppContext()
  return (
    <ul> {
      Object.keys(state.matchedSkills).length > 0 &&
      state.skills.map((skill) => {
        return (
          <li key={skill.id}>
            <div className="skill-div">
              <h4>{skill.name}</h4>
            </div>
          </li>
        )
      })
    }
    </ul>
  )
}

export default SkillComponent
