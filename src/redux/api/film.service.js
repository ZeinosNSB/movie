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
      providesTags: result =>
        result
          ? [...result.items.map(({ maPhim }) => ({ type: 'Film', id: maPhim })), { type: 'Film', id: 'LIST' }]
          : [{ type: 'Film', id: 'LIST' }]
    }),
    addFilm: build.mutation({
      query: body => ({
        url: 'QuanLyPhim/ThemPhimUploadHinh',
        method: 'POST',
        data: body
      }),
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'Film', id: 'LIST' }])
    }),
    updateFilm: build.mutation({
      query: body => ({
        url: 'QuanLyPhim/CapNhatPhimUpload',
        method: 'POST',
        data: body
      }),
      invalidatesTags: ({ maPhim }, error) =>
        [
          {
            type: 'Film',
            id: maPhim
          }
        ].concat(error ? [] : [{ type: 'Film', id: 'LIST' }])
    }),
    deleteFilm: build.mutation({
      query: MaPhim => ({
        url: 'QuanLyPhim/XP',
        method: 'DELETE',
        params: { MaPhim }
      }),
      invalidatesTags: [{ type: 'Film', id: 'LIST' }]
      // invalidatesTags: (result, error) => (error ? [] : [{ type: 'Film', id: 'LIST' }])
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
