import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { sendToStorage } from '../utils/api/local/storage'

const Callback = ({ client }) => {
  const [jiraClient, setJiraClient] = useState({})

  useEffect(() => {
    if (Object.keys(client).length > 0) {
      setJiraClient(client)
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
