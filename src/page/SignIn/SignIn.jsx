import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSignInMutation } from '@/redux/api/user.service'
import { setUser } from '@/redux/reducer/user.slice'
import { TOKEN, USER_LOGIN } from '@/utils/config'
import { signinSchema } from '@/validation'

function SignIn() {
  const dispatch = useDispatch()
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
      if (result?.accessToken) {
        localStorage.setItem(TOKEN, result?.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(result))
        dispatch(setUser(result))
        navigate('/')
      }
    } catch (error) {
      form.setError('submitError', { message: error?.data?.content })
    }
  }

  return (
    <Form {...form}>
      <Card className='mx-auto w-[400px] my-auto'>
        <CardHeader>
          <CardTitle className='text-xl'>Login</CardTitle>
          <CardDescription>Welcome back! Please enter your credentials to access your account.</CardDescription>
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
          </form>
        </CardContent>
      </Card>
    </Form>
  )
}

export default SignIn
