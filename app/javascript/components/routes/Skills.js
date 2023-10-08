import React from 'react'
import { useAppContext } from '../AppContext'
import Search from '../comps/Search'

const Skills = () => {
  const { state, fetchSkills } = useAppContext()

  // const onSearch = (e) => {
  //   console.log('🚀 ~ file: Skills.js:12 ~ onSearch ~ e:', e)
  //   // const term = e.target.value
  //   fetchSkills(e)
  // }
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
