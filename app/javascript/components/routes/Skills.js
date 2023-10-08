import React from 'react'
import { useAppContext } from '../AppContext'
import Search from '../comps/Search'

const Skills = () => {
  const { state } = useAppContext()
  return (
    <>
      <div className="text-center">
        <div className="search">
          <h2>Search Skills</h2>
          <Search/>
        </div>
        <h2>Results</h2>
        <ul>
          {
            Object.keys(state.skills).length > 0 &&
            state.skills.map((skill, index) => {
              return (
                <li key={index}>{skill}</li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

export default Skills
