import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { DeleteDialog } from '@/components/dialog/film/DeleteDialog'
import { UpdateSheet } from '@/components/sheet/film/UpdateSheet'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'maPhim',
    header: ({ column }) => {
      return (
        <Button
          className='px-3 -ml-3'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('maPhim')}</div>
  },
  {
    accessorKey: 'hinhAnh',
    header: 'Image',
    cell: ({ row }) => (
      <img src={row.getValue('hinhAnh')} alt={row.getValue('tenPhim')} className='h-20 w-16 rounded-xl' />
    )
  },
  {
    accessorKey: 'tenPhim',
    header: ({ column }) => {
      return (
        <Button
          className='px-3 -ml-3'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='capitalize'>{row.getValue('tenPhim').slice(0, 25) + '...'}</div>
  },
  {
    accessorKey: 'moTa',
    header: ({ column }) => {
      return (
        <Button
          className='px-3 -ml-3'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Description
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('moTa').slice(0, 50) + '...'}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false)
      const [showUpdateTaskSheet, setShowUpdateTaskSheet] = useState(false)

      return (
        <>
          <UpdateSheet open={showUpdateTaskSheet} onOpenChange={setShowUpdateTaskSheet} film={row.original} />
          <DeleteDialog
            open={showDeleteTaskDialog}
            onOpenChange={setShowDeleteTaskDialog}
            film={row.original}
            showTrigger={false}
            onSuccess={() => row.toggleSelected(false)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='ghost' className='flex size-8 p-0 data-[state=open]:bg-muted'>
                <DotsHorizontalIcon className='size-4' aria-hidden='true' />
              </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-36 p-1 rounded-lg'>
              <div
                onClick={() => {
                  setShowUpdateTaskSheet(true)
                }}
                className='w-full bg-white outline-none cursor-pointer flex justify-between items-center hover:bg-muted rounded-md text-sm p-1.5 mb-0.5'
              >
                Edit <Edit className='h-4' />
              </div>
              <div
                onClick={() => setShowDeleteTaskDialog(true)}
                className='w-full bg-white outline-none text-rose-700 focus:text-rose-400 transition-colors hover:bg-muted rounded-sm cursor-pointer flex justify-between items-center text-sm p-1.5'
              >
                Delete <Trash2 className='h-4' />
              </div>
            </PopoverContent>
          </Popover>
        </>
      )
    }
  }
]

export default columns
