import { flexRender, Table, ColumnDef } from "@tanstack/react-table"
import { TableBody, TableCell, TableRow } from "@/components/shared/table/_index"
import { Identifiable } from "@/lib/types/data-table"

interface TableBodyProps {
  table: Table<Identifiable>
  columns: ColumnDef<Identifiable>[]
}

export function DataTableBody({ table, columns }: TableBodyProps) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => {
          return (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    className="border-r border-gray-200 dark:border-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })
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
