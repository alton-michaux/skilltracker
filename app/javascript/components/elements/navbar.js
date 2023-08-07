import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import PropTypes from 'prop-types'
import userAPI from '../utils/api/user'
import { retrieveFromStorage } from '../utils/local/storage'

const SkillTrackerNav = ({ user, authString, onLogout }) => {
  const navigate = useNavigate()

  const { userLogout } = userAPI()

  const removeUser = async () => {
    try {
      const response = await userLogout()
      if (response) {
        onLogout()
        toast('Logged out successfully')
        navigate('/')
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const authorized = retrieveFromStorage('authorized?')

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='navbar-brand'>SkillTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              Object.keys(user).length > 0
                ? <>
                  {authorized ? <></> : <Nav.Link href={authString}>Connect to Jira</Nav.Link>}
                  <Nav.Link onClick={() => { navigate(`/api/v1/users/${user.id}/${user.full_name}`) }}>Profile</Nav.Link>
                  <Nav.Link onClick={removeUser}>Logout</Nav.Link>
                </>
                : <></>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Toaster />
    </Navbar >
  )
}

SkillTrackerNav.defaultProps = {
  user: {},
  authString: '/'
}

SkillTrackerNav.propTypes = {
  user: PropTypes.object,
  authString: PropTypes.string,
  onLogout: PropTypes.func.isRequired
}

export default SkillTrackerNav
