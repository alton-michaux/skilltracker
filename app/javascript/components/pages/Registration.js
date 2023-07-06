import React from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { userRegisterSubmit } from '../utils/api/user';
import SkillTrackerButton from '../elements/button';

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
      await userRegisterSubmit(data)
      navigate('/api/v1/login');
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className="text-center d-flex-inline">
      <h2>Sign up</h2>
      <Form onSubmit={handleSubmit}>
        {/* Render form fields */}
        <Form.Group controlId="formFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="name" name="first_name" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="name" name="last_name" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" required />
        </Form.Group>

        <Form.Group controlId="formPasswordConfirmation">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" name="password_confirmation" required />
        </Form.Group>

        <SkillTrackerButton variant="primary" type="submit">
          Sign up
        </SkillTrackerButton>
      </Form>
    </div>
  );
};

export default Registration;
