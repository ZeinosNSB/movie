import { ReloadIcon } from '@radix-ui/react-icons'
import moment from 'moment'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUpdateClientUserMutation } from '@/redux/api/user.service'

function Profile() {
  const { userInfo } = useSelector(state => state.user)

  const [updateClientUser, { isLoading }] = useUpdateClientUserMutation()

  const form = useForm({
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

  useEffect(() => {
    form.setValue('taiKhoan', userInfo?.taiKhoan)
    form.setValue('email', userInfo?.email)
    form.setValue('hoTen', userInfo?.hoTen)
    form.setValue('soDt', userInfo?.soDT)
    form.setValue('matKhauXacNhan', userInfo?.matKhau)
    form.setValue('matKhau', userInfo?.matKhau)
  }, [form, userInfo])

  const onSubmit = async values => {
    values.maLoaiNguoiDung = 'KhachHang'
    const { matKhauXacNhan, ...data } = values

    try {
      await updateClientUser(data).unwrap()
      form.reset()
      toast.success('Your profile updated successfully')
    } catch (error) {
      const err = error?.data?.content
      const userError = err?.startsWith('Tài khoản') && err
      const emailError = err?.startsWith('Email') && err

      form.setError('submitUserError', { message: userError })
      form.setError('submitEmailError', { message: emailError })
    }
  }

  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
      <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-3xl font-semibold'>Profile</h1>
      </div>
      <Tabs
        defaultValue='on'
        orientation='vertical'
        className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'
      >
        <TabsList className='text-sm text-muted-foreground'>
          <TabsTrigger className='w-full' value='on'>
            General
          </TabsTrigger>
          <TabsTrigger className='w-full' value='off'>
            Order History
          </TabsTrigger>
        </TabsList>
        <TabsContent value='on'>
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                View and update your personal details below. Ensure your information is accurate.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='taiKhoan'
                    className='grid gap-2'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='taiKhoan'>User Name</FormLabel>
                        <FormControl>
                          <Input id='taiKhoan' {...field} placeholder='Enter your full name' />
                        </FormControl>
                        <FormMessage name='taiKhoan' />
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
                </CardContent>
                <CardFooter className='border-t px-6 py-4'>
                  <Button type='submit'>
                    {isLoading && <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />}
                    Save
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        <TabsContent value='off' className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Your Order History</CardTitle>
              <CardDescription>View your previous orders and track your current order status.</CardDescription>
            </CardHeader>
            <ScrollArea className='h-[1050px] overflow-hidden'>
              <CardContent>
                {userInfo?.thongTinDatVe.length === 0 && (
                  <div className='flex justify-center items-center h-96'>
                    <p className='text-lg text-muted-foreground'>You have no order history</p>
                  </div>
                )}
                {userInfo?.thongTinDatVe?.map(order =>
                  order?.danhSachGhe.map(seats => (
                    <div key={order.maGHe} className='flex border-b-2 rounded-b-2xl mb-10 hover:drop-shadow-lg'>
                      <img src={order.hinhAnh} alt='Film Banner' className='rounded-lg h-44 w-32' />
                      <div className='ml-10'>
                        <h3 className='text-lg font-semibold'>{order.tenPhim}</h3>
                        <div className='flex mb-3 gap-4'>
                          <Badge className=''>{order.thoiLuongPhim}</Badge>
                          <Badge className=''>Your seat: {seats.tenGhe}</Badge>
                        </div>

                        <p className='text-sm text-muted-foreground'>
                          Cinema: {seats.tenCumRap} {seats.tenHeThongRap}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Order Date: {moment(order.ngayDat).format('DD/MM/YYYY')}
                        </p>
                        <p className='text-sm text-muted-foreground'>Price: {order.giaVe.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default Profile
