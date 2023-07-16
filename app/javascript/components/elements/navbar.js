import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";
import PropTypes from 'prop-types';
import { userLogout } from "../utils/api/user";
import { authorizeJiraSession } from "../utils/api/jiraSessions";
import { StyleSheetConsumer } from 'styled-components';

const SkillTrackerNav = ({ user, setUser }) => {
  console.log("🚀 ~ file: navbar.js:14 ~ SkillTrackerNav ~ user:", user)
  const navigate = useNavigate();
  const authorizeJira = async () => {
    try {
      const response = await authorizeJiraSession();
    } catch (error) {
      toast(error)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response.ok) {
        setUser({})
        navigate('/')
        toast('Logged out successfully')
      } else {
        toast(response.statusText)
      }
    } catch (error) {
      toast(error)
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">SkillTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {
              Object.keys(user).length > 0 ? <>
                <Nav.Link onClick={authorizeJira}>Connect to Jira</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </> : <></>
            }
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

SkillTrackerNav.defaultProps = {
  user: {}
}

SkillTrackerNav.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
}

export default SkillTrackerNav
