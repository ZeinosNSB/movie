import { configureStore } from '@reduxjs/toolkit'

import { cinemaApi } from '@/redux/api/cinema.service'
import { filmApi } from '@/redux/api/film.service'
import { ticketApi } from '@/redux/api/ticket.service'
import { userApi } from '@/redux/api/user.service'
import ticketReducer from '@/redux/reducer/ticket.slice'
import userReducer from '@/redux/reducer/user.slice'

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    user: userReducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(filmApi.middleware)
      .concat(cinemaApi.middleware)
      .concat(userApi.middleware)
      .concat(ticketApi.middleware)
})

export default store
