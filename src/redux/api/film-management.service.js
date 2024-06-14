import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const filmManagementApi = createApi({
  reducerPath: 'filmManagementApi',
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

export const { useGetBannerFilmQuery } = filmManagementApi
