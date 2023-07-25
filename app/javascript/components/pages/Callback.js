import React from "react"
import PropTypes from 'prop-types';

const Callback = (client) => {
  return(
    <div className="text-center">Here's the callback!</div>
  )
}

Callback.propTypes = {
  client: PropTypes.object.isRequired
}

export default Callback
