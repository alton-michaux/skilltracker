import React from 'react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import SkillTrackerButton from '../elements/button'
import { useAppContext } from '../AppContext'

const Registration = () => {
  const navigate = useNavigate()

  const { handleRegistrationSubmit } = useAppContext()

  const handleRegistration = (e) => {
    try {
      handleRegistrationSubmit(e)
      toast('Successfully registered')
      navigate('/api/v1/login')
    } catch (error) {
      toast(error)
    }
  }

  return (
    <div className="text-center d-flex-inline main-div">
      <h2 className="main-headers">Sign up</h2>
      <Form onSubmit={(e) => { handleRegistration(e) }} className="main-headers">
        <Form.Group controlId="formFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="name" name="first_name" className="text-center" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="name" name="last_name" className="text-center" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" className="text-center" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" className="text-center" required />
        </Form.Group>

        <Form.Group controlId="formPasswordConfirmation">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" name="password_confirmation" className="text-center" required />
        </Form.Group>

        <SkillTrackerButton variant="contained" color="success" type="submit">
          Sign up
        </SkillTrackerButton>
        <Toaster />
      </Form>
    </div>
  )
}

export default Registration
