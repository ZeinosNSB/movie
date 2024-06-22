import {
  CaretSortIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { AddFilm } from '@/components/dialog/film/AddFilm'
import { DeleteFilm } from '@/components/dialog/film/DeleteFilm'
import { UpdateFilm } from '@/components/sheet/film/UpdateFilm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetFilmListByPaginationQuery } from '@/redux/api/film.service'
import { GROUP_ID } from '@/utils/config'

const PAGE_SIZE = 5
const PAGE_SIZE_OPTIONS = [5, 10, 15, 20]

const changeName = [
  { id: 'maPhim', name: 'ID' },
  { id: 'hinhAnh', name: 'Image' },
  { id: 'tenPhim', name: 'Title' },
  { id: 'moTa', name: 'Description' }
]

function Films() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [pageIndex, setPageIndex] = useState(1)
  const [countPerPage, setCountPerPage] = useState(PAGE_SIZE)
  const [search, setSearch] = useState('')

  const keywordDebounce = useDebounce(search)

  const { data: listFilm, isFetching } = useGetFilmListByPaginationQuery({
    maNhom: GROUP_ID,
    soTrang: pageIndex,
    soPhanTuTrenTrang: countPerPage,
    ...(keywordDebounce && { tenPhim: keywordDebounce })
  })

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
      cell: ({ row }) => <div>{row.getValue('maPhim')}</div>
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
      cell: ({ row }) => <div>{row.getValue('tenPhim').slice(0, 25) + '...'}</div>
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
      cell: ({ row }) => <div>{row.getValue('moTa').slice(0, 50) + '...'}</div>
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false)
        const [showUpdateTaskSheet, setShowUpdateTaskSheet] = useState(false)

        return (
          <>
            <UpdateFilm
              open={showUpdateTaskSheet}
              onOpenChange={setShowUpdateTaskSheet}
              ids={row.original}
              film={listFilm}
            />
            <DeleteFilm
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

  const table = useReactTable({
    data: listFilm?.items || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  useEffect(() => {
    // Prevent the page index from exceeding the total number of pages
    pageIndex > listFilm?.totalPages && setPageIndex(listFilm?.totalPages)

    // Set the number of rows per page
    table.setPageSize(countPerPage)
  }, [listFilm, pageIndex, countPerPage, table])

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-semibold'>Films Management</h1>

        <div className='ml-auto gap-2'>
          {table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <DeleteFilm
              tasks={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
              onSuccess={() => table.toggleAllRowsSelected(false)}
            />
          ) : null}

          <AddFilm />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Films</CardTitle>
          <CardDescription>
            Efficiently manage films with options to add, edit, or delete movies along with their images, titles, and
            descriptions.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className='w-full'>
            <div className='flex items-center pb-6'>
              <Input
                placeholder='Filter name...'
                value={search}
                onChange={event => setSearch(event.target.value)}
                className='max-w-sm'
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-auto'>
                    Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {table
                    .getAllColumns()
                    .filter(column => column.getCanHide())
                    .map(column => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className='capitalize'
                          checked={column.getIsVisible()}
                          onCheckedChange={value => column.toggleVisibility(!!value)}
                        >
                          {changeName.find(item => item.id === column.id)?.name}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ScrollArea className='h-[527px] rounded-md border'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isFetching && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-24 text-center'>
                        Loading ...
                      </TableCell>
                    </TableRow>
                  )}

                  {!isFetching &&
                    table.getRowModel().rows?.length &&
                    table.getRowModel().rows.map(row => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}

                  {!isFetching && !table.getRowModel().rows?.length && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-24 text-center'>
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className='flex items-center justify-end space-x-2 py-4'>
              <div className='flex-1 whitespace-nowrap text-sm text-muted-foreground'>
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                selected.
              </div>
              <div className='flex items-center space-x-2'>
                <p className='whitespace-nowrap text-sm font-medium'>Rows per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={value => {
                    setCountPerPage(Number(value))
                  }}
                >
                  <SelectTrigger className='h-8 w-[4.5rem]'>
                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side='top'>
                    {PAGE_SIZE_OPTIONS.map(pageSize => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='font-medium px-4 text-sm'>
                Page {pageIndex} of {listFilm?.totalPages || 1}
              </div>
              <div className='space-x-2'>
                <Button variant='outline' size='sm' onClick={() => setPageIndex(1)} disabled={pageIndex === 1}>
                  <DoubleArrowLeftIcon className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setPageIndex(old => Math.max(old - 1, 1))}
                  disabled={pageIndex === 1}
                >
                  <ChevronLeftIcon className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setPageIndex(old => (!listFilm || pageIndex === listFilm.totalPages ? old : old + 1))}
                  disabled={!listFilm || pageIndex === listFilm.totalPages}
                >
                  <ChevronRightIcon className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setPageIndex(listFilm?.totalPages)}
                  disabled={!listFilm || pageIndex === listFilm.totalPages}
                >
                  <DoubleArrowRightIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Films
