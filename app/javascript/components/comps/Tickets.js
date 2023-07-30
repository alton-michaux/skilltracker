import React from 'react'
import PropTypes from 'prop-types'

const TicketComponent = ({ user }) => {
  return (
    <ul> {
      user?.tickets?.map((ticket) => {
        return (
          <li key={ticket.id}>
            <div className="ticket-div">
              <h4>{ticket.title}</h4>
              <p>{ticket.status}</p>
              <p>{ticket.description}</p>
            </div>
          </li>
        )
      })
    }
    </ul>
  )
}

TicketComponent.propTypes = {
  user: PropTypes.object.isRequired
}

export default TicketComponent
