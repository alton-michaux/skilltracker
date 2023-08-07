import React from 'react'
import PropTypes from 'prop-types'

const Tickets = ({issues}) => {
  return (
    <>
      <div className="text-center">Tickets</div>
    </>
  )
}

Tickets.defaultProps = {
  issues: {}
}

Tickets.propTypes = {
  issues: PropTypes.object
}

export default Tickets
