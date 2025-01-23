"use client"

import * as React from "react"

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  FilterFn,
  Row,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { rankItem } from "@tanstack/match-sorter-utils"
import { Identifiable } from "@/lib/types/data-table"
import { generateColumns } from "@/components/utils/generate-columns"

import {
  SearchInput,
  ColumnVisibilityDropdown,
  PageSizeDropdown,
  ActionButtons,
  DataTableHeader,
  DataTableBody,
  DataTableWrapper,
  PaginationControls,
} from "@/components/ui/_index"
import { Table } from "@/components/shared/table/_index"

const fuzzyFilter: FilterFn<Identifiable> = (
  row: Row<Identifiable>,
  columnId: string,
  value: string,
) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  return itemRank.passed
}

interface DataTableProps<T extends Identifiable> {
  data: T[]
}

export function DataTable<T extends Identifiable>({ data }: DataTableProps<T>) {
  const columns = React.useMemo(() => generateColumns(data), [data])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pageSize, setPageSize] = React.useState(15)
  const [pageIndex] = React.useState(0)

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  })

  return (
    <div className="flex w-full flex-col gap-2">
      <SearchInput value={globalFilter} onChange={setGlobalFilter} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <ColumnVisibilityDropdown table={table} />
          <PageSizeDropdown pageSize={pageSize} setPageSize={setPageSize} />
        </div>
        <ActionButtons />
      </div>
      <DataTableWrapper>
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>
      </DataTableWrapper>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <PaginationControls table={table} />
      </div>
    </div>
  )
}
