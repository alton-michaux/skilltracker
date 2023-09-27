import React from 'react'
import { useAppContext } from '../AppContext'

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
                      Title: {ticket?.title}
                      Description: {ticket?.description}
                      Status: {ticket?.status}
                      Labels: {ticket?.labels}
                      Assignee: {ticket?.assignee}
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
