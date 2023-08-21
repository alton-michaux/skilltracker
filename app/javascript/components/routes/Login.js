import React from 'react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import PropTypes from 'prop-types'
import userAPI from '../utils/api/user'
import SkillTrackerButton from '../elements/button'

const Login = ({ setLogin }) => {
  const navigate = useNavigate()

  const { userLoginSubmit } = userAPI()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    // Create an object to store the form data
    const data = {}

    for (const [name, value] of formData.entries()) {
      data[name] = value
    }

    // Include the CSRF token in the form data
    data.authenticity_token = document.querySelector('meta[name="csrf-token"]').content
    console.log('🚀 ~ file: Login.js:28 ~ handleSubmit ~ data:', data)

    try {
      const response = await userLoginSubmit(data)
      if (response) {
        const id = response.user_data.id
        const name = response.user_data.full_name

        setLogin(response)

        navigate(`/api/v1/users/${id}/${name}`)

        toast(`Logged in as ${name}`)
      }
    } catch (error) {
      toast(error.message)
    }
  }

  return (
    <div className="text-center d-flex-inline main-div">
      <h2 className="main-headers">Log in</h2>
      <Form onSubmit={handleSubmit}>
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

Login.propTypes = {
  setLogin: PropTypes.func.isRequired
}

export default Login
