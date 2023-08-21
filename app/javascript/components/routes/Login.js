import React from 'react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import SkillTrackerButton from '../elements/button'
import { useAppContext } from '../AppContext'

const Login = () => {
  const navigate = useNavigate()

  const { handleLoginSubmit } = useAppContext()

  const handleLogin = async (e) => {
    const { id, name } = await handleLoginSubmit(e)
    navigate(`/api/v1/users/${id}/${name}`)
    toast(`Logged in as ${name}`)
  }

  return (
    <div className="text-center d-flex-inline main-div">
      <h2 className="main-headers">Log in</h2>
      <Form onSubmit={(e) => { handleLogin(e) }}>
        <Form.Group controlId="formEmail" className='p-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" className="text-center" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formPassword" className='p-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" className="text-center" required />
        </Form.Group>

        <SkillTrackerButton variant="contained" color="success" type="submit">
          Log in
        </SkillTrackerButton>
        <Toaster />
      </Form>
    </div>
  )
}

export default Login
