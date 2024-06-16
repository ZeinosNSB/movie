import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getCinemaShowtimeInfo: build.query({
      query: ({ maNhom, maHeThongRap }) => ({
        url: 'QuanLyRap/LayThongTinLichChieuHeThongRap',
        params: { maNhom, maHeThongRap }
      })
    })
  })
})

export const { useGetCinemaShowtimeInfoQuery } = cinemaApi
