import React from 'react'
import { useAppContext } from '../AppContext'
import { truncate } from '../utils/local/app'

const TicketComponent = () => {
  const { state } = useAppContext()
  return (
    <ul className="ticket-div"> {
      Object.keys(state.tickets).length > 0 &&
      state.tickets.map((ticket) => {
        return (
          <li key={ticket.id}>
            <div className="card">
              <div className="card-body">
                <img src={ticket.reporter_avatar} className="card-img-top reporter-avatar" alt="Issue reporter avatar" />
                <h5 className="card-title">{ticket.title}</h5>
                <h7 className="card-title">{ticket.status}</h7>
                <p className="card-text">{truncate(ticket.description)}</p>
              </div>
            </div>
          </li>
        )
      })
    }
    </ul>
  )
}

export default TicketComponent
