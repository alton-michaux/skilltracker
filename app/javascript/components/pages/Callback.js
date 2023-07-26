import React from "react"
import PropTypes from 'prop-types';

const Callback = ({ client }) => {
  return (
    <div className="text-center">Jira Authentication Successful</div>
  )
}

Callback.propTypes = {
  client: PropTypes.object.isRequired
}

export default Callback
