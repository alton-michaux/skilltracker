import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, isAuthenticated, onLogout, ...rest }) => {
  const navigate = useNavigate()

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated
          ? (
          <Component {...props} onLogout={onLogout} />
            )
          : <>
          <p>Not authenticated!</p>
          <button
            onClick={navigate('/api/v1/login')}
          ></button>
        </>
      }
    />
  )
}

PrivateRoute.defaultProps = {
  component: undefined,
  rest: undefined
}

PrivateRoute.propTypes = {
  component: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  rest: PropTypes.object
}

export default PrivateRoute
