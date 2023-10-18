import React from 'react'
import { useAppContext } from '../AppContext'
import SkillComponent from '../comps/Skills'
import Search from '../comps/Search'

const Skills = () => {
  const { state } = useAppContext()
  return (
    <>
      <div className="text-center">
        <div className="search">
          <Search
            label='Search Skills'
          />
        </div>
        {
          Object.keys(state.skills).length > 0
            ? <>
              <h2>Results</h2>
              <SkillComponent
                skills={state.skills}
              />
            </>
            : <><h4>No Skills Available</h4></>
        }
      </div>
    </>
  )
}

export default Skills
