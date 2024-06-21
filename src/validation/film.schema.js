import { z } from 'zod'

export const addFilmSchema = z.object({
  tenPhim: z.string(),
  trailer: z.string(),
  moTa: z.string(),
  // ngayKhoiChieu: z.string(),
  dangChieu: z.boolean(),
  sapChieu: z.boolean(),
  hot: z.boolean()
  // danhGia: z.number().min(1).max(10)
  // hinhAnh: z.instanceof(File).refine(file => file.size < 7000000, {
  //   message: 'Your resume must be less than 7MB.'
  // })
})
