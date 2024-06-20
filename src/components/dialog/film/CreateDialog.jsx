import { ReloadIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Calendar, CalendarIcon, PlusCircle } from 'lucide-react'
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function CreateDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm({
    // resolver: zodResolver(createTaskSchema)
    defaultValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {}
    }
  })

  // function onSubmit(input) {
  //   startCreateTransition(async () => {
  //     const { error } = await createTask(input)
  //
  //     if (error) {
  //       toast.error(error)
  //       return
  //     }
  //
  //     form.reset()
  //     setOpen(false)
  //     toast.success('Task created')
  //   })
  // }

  const onSubmit = values => {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='ml-4 '>
          <PlusCircle className='mr-2 size-4' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add New Film</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-5xl'>
        <DialogHeader>
          <DialogTitle>Add New Film</DialogTitle>
          <DialogDescription>Fill in the details below to add a new film.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='tenPhim'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name of movie' {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                          className={`w-[240px] pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      />
                    </PopoverContent>
                  </Popover>
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
              <Button>
                <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
