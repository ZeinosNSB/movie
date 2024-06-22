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

import { DeleteFilm } from '@/components/dialog/film/DeleteFilm'
import AddUser from '@/components/dialog/user/AddUser'
import DeleteUser from '@/components/dialog/user/DeleteUser'
import UpdateUser from '@/components/sheet/user/UpdateUser'
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
import { useGetUserListByPaginationQuery } from '@/redux/api/user.service'
import { GROUP_ID } from '@/utils/config'

const PAGE_SIZE = 20
const PAGE_SIZE_OPTIONS = [20, 30, 40]

const changeName = [
  { id: 'hoTen', name: 'Full Name' },
  { id: 'email', name: 'Email' },
  { id: 'taiKhoan', name: 'User Name' },
  { id: 'matKhau', name: 'Password' },
  { id: 'soDt', name: 'Phone Name' },
  { id: 'maLoaiNguoiDung', name: 'Type User' }
]

function User() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [pageIndex, setPageIndex] = useState(1)
  const [countPerPage, setCountPerPage] = useState(PAGE_SIZE)
  const [search, setSearch] = useState('')

  const keywordDebounce = useDebounce(search)

  const { data: listUser, isFetching } = useGetUserListByPaginationQuery({
    MaNhom: GROUP_ID,
    soTrang: pageIndex,
    soPhanTuTrenTrang: countPerPage,
    ...(keywordDebounce && { tuKhoa: keywordDebounce })
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
      accessorKey: 'hoTen',
      header: ({ column }) => {
        return (
          <Button
            className='px-3 -ml-3'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Full Name
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('hoTen')}</div>
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            className='px-3 -ml-3'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('email')}</div>
    },
    {
      accessorKey: 'taiKhoan',
      header: ({ column }) => {
        return (
          <Button
            className='px-3 -ml-3'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            User Name
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('taiKhoan')}</div>
    },
    {
      accessorKey: 'matKhau',
      header: ({ column }) => {
        return (
          <Button
            className='px-3 -ml-3'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Password
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('matKhau')}</div>
    },
    {
      accessorKey: 'soDt',
      header: ({ column }) => {
        return (
          <Button
            className='px-3 -ml-3'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Phone Number
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('soDt')}</div>
    },
    {
      accessorKey: 'maLoaiNguoiDung',
      header: ({ column }) => {
        return (
          <Button
            className='px-3 -ml-3'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Type User
            <CaretSortIcon className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('maLoaiNguoiDung')}</div>
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const [showDeleteDialog, setShowDeleteDialog] = useState(false)
        const [showUpdateSheet, setShowUpdateSheet] = useState(false)

        return (
          <>
            <UpdateUser
              open={showUpdateSheet}
              onOpenChange={setShowUpdateSheet}
              ids={row.original.taiKhoan}
              user={listUser}
            />
            <DeleteUser
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
              id={row.original.taiKhoan}
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
                    setShowUpdateSheet(true)
                  }}
                  className='w-full bg-white outline-none cursor-pointer flex justify-between items-center hover:bg-muted rounded-md text-sm p-1.5 mb-0.5'
                >
                  Edit <Edit className='h-4' />
                </div>
                <div
                  onClick={() => setShowDeleteDialog(true)}
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
    data: listUser?.items || [],
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
    pageIndex > listUser?.totalPages && setPageIndex(listUser?.totalPages)

    // Set the number of rows per page
    table.setPageSize(countPerPage)
  }, [listUser, pageIndex, countPerPage, table])

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-semibold'>User Management</h1>

        <div className='ml-auto gap-2'>
          {table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <DeleteFilm
              tasks={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
              onSuccess={() => table.toggleAllRowsSelected(false)}
            />
          ) : null}

          <AddUser />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User</CardTitle>
          <CardDescription>
            Manage user accounts efficiently. Add, edit, or remove users and control access permissions with ease.
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
            <ScrollArea className='h-[875px] rounded-md border' type='always'>
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
                Page {pageIndex} of {listUser?.totalPages || 1}
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
                  onClick={() => setPageIndex(old => (!listUser || pageIndex === listUser.totalPages ? old : old + 1))}
                  disabled={!listUser || pageIndex === listUser.totalPages}
                >
                  <ChevronRightIcon className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setPageIndex(listUser?.totalPages)}
                  disabled={!listUser || pageIndex === listUser.totalPages}
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

export default User
