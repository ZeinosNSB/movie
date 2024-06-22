import { z } from 'zod'

export const userSchema = z
  .object({
    taiKhoan: z.string().min(5, {
      message: 'Username must be at least 5 characters.'
    }),
    matKhau: z.string().min(8, {
      message: 'Password must be at least 8 characters.'
    }),
    matKhauXacNhan: z.string(),
    hoTen: z.string(),
    email: z.string().email({
      message: 'Email is invalid.'
    }),
    soDt: z.string().min(10, {
      message: 'Phone number must be at least 10 digits.'
    }),
    maNhom: z.string().default('GP01'),
    maLoaiNguoiDung: z.string().default('KhachHang')
  })
  .refine(value => value.matKhau === value.matKhauXacNhan, {
    message: 'The confirm password does not match the original password.',
    path: ['matKhauXacNhan']
  })
