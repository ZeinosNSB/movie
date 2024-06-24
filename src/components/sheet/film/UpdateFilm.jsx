import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { useUpdateFilmMutation } from '@/redux/api/film.service'
import { GROUP_ID } from '@/utils/config'
import { FilmSchema } from '@/validation'

export function UpdateFilm({ id, film, onOpenChange, ...props }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [image, setImage] = useState(null)

  const filmInfo = film?.items.find(film => film.maPhim === id)

  const [updateFilm, { isLoading }] = useUpdateFilmMutation()

  const form = useForm({
    resolver: zodResolver(FilmSchema),
    defaultValues: {
      maPhim: filmInfo?.maPhim,
      tenPhim: filmInfo?.tenPhim,
      trailer: filmInfo?.trailer,
      moTa: filmInfo?.moTa,
      ngayKhoiChieu: filmInfo?.ngayKhoiChieu,
      dangChieu: filmInfo?.dangChieu,
      sapChieu: filmInfo?.sapChieu,
      hot: filmInfo?.hot
    }
  })

  useEffect(() => {
    form.setValue('maPhim', filmInfo?.maPhim)
    form.setValue('tenPhim', filmInfo?.tenPhim)
    form.setValue('trailer', filmInfo?.trailer)
    form.setValue('moTa', filmInfo?.moTa)
    form.setValue('ngayKhoiChieu', filmInfo?.ngayKhoiChieu)
    form.setValue('dangChieu', filmInfo?.dangChieu)
    form.setValue('sapChieu', filmInfo?.sapChieu)
    form.setValue('hot', filmInfo?.hot)
    form.setValue('danhGia', filmInfo?.danhGia)
    setImgSrc(filmInfo?.hinhAnh)
  }, [filmInfo, form])

  const handleChangeFile = e => {
    let file = e.target.files[0]

    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/gif' ||
      file.type === 'image/png'
    ) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => setImgSrc(reader.result) //Hình base 64

      setImage(file)
    }
  }

  const onSubmit = async values => {
    values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format('DD/MM/YYYY')
    values.maNhom = GROUP_ID
    values.hinhAnh = image
    values.maPhim = id

    let formData = new FormData()
    for (let key in values) {
      if (key !== 'hinhAnh') {
        formData.append(key, values[key])
      } else {
        if (values.hinhAnh !== null) {
          formData.append('File', values.hinhAnh, values.hinhAnh.name)
        }
      }
    }

    try {
      await updateFilm(formData).unwrap()
      setImgSrc(null)
      onOpenChange(false)
      form.reset()
      await toast.success('Film update successfully')
    } catch (error) {
      const err = error?.data?.content
      toast.error(err)
    }
  }

  return (
    <Sheet {...props} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col gap-6 sm:max-w-lg'>
        <SheetHeader className='text-left'>
          <SheetTitle>Update film</SheetTitle>
          <SheetDescription>Update the film details and save the changes</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='maPhim'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder='Movie ID' disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tenPhim'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name of movie' {...field} />
                  </FormControl>
                  <FormMessage name='tenPhim' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='trailer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trailer</FormLabel>
                  <FormControl>
                    <Input placeholder='Trailer URL' {...field} />
                  </FormControl>
                  <FormMessage name='trailer' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='moTa'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Description' {...field} />
                  </FormControl>
                  <FormMessage name='moTa' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ngayKhoiChieu'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Release Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={`w-64 pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                        >
                          {field.value ? moment(field.value).format('DD/MM/YYYY') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage name='ngayKhoiChieu' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dangChieu'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Now Showing</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sapChieu'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Coming Soon</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hot'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Hot Trending</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='danhGia'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input className='w-64' min={0} max={10} type='number' placeholder='Rating' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hinhAnh'
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        className='w-64 hover:bg-accent p-0 cursor-pointer'
                        type='file'
                        accept='image/png, image/jpeg,image/gif,image/png'
                        onChange={handleChangeFile}
                      />
                      <FormDescription>
                        <span className='text-muted-foreground'>Only .png, .jpg, .jpeg, .gif files are allowed.</span>
                      </FormDescription>
                      {imgSrc && <img src={imgSrc} alt='Preview' className='w-32 h-48 rounded-xl' />}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <SheetFooter className='gap-2 pt-2 sm:space-x-0'>
              <SheetClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </SheetClose>
              <Button type='submit'>
                {isLoading && <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />}
                Update
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
