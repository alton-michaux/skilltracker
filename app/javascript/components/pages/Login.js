import React from 'react';
import Form from 'react-bootstrap/Form';
import { userLogin } from '../utils/api/user';
import SkillTrackerButton from '../elements/button';

const Login = () => {
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

    await userLogin(data)
      .catch((error) => { throw new Error(error) })
  };

  return (
    <div className="text-center d-flex-inline">
      <h2>Log in</h2>
      <Form onSubmit={handleSubmit}>
        {/* Render form fields */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" required />
        </Form.Group>

        <SkillTrackerButton variant="primary" type="submit">
          Log in
        </SkillTrackerButton>
      </Form>
    </div>
  );
};

export default Login;
