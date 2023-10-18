import React from 'react'
import { useAppContext } from '../AppContext'
import { truncate } from '../utils/local/app'

const TicketComponent = () => {
  const { state } = useAppContext()
  return (
    <ul className="list-div">
      {Object.keys(state.tickets).length > 0
        // eslint-disable-next-line multiline-ternary
        ? (state.tickets.map((ticket) => {
            return (
            <li key={ticket.id} className='list-item-div'>
              <div className="card">
                <div className="card-body">
                  <img src={ticket.reporter_avatar} className="card-img-top reporter-avatar" alt="Issue reporter avatar" />
                  <h5 className="card-title mb-1">{truncate(ticket.title, 50)}</h5>
                </div>
              </div>
            </li>
            )
          })) : (
          <p>No tickets available</p>
          )}
    </ul>
  )
}

export default TicketComponent
