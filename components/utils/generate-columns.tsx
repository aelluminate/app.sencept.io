import { ColumnDef } from "@tanstack/react-table"

import { Identifiable } from "@/lib/types/data-table"
import { Checkbox } from "@/components/shared/checkbox/_index"
import { getTypeIcon } from "@/components/utils/get-type-icon"

export function generateColumns<T extends Identifiable>(data: T[]): ColumnDef<Identifiable>[] {
  if (data.length === 0) return []

  const keys = Object.keys(data[0]) as (keyof T)[]

  const columns: ColumnDef<Identifiable>[] = keys.map((key) => ({
    accessorKey: key as string,
    header: () => (
      <div className="flex items-center gap-2">
        {getTypeIcon(data[0][key] as string | number)}
        <span className="text-gray-800 dark:text-gray-200">{key.toString()}</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600 dark:text-gray-400">{row.getValue(key as string)}</span>
    ),
  }))

  columns.unshift({
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center pr-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center pr-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  })

  return columns
}
