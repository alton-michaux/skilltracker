import React from "react"
import PropTypes from 'prop-types';

const Callback = ({ client }) => {
  console.log("🚀 ~ file: Callback.js:6 ~ Callback ~ client:", client)
  return (
    <div className="text-center">Jira Authentication Successful</div>
  )
}

Callback.defaultProps = {
  client: {}
}

Callback.propTypes = {
  client: PropTypes.object
}

export default Callback
