import React from 'react'
import { useAppContext } from '../AppContext'
import TicketComponent from '../comps/Tickets'

const Tickets = () => {
  const { state } = useAppContext()

  return (
    <div className="text-center">
      <h2>Tickets</h2>
      <ul>
        {
          Object.keys(state.tickets).length > 0
            ? <>
              {
                state?.tickets?.map((ticket) => {
                  return (
                    <li key={ticket.id}>
                      <TicketComponent />
                    </li>
                  )
                })
              } </>
            : <></>
        }
      </ul>
    </div>
  )
}

export default Tickets
