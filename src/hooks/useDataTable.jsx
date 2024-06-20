import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useDebounce } from '@/hooks/useDebounce'

const schema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().optional(),
  sort: z.string().optional()
})

export function useDataTable({
  data,
  columns,
  pageCount,
  defaultPerPage = 10,
  defaultSort,
  filterFields = [],
  enableAdvancedFilter = false
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const search = schema.parse(Object.fromEntries(searchParams.entries()))
  const page = search.page
  const perPage = search.per_page ?? defaultPerPage
  const sort = search.sort ?? defaultSort
  const [column, order] = sort?.split('.') ?? []

  const { searchableColumns, filterableColumns } = useMemo(() => {
    return {
      searchableColumns: filterFields.filter(field => !field.options),
      filterableColumns: filterFields.filter(field => field.options)
    }
  }, [filterFields])

  const createQueryString = useCallback(
    params => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const initialColumnFilters = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((filters, [key, value]) => {
      const filterableColumn = filterableColumns.find(column => column.value === key)
      const searchableColumn = searchableColumns.find(column => column.value === key)

      if (filterableColumn) {
        filters.push({
          id: key,
          value: value.split('.')
        })
      } else if (searchableColumn) {
        filters.push({
          id: key,
          value: [value]
        })
      }

      return filters
    }, [])
  }, [filterableColumns, searchableColumns, searchParams])

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnFilters, setColumnFilters] = useState(initialColumnFilters)

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: perPage
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  useEffect(() => {
    navigate(
      `${location.pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize
      })}`
    )
  }, [createQueryString, location.pathname, navigate, pageIndex, pageSize])

  const [sorting, setSorting] = useState([
    {
      id: column ?? '',
      desc: order === 'desc'
    }
  ])

  useEffect(() => {
    navigate(
      `${location.pathname}?${createQueryString({
        page,
        sort: sorting[0]?.id ? `${sorting[0]?.id}.${sorting[0]?.desc ? 'desc' : 'asc'}` : null
      })}`
    )
  }, [createQueryString, location.pathname, navigate, page, sorting])

  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter(filter => {
          return searchableColumns.find(column => column.value === filter.id)
        })
      ),
      500
    )
  )

  const filterableColumnFilters = columnFilters.filter(filter => {
    return filterableColumns.find(column => column.value === filter.id)
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (enableAdvancedFilter) return

    if (!mounted) {
      setMounted(true)
      return
    }

    const newParamsObject = {
      page: 1
    }

    for (const column of debouncedSearchableColumnFilters) {
      if (typeof column.value === 'string') {
        Object.assign(newParamsObject, {
          [column.id]: typeof column.value === 'string' ? column.value : null
        })
      }
    }

    for (const column of filterableColumnFilters) {
      if (typeof column.value === 'object' && Array.isArray(column.value)) {
        Object.assign(newParamsObject, { [column.id]: column.value.join('.') })
      }
    }

    for (const key of searchParams.keys()) {
      if (
        (searchableColumns.find(column => column.value === key) &&
          !debouncedSearchableColumnFilters.find(column => column.id === key)) ||
        (filterableColumns.find(column => column.value === key) &&
          !filterableColumnFilters.find(column => column.id === key))
      ) {
        Object.assign(newParamsObject, { [key]: null })
      }
    }

    navigate(`${location.pathname}?${createQueryString(newParamsObject)}`)

    table.setPageIndex(0)
  }, [
    createQueryString,
    debouncedSearchableColumnFilters,
    enableAdvancedFilter,
    filterableColumnFilters,
    filterableColumns,
    location.pathname,
    mounted,
    navigate,
    searchParams,
    searchableColumns,
    table
  ])

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true
  })

  return { table }
}
