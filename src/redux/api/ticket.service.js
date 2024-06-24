import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '@/service/axiosBaseQuery'

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Ticket'],
  endpoints: build => ({
    getMovieTickets: build.query({
      query: maLichChieu => ({
        url: `/QuanLyDatVe/LayDanhSachPhongVe`,
        method: 'GET',
        params: { maLichChieu }
      }),
      providesTags: [{ type: 'Ticket' }]
    }),
    bookTickets: build.mutation({
      query: body => ({
        url: 'QuanLyDatVe/DatVe',
        method: 'POST',
        data: body
      }),
      invalidatesTags: [{ type: 'Ticket' }]
    }),
    createShowtime: build.mutation({
      query: body => ({
        url: 'QuanLyDatVe/TaoLichChieu',
        method: 'POST',
        data: body
      })
    })
  })
})

export const { useGetMovieTicketsQuery, useBookTicketsMutation, useCreateShowtimeMutation } = ticketApi
