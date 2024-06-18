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
    })
  })
})

export const { useSignInMutation } = userApi
