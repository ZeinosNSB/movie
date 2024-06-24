import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getCinemaInfo: build.query({
      query: () => 'QuanLyRap/LayThongTinHeThongRap'
    }),
    getCinemaShowtimeInfo: build.query({
      query: ({ maNhom, maHeThongRap }) => ({
        url: 'QuanLyRap/LayThongTinLichChieuHeThongRap',
        params: { maNhom, maHeThongRap }
      })
    }),
    getFilmInfo: build.query({
      query: maPhim => ({
        url: 'QuanLyRap/LayThongTinLichChieuPhim',
        params: { maPhim }
      })
    }),
    getCinemaComplexInfo: build.query({
      query: maHeThongRap => ({
        url: 'QuanLyRap/LayThongTinCumRapTheoHeThong',
        params: { maHeThongRap }
      })
    })
  })
})

export const {
  useGetCinemaInfoQuery,
  useGetCinemaShowtimeInfoQuery,
  useGetFilmInfoQuery,
  useGetCinemaComplexInfoQuery
} = cinemaApi
