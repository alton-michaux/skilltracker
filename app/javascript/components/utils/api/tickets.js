import { URLFunctions } from '.'

const ticketAPI = () => {
  const { get } = URLFunctions()

  const getUserTickets = (userId) => get(`/api/v1/users/${userId}/tickets`)
  const getUserTicket = (userId, ticketId) => get(`/api/v1/users/${userId}/tickets/${ticketId}`)

  return {
    getUserTickets,
    getUserTicket
  }
}

export default ticketAPI
