import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
  endpoints: build => ({
    signIn: build.mutation({
      query: body => ({
        url: 'QuanLyNguoiDung/DangNhap',
        method: 'POST',
        data: body
      })
    }),
    signUp: build.mutation({
      query: body => ({
        url: 'QuanLyNguoiDung/DangKy',
        method: 'POST',
        data: body
      })
    }),
    getUserInfo: build.mutation({
      query: () => ({
        url: 'QuanLyNguoiDung/ThongTinTaiKhoan',
        method: 'POST'
      })
    }),
    getUserListByPagination: build.query({
      query: ({ MaNhom, tuKhoa, soTrang, soPhanTuTrenTrang }) => ({
        url: 'QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang',
        params: { MaNhom, tuKhoa, soTrang, soPhanTuTrenTrang }
      }),
      providesTags: result =>
        result
          ? [...result.items.map(({ taiKhoan }) => ({ type: 'User', id: taiKhoan })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }]
    }),
    getUserType: build.query({
      query: () => 'QuanLyNguoiDung/LayDanhSachLoaiNguoiDung'
    }),
    addUser: build.mutation({
      query: body => ({
        url: 'QuanLyNguoiDung/ThemNguoiDung',
        method: 'POST',
        data: body
      }),
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'User', id: 'LIST' }])
    }),
    updateUser: build.mutation({
      query: body => ({
        url: 'QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        method: 'POST',
        data: body
      }),
      invalidatesTags: ({ taiKhoan }, error) =>
        [
          {
            type: 'User',
            id: taiKhoan
          }
        ].concat(error ? [] : [{ type: 'User', id: 'LIST' }])
    }),
    updateClientUser: build.mutation({
      query: body => ({
        url: 'QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        method: 'PUT',
        data: body
      })
    }),
    deleteUser: build.mutation({
      query: taiKhoan => ({
        url: 'QuanLyNguoiDung/XoaNguoiDung',
        method: 'DELETE',
        params: { taiKhoan }
      }),
      invalidatesTags: (result, error) => (error ? [] : [{ type: 'User', id: 'LIST' }])
    })
  })
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetUserInfoMutation,
  useGetUserListByPaginationQuery,
  useGetUserTypeQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useUpdateClientUserMutation,
  useDeleteUserMutation
} = userApi
