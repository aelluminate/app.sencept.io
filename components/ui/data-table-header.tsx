import { flexRender, Table } from "@tanstack/react-table"

import { TableHead, TableHeader, TableRow } from "@/components/shared/table/_index"

interface TableHeaderProps<T> {
  table: Table<T>
}

export function DataTableHeader<T>({ table }: TableHeaderProps<T>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className="border-r border-gray-200 dark:border-gray-800">
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}
