import ticketData from '../data/tickets.json';

export function allTickets() {
  return ticketData.items || [];
}

export function findTicket(id) {
  return allTickets().find((ticket) => ticket.id === id) || allTickets()[0];
}

export function firstUnassigned() {
  return allTickets().find((ticket) => !ticket.assignee || ticket.assignee === 'Unassigned');
}
