import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment/moment'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { TimePicker } from '@/components/date-time-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCinemaComplexInfoQuery, useGetCinemaInfoQuery } from '@/redux/api/cinema.service'
import { useCreateShowtimeMutation } from '@/redux/api/ticket.service'
import { ShowtimeSchema } from '@/validation'

function Showtime({ id, onOpenChange, ...props }) {
  const [cinemaChain, setCinemaChain] = useState(null)
  const { data: cinemaInfo } = useGetCinemaInfoQuery()

  const { data: cinemaComplexInfo } = useGetCinemaComplexInfoQuery(cinemaChain, { skip: !cinemaChain })

  const [createShowtime, { isLoading }] = useCreateShowtimeMutation()

  const form = useForm({
    resolver: zodResolver(ShowtimeSchema),
    defaultValues: {
      maRap: '',
      giaVe: ''
    }
  })

  const onSubmit = async values => {
    values.maPhim = id
    values.ngayChieuGioChieu = moment(values.ngayChieuGioChieu).format('DD/MM/YYYY HH:mm:ss')

    const { cinemaChain, ...data } = values
    try {
      await createShowtime(data).unwrap()
      toast.success('Showtime created successfully')
      form.reset()
      onOpenChange(false)
    } catch (error) {
      const err = error?.data?.content
      toast.error(err)
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Showtime Management</DialogTitle>
          <DialogDescription>Schedule and manage movie showtime effectively.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='cinemaChain'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cinema Chain</FormLabel>
                  <Select onValueChange={value => setCinemaChain(value)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select your cinema chain' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cinemaInfo?.map(type => (
                        <SelectItem value={type.maHeThongRap} key={type.maHeThongRap}>
                          {type.tenHeThongRap}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage name='cinemaChain' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='maRap'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cinema Complex</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select your cinema complex' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cinemaComplexInfo?.map(type => (
                        <SelectItem value={type.maCumRap} key={type.maCumRap}>
                          {type.tenCumRap}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage name='maRap' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ngayChieuGioChieu'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-left'>Showtime</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={`w-64 pl-3 justify-start text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value ? moment(field.value).format('DD/MM/YYYY HH:mm:ss') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date('1900-01-01')}
                        initialFocus
                      />
                      <div className='p-3 border-t border-border'>
                        <TimePicker setDate={field.onChange} date={field.value} />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage name='ngayChieuGioChieu' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='giaVe'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Price</FormLabel>
                  <FormControl>
                    <Input
                      id='giaVe'
                      {...field}
                      placeholder='Enter your  ticket price'
                      pattern='[0-9]*'
                      onInput={event => (event.target.value = event.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormControl>
                  <FormMessage name='giaVe' />
                </FormItem>
              )}
            />
            <DialogFooter className='gap-2 sm:space-x-0'>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
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

export default Showtime
