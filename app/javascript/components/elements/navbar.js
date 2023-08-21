import React from 'react'
import { useAppContext } from '../AppContext'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import PropTypes from 'prop-types'

const SkillTrackerNav = ({ user, authString, onLogout }) => {
  const { state, fetchMatchedSkills, fetchSkills, fetchIssues, removeUser } = useAppContext()

  const navigate = useNavigate()

  const id = user.id

  const handleMatchedSkills = (id) => {
    fetchMatchedSkills(id)
    navigate(`api/v1/users/${id}/user_skills`)
  }

  const handleFetchSkills = () => {
    fetchSkills()
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
              Object.keys(user).length > 0
                ? <>
                  {
                    state.isAuthorized
                      ? <>
                        <Nav.Link onClick={(id) => { handleFetchIssues(id) }}>Jira Issues</Nav.Link>
                        <Nav.Link onClick={(id) => { handleMatchedSkills(id) }}>Matched Skills</Nav.Link>
                      </>
                      : <Nav.Link href={authString}>Connect to Jira</Nav.Link>
                  }
                  <Nav.Link onClick={() => { handleFetchSkills() }}>Skills</Nav.Link>
                  <Nav.Link onClick={() => { navigate(`/api/v1/users/${id}/${user.full_name}`) }}>Profile</Nav.Link>
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
