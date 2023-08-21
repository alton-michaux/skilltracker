import React from 'react'
import SkillTrackerButton from '../elements/button'
import { useAppContext } from '../AppContext'

const Home = () => {
  const { state } = useAppContext()
  return (
    <div>
      <h5 className="text-center">Welcome to SkillTracker{state.user.full_name ? ` ${state.user.full_name}` : ''}!</h5>
      <div className="container-sm">
        <div className="row main-div">
          {
            Object.keys(state.user).length > 0
              ? <>
            </>
              : <>
              <SkillTrackerButton
                variant={'contained'}
                color={'success'}
                destination={'/api/v1/login'}
              >Log In</SkillTrackerButton>
              <SkillTrackerButton
                variant={'contained'}
                color={'primary'}
                destination={'/api/v1/signup/sign_up'}
              >Sign Up</SkillTrackerButton>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home
