import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Film'],
  endpoints: build => ({
    getBannerFilm: build.query({
      query: () => 'QuanLyPhim/LayDanhSachBanner'
    }),
    getFilmList: build.query({
      query: ({ maNhom, tenPhim }) => ({
        url: 'QuanLyPhim/LayDanhSachPhim',
        params: { maNhom, tenPhim }
      })
    }),
    getFilmListByPagination: build.query({
      query: ({ maNhom, tenPhim, soTrang, soPhanTuTrenTrang }) => ({
        url: 'QuanLyPhim/LayDanhSachPhimPhanTrang',
        params: { maNhom, tenPhim, soTrang, soPhanTuTrenTrang }
      }),
      providesTags: ['Film']
    }),
    addFilm: build.mutation({
      query: body => ({
        url: 'QuanLyPhim/ThemPhimUploadHinh',
        method: 'POST',
        data: body
      }),
      invalidatesTags: ['Film'] //Hoi thua:))
    }),
    updateFilm: build.mutation({
      query: body => ({
        url: 'QuanLyPhim/CapNhatPhimUpload',
        method: 'POST',
        data: body
      }),
      invalidatesTags: ['Film']
    }),
    deleteFilm: build.mutation({
      query: MaPhim => ({
        url: 'QuanLyPhim/XP',
        method: 'DELETE',
        params: { MaPhim }
      }),
      invalidatesTags: ['Film']
    })
  })
})

export const {
  useGetBannerFilmQuery,
  useGetFilmListQuery,
  useGetFilmListByPaginationQuery,
  useAddFilmMutation,
  useUpdateFilmMutation,
  useDeleteFilmMutation
} = filmApi
