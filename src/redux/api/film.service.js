import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getBannerFilm: build.query({
      query: () => 'QuanLyPhim/LayDanhSachBanner'
    }),
    getFilmList: build.query({
      query: ({ maNhom, tenPhim }) => ({
        url: 'QuanLyPhim/LayDanhSachPhim',
        params: { maNhom, tenPhim }
      })
    })
  })
})

export const { useGetBannerFilmQuery, useGetFilmListQuery } = filmApi