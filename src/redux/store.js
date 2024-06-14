import { configureStore } from '@reduxjs/toolkit'

import { filmManagementApi } from '@/redux/api/film-management.service'

const store = configureStore({
  reducer: {
    [filmManagementApi.reducerPath]: filmManagementApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(filmManagementApi.middleware)
})

export default store
