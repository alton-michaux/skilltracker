import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { sendToStorage } from '../utils/local/storage'

const Callback = ({ client }) => {
  useEffect(() => {
    if (Object.keys(client).length > 0) {
      sendToStorage(client, 'client')
    }
  }, [client])

  return (
    <div className="text-center">Jira Auth Succesful</div>
  )
}

Callback.defaultProps = {
  client: {}
}

Callback.propTypes = {
  client: PropTypes.object
}

export default Callback
