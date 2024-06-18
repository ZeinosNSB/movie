import { configureStore } from '@reduxjs/toolkit'

import { cinemaApi } from '@/redux/api/cinema.service'
import { filmApi } from '@/redux/api/film.service'
import { userApi } from '@/redux/api/user.service'

const store = configureStore({
  reducer: {
    [filmApi.reducerPath]: filmApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(filmApi.middleware).concat(cinemaApi.middleware).concat(userApi.middleware)
})

export default store
