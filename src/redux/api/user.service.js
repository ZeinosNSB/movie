import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    signIn: build.mutation({
      query: body => ({
        url: 'QuanLyNguoiDung/DangNhap',
        method: 'POST',
        data: body
      })
    }),
    getUserInfo: build.mutation({
      query: () => ({
        url: 'QuanLyNguoiDung/ThongTinTaiKhoan',
        method: 'POST'
      })
    })
  })
})

export const { useSignInMutation, useGetUserInfoMutation } = userApi
