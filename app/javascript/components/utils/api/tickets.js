import { get } from './index';

export const getUserTickets = (userId) => get(`/api/v1/users/${userId}/tickets`);
export const getUserTicket = (userId, ticketId) => get(`/api/v1/users/${userId}/tickets/${ticketId}`);
