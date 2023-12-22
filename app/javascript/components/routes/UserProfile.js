import React from 'react'
import TicketComponent from '../comps/Tickets'
import SkillComponent from '../comps/Skills'
import { useAppContext } from '../AppContext'

const UserProfile = () => {
  const { state } = useAppContext()
  return (
    <div className='non-scrolling-page-div'>
      <h2 className="text-center mt-3">
        Welcome {state.user.full_name}!
      </h2>
      <div className="text-center main-div user-profile-div">
        <div className="secondary-div user-skills-div">
          <h2>Your Skills</h2>
          <SkillComponent/>
        </div>
        <div className="secondary-div user-tickets-div">
          <h2>Your Work</h2>
          <TicketComponent/>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
