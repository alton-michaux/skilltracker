import React from 'react'
import { useAppContext } from '../AppContext'

const Skills = () => {
  const { state } = useAppContext()
  console.log('🚀 ~ file: Skills.js:6 ~ Skills ~ state:', state)

  return (
    <>
      <div className="text-center">
        <h2>Skills</h2>
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
      </div>
    </>
  )
}

export default Skills
