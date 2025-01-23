import { flexRender, Table, ColumnDef } from "@tanstack/react-table"
import { TableBody, TableCell, TableRow } from "@/components/shared/table/_index"

interface TableBodyProps<T> {
  table: Table<T>
  columns: ColumnDef<T>[]
}

export function DataTableBody<T>({ table, columns }: TableBodyProps<T>) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="border-r border-gray-200 dark:border-gray-800">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
