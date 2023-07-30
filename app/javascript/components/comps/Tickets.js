import React from 'react'
import PropTypes from 'prop-types';

const TicketComponent = ({user}) => {
  return (
    user?.tickets?.map((ticket) => {
      return (
        <div class="ticket-div" id={ticket.id}>
          <h4>{ticket.title}</h4>
          <p>{ticket.status}</p>
          <p>{ticket.description}</p>
        </div>
      )
    })
  )
}

TicketComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

export default TicketComponent
