import { ReloadIcon } from '@radix-ui/react-icons'
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
  DialogTitle
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCinemaComplexInfoQuery, useGetCinemaInfoQuery } from '@/redux/api/cinema.service'
import { useCreateShowtimeMutation } from '@/redux/api/ticket.service'

function Showtime({ ...props }) {
  const [cinemaChain, setCinemaChain] = useState(null)
  const { data: cinemaInfo } = useGetCinemaInfoQuery()

  const { data: cinemaComplexInfo } = useGetCinemaComplexInfoQuery(cinemaChain, { skip: !cinemaChain })

  const [createShowtime, { isLoading }] = useCreateShowtimeMutation()

  const form = useForm({})

  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <Dialog {...props}>
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ngayChieuGioChieu'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie showtime</FormLabel>
                  <FormControl>
                    <Input placeholder='Name of movie' {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder='Name of movie' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-2 sm:space-x-0'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            aria-label='Delete selected rows'
            onClick={() => {
              console.log('ronaldo')
            }}
          >
            {isLoading && <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Showtime
