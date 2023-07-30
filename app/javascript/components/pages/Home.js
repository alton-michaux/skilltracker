import React from 'react'
import PropTypes from 'prop-types'
import SkillTrackerButton from '../elements/button'

const Home = ({ user }) => {
  return (
    <div>
      <h5 className="text-center">Welcome to SkillTracker{user.full_name ? ` ${user.full_name}` : ''}!</h5>
      <div className="container-sm">
        <div className="row main-div">
          {
            Object.keys(user).length > 0
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

Home.defaultProps = {
  user: {}
}

Home.propTypes = {
  user: PropTypes.object
}

export default Home
