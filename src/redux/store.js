import { configureStore } from '@reduxjs/toolkit'

import { cinemaApi } from '@/redux/api/cinema.service'
import { filmApi } from '@/redux/api/film.service'

const store = configureStore({
  reducer: {
    [filmApi.reducerPath]: filmApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(filmApi.middleware).concat(cinemaApi.middleware)
})

export default store
