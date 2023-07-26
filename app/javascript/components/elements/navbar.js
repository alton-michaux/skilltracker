import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";
import PropTypes from 'prop-types';
import { userLogout } from "../utils/api/user";

const SkillTrackerNav = ({ user, setUser, authString }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response.ok) {
        handleUser({})
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      toast(error)
    }
  }

  const handleUser = (user) => {
    setUser(user)
    toast('Logged out successfully')
    navigate('/')
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => { goHome() }} className='navbar-brand'>SkillTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              Object.keys(user).length > 0 ? <>
                <Nav.Link href={authString}>Connect to Jira</Nav.Link>
                <Nav.Link onClick={() => { navigate(`/api/v1/users/${user.id}/${user.full_name}`) }}>Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </> : <></>
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
  authString: "/"
}

SkillTrackerNav.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  authString: PropTypes.string,
}

export default SkillTrackerNav
