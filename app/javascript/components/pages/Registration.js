import React from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { userRegisterSubmit } from '../utils/api/user';
import SkillTrackerButton from '../elements/button';
import '../../styles/App'

const Registration = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Create an object to store the form data
    const data = {};

    for (let [name, value] of formData.entries()) {
      data[name] = value;
    }

    // Include the CSRF token in the form data
    data.authenticity_token = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const response = await userRegisterSubmit(data)
      if (response.ok) {
        toast('Successfully registered')
        navigate('/api/v1/login')
      } else {
        toast(response.statusText)
      }
    } catch (error) {
      toast(error)
    }
  }

  return (
    <div className="text-center d-flex-inline main-div">
      <h2>Sign up</h2>
      <Form onSubmit={handleSubmit}>
        {/* Render form fields */}
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

        <SkillTrackerButton variant="primary" type="submit">
          Sign up
        </SkillTrackerButton>
        <Toaster />
      </Form>
    </div>
  );
};

export default Registration;
