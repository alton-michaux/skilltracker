import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, onLogout, ...rest }) => {
  const navigate = useNavigate()

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} onLogout={onLogout} />
        ) : <>
          <p>Not authenticated!</p>
          <button
            onClick={navigate('/api/v1/login')}
          ></button>
        </>
      }
    />
  );
};

export default PrivateRoute;
