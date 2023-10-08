import React from 'react'
import { useAppContext } from '../AppContext'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import PropTypes from 'prop-types'

const SkillTrackerNav = ({ onLogout }) => {
  const { state, fetchMatchedSkills, fetchIssues, removeUser } = useAppContext()

  const navigate = useNavigate()

  const handleMatchedSkills = (id) => {
    fetchMatchedSkills(id)
    navigate(`api/v1/users/${id}/user_skills`)
  }

  const handleFetchSkills = () => {
    navigate('api/v1/skills')
  }

  const handleFetchIssues = (id) => {
    fetchIssues()
    navigate(`/api/v1/users/${id}/tickets`)
  }

  const handleRemoveUser = (logoutFunc) => {
    removeUser(logoutFunc)
    navigate('/')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='navbar-brand'>SkillTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              Object.keys(state.user).length > 0
                ? <>
                  {
                    state.isAuthorized
                      ? <>
                        <Nav.Link onClick={() => { handleFetchIssues(state.user.id) }}>Jira Issues</Nav.Link>
                        <Nav.Link onClick={() => { handleMatchedSkills(state.user.id) }}>Matched Skills</Nav.Link>
                      </>
                      : <Nav.Link href={state.authString}>Connect to Jira</Nav.Link>
                  }
                  <Nav.Link onClick={() => { handleFetchSkills() }}>Skills</Nav.Link>
                  <Nav.Link onClick={() => { navigate(`/api/v1/users/${state.user.id}/${state.user.full_name}`) }}>Profile</Nav.Link>
                  <Nav.Link onClick={() => { handleRemoveUser(onLogout) }}>Logout</Nav.Link>
                </>
                : <></>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

SkillTrackerNav.propTypes = {
  onLogout: PropTypes.func.isRequired
}

export default SkillTrackerNav
