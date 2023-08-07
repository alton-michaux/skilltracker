import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { sendToStorage } from '../utils/local/storage'
import { toast } from 'react-hot-toast'

const Callback = ({ success }) => {
  useEffect(() => {
    if (success) {
      toast('Jira Authorization Successful')
      sendToStorage(success, 'auth')
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
