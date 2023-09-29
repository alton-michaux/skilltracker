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
              <div className="card">
                <div className="card-body">
                  <img src={ticket.reporter_avatar} className="card-img-top reporter-avatar" alt="Issue reporter avatar" />
                  <h5 className="card-title">{ticket.title}</h5>
                  <h7 className="card-text">{ticket.status}</h7>
                  <p className="card-text">{ticket.description}</p>
                </div>
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
