import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
  ticketsSelectingByOther: [{ maGhe: 97484 }, { maGhe: 97483 }]
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTicketsBooking: (state, action) => {
      const index = state.tickets.findIndex(ticket => ticket.maGhe === action.payload.maGhe)
      if (index !== -1) {
        state.tickets.splice(index, 1)
      } else {
        state.tickets.push(action.payload)
      }
    },
    resetTickets: state => {
      state.tickets = []
    }
  }
})

export const { setTicketsBooking, resetTickets } = ticketSlice.actions
export default ticketSlice.reducer
