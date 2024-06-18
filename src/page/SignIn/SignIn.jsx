import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSignInMutation } from '@/redux/api/user.service'
import { TOKEN, USER_LOGIN } from '@/utils/config'
import { signinSchema } from '@/validation'

function SignIn() {
  const navigate = useNavigate()

  const [signIn] = useSignInMutation()

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      taiKhoan: '',
      matKhau: ''
    }
  })

  const onSubmit = async values => {
    try {
      const result = await signIn(values).unwrap()
      if (result?.content?.accessToken) {
        localStorage.setItem(TOKEN, result?.content?.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(result?.content))
        navigate('/')
      }
    } catch (error) {
      form.setError('submitError', { message: error?.data?.content })
    }
  }

  return (
    <Form {...form}>
      <div className='flex items-center justify-center py-12'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mx-auto grid w-[350px] gap-6'>
            <div className='grid gap-2 text-center'>
              <h1 className='text-3xl font-bold'>Login</h1>
              <p className='text-balance text-muted-foreground'>Enter your email below to login to your account</p>
            </div>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='taiKhoan'
                className='grid gap-2'
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor='taiKhoan'>Email</Label>
                    <FormControl>
                      <Input {...field} id='taiKhoan' placeholder='m@example.com' required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='matKhau'
                className='grid gap-2'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center'>
                      <Label htmlFor='matKhau'>Password</Label>
                      <Link to='/forgot-password' className='ml-auto inline-block text-sm underline'>
                        Forgot your password?
                      </Link>
                    </div>
                    <Input {...field} id='matKhau' type='password' required />
                    <FormMessage name='submitError' />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Login
              </Button>
              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link to='/signup' className='underline'>
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default SignIn
