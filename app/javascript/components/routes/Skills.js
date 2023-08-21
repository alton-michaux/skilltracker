import React from 'react'
import { useAppContext } from '../AppContext'

const Skills = () => {
  const { state } = useAppContext()

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

export default Skills
