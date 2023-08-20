import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { sendToStorage } from '../utils/local/storage'

const Callback = ({ success }) => {
  useEffect(() => {
    if (success) {
      sendToStorage(success, 'auth')
      toast('Jira Authorization Successful')
    }
  }, [success])

  return (
    <div className="text-center">Jira Auth Succesful</div>
  )
}

Callback.defaultProps = {
  success: false
}

Callback.propTypes = {
  success: PropTypes.bool
}

export default Callback
