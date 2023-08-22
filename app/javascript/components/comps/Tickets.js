import React from 'react'
import { useAppContext } from '../AppContext'

const TicketComponent = () => {
  const { state } = useAppContext()
  return (
    <ul> {
      Object.keys(state.tickets).length > 0 &&
      state.tickets.map((ticket) => {
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

export default TicketComponent
