import React from 'react';
import Form from 'react-bootstrap/Form';
import SkillTrackerButton from '../elements/button';

const Registration = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="text-center d-flex-inline">
      <h2>Sign up</h2>
      <Form>
        {/* Render form fields */}
        <Form.Group
          className="field"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            autoFocus
            required />
        </Form.Group>

        <Form.Group
          className="field"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required />
        </Form.Group>

        <Form.Group
          className="field"
        >
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            required />
        </Form.Group>

        <SkillTrackerButton
          className="actions"
        >
          <Form.Control type="submit" value="Sign up" />
        </SkillTrackerButton>
      </Form>
    </div>
  );
};

export default Registration;
