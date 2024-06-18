import { z } from 'zod'

export const signinSchema = z.object({
  taiKhoan: z.string().min(5, {
    message: 'Username is required.'
  }),
  matKhau: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  })
})
