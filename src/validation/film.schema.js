import { z } from 'zod'

export const FilmSchema = z.object({
  tenPhim: z.string(),
  trailer: z.string(),
  moTa: z.string(),
  dangChieu: z.boolean(),
  sapChieu: z.boolean(),
  hot: z.boolean(),
  danhGia: z.string()
})
