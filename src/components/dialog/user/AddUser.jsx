import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAddUserMutation, useGetUserTypeQuery } from '@/redux/api/user.service'
import { userSchema } from '@/validation'

function AddUser() {
  const [open, setOpen] = useState(false)

  const { data: userType } = useGetUserTypeQuery({}, { skip: !open })
  const [addUser, { isLoading }] = useAddUserMutation()

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      matKhauXacNhan: '',
      email: '',
      hoTen: '',
      soDt: '',
      maNhom: '',
      maLoaiNguoiDung: ''
    }
  })

  const onSubmit = async values => {
    const { matKhauXacNhan, ...data } = values

    try {
      await addUser(data).unwrap()
      form.reset()
      setOpen(false)
    } catch (error) {
      const err = error?.data?.content
      const userError = err?.startsWith('Tài khoản') && err
      const emailError = err?.startsWith('Email') && err

      form.setError('submitUserError', { message: userError })
      form.setError('submitEmailError', { message: emailError })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='ml-4'>
          <PlusCircle className='mr-2 size-4' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add New User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Fill in the details below to add a new user.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='taiKhoan'
              className='grid gap-2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='taiKhoan'>User Name</FormLabel>
                  <FormControl>
                    <Input id='taiKhoan' {...field} placeholder='Enter your username' />
                  </FormControl>
                  <FormMessage name='taiKhoan' />
                  <FormMessage name='submitUserError' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='matKhau'
              className='grid gap-2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='matKhau'>Password</FormLabel>
                  <FormControl>
                    <Input id='matKhau' {...field} placeholder='Enter your password' type='password' />
                  </FormControl>
                  <FormMessage name='matKhau' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='matKhauXacNhan'
              className='grid gap-2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='matKhauXacNhan'>Confirm Password</FormLabel>
                  <FormControl>
                    <Input id='matKhauXacNhan' {...field} placeholder='Re-enter your password' type='password' />
                  </FormControl>
                  <FormMessage name='matKhauXacNhan' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              className='grid gap-2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input id='email' {...field} placeholder='Enter your email' />
                  </FormControl>
                  <FormMessage name='email' />
                  <FormMessage name='submitEmailError' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hoTen'
              className='grid gap-2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='hoTen'>Full Name</FormLabel>
                  <FormControl>
                    <Input id='hoTen' {...field} placeholder='Enter your full name' />
                  </FormControl>
                  <FormMessage name='hoTen' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='soDt'
              className='grid gap-2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='soDt'>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      id='soDt'
                      {...field}
                      placeholder='Enter your phone number'
                      type='tel'
                      pattern='[0-9]*'
                      onInput={event => (event.target.value = event.target.value.replace(/[^0-9]/g, ''))}
                      required
                    />
                  </FormControl>
                  <FormMessage name='soDt' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='maNhom'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group ID</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a group ID ' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='GP00'>GP00</SelectItem>
                      <SelectItem value='GP01'>GP01</SelectItem>
                      <SelectItem value='GP02'>GP02</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='maLoaiNguoiDung'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select your type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userType?.map(type => (
                        <SelectItem value={type.maLoaiNguoiDung} key={type.maLoaiNguoiDung}>
                          {type.tenLoai}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='gap-2 pt-2 sm:space-x-0'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit'>
                {isLoading && <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddUser
