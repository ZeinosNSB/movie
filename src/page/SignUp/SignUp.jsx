import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSignUpMutation } from '@/redux/api/user.service'
import { signupSchema } from '@/validation'

function SignUp() {
  const navigate = useNavigate()

  const [signUp] = useSignUpMutation()

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
      matKhauXacNhan: '',
      email: '',
      hoTen: '',
      soDt: '',
      maNhom: ''
    }
  })

  const onSubmit = async values => {
    const { matKhauXacNhan, ...data } = values

    try {
      await signUp(data).unwrap()
      navigate('/signin')
    } catch (error) {
      const err = error?.data?.content
      const userError = err?.startsWith('Tài khoản') && err
      const emailError = err?.startsWith('Email') && err

      form.setError('submitUserError', { message: userError })
      form.setError('submitEmailError', { message: emailError })
    }
  }

  return (
    <Form {...form}>
      <Card className='mx-auto w-[400px] my-auto'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>Join us today! Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='taiKhoan'
                className='grid gap-2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='taiKhoan'>Username</FormLabel>
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
                          <SelectValue placeholder='Select a group ID' />
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
              <Button type='submit' className='w-full'>
                Create an account
              </Button>
              <Button variant='outline' className='w-full'>
                Sign up with GitHub
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link to='/signin' className='underline'>
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  )
}

export default SignUp
