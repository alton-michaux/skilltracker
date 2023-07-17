import React from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { userLoginSubmit } from '../utils/api/user';
import SkillTrackerButton from '../elements/button';
import '../../styles/App'

const Login = ({ setUser }) => {
  const navigate = useNavigate()

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
      const response = await userLoginSubmit(data);
      if (response.status === 200) {
        // Successful login
        const data = await response.json();
        const id = data.user.id;
        const name = data.user.full_name;

        setUser(data.user)

        navigate(`/api/v1/users/${id}/${name}`);

        toast(`Logged in as ${name}`)
      } else {
        // Failed login
        const errorResponse = await response.json();
        toast(errorResponse.error);
      }
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className="text-center d-flex-inline main-div">
      <h2>Log in</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" className="text-center" autoFocus required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" className="text-center" required />
        </Form.Group>

        <SkillTrackerButton variant="primary" type="submit">
          Log in
        </SkillTrackerButton>
        <Toaster />
      </Form>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Login;
