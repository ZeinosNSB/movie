import { z } from 'zod'

const MAX_FILE_SIZE = 4 * 1024 * 1024

export const FilmSchema = z.object({
  tenPhim: z.string().min(1, 'Movie name cannot be empty'),
  trailer: z.string().url('Trailer must be a valid URL'),
  moTa: z.string().min(1, 'Description cannot be empty'),
  ngayKhoiChieu: z.date({ message: 'Release date must be a valid date' }),
  dangChieu: z.boolean(),
  sapChieu: z.boolean(),
  hot: z.boolean(),
  danhGia: z.coerce.number().min(0, 'Rating must be at least 0').max(10, 'Rating must be at most 10')
  // hinhAnh: z
  //   .instanceof(File)
  //   .optional()
  //   .refine(file => file.size <= MAX_FILE_SIZE, { message: 'Image size must be less than 4MB' })
})

export const ShowtimeSchema = z.object({
  ngayChieuGioChieu: z.date({ message: 'Showtime must be a valid date' }),
  maRap: z.string().min(1, 'Please select an cinema complex to display.'),
  giaVe: z.string().min(1, 'Ticket price cannot be empty')
})
