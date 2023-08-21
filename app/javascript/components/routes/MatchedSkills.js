import React from 'react'
import { useAppContext } from '../AppContext'

const MatchedSkills = () => {
  const { state } = useAppContext()
  console.log('🚀 ~ file: MatchedSkills.js:6 ~ MatchedSkills ~ state:', state)
  return (
    <div className="text-center">
      <h2>Matched Skills</h2>
      <ul>
        {
          Object.keys(state.matchedSkills).length > 0 &&
          state.matchedSkills.map((skill) => {
            return (
              <li key={skill.id}>{skill.skill.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default MatchedSkills
