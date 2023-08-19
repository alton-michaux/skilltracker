import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import PropTypes from 'prop-types'
import userAPI from '../utils/api/user'
import jiraAPI from '../utils/api/jira'
import SkillAPI from '../utils/api/skills'
import { retrieveFromStorage } from '../utils/local/storage'

const SkillTrackerNav = ({ user, authString, onLogout }) => {
  const navigate = useNavigate()
  const id = user.id

  const { userLogout } = userAPI()

  const { getJiraIssues } = jiraAPI()

  const { getSkills, matchedSkills } = SkillAPI()

  const fetchMatchedSkills = async () => {
    try {
      await matchedSkills(id)
      navigate(`api/v1/users/${id}/user_skills`)
    } catch (error) {
      toast(error.message)
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await getSkills()
      if (response) {
        navigate('api/v1/skills')
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const fetchIssues = async () => {
    try {
      const response = await getJiraIssues()
      if (response) {
        navigate(`/api/v1/users/${id}/tickets`)
      }
    } catch (error) {
      toast(error.message)
    }
  }

  const removeUser = async () => {
    try {
      await userLogout()
      onLogout()
      toast('Logged out successfully')
      navigate('/')
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
                  {
                    authorized
                      ? <>
                        <Nav.Link onClick={fetchIssues}>Jira Issues</Nav.Link>
                        <Nav.Link onClick={fetchMatchedSkills}>Matched Skills</Nav.Link>
                      </>
                      : <Nav.Link href={authString}>Connect to Jira</Nav.Link>
                  }
                  <Nav.Link onClick={fetchSkills}>Skills</Nav.Link>
                  <Nav.Link onClick={() => { navigate(`/api/v1/users/${id}/${user.full_name}`) }}>Profile</Nav.Link>
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
