import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, LetterText, Hash, AtSign, FileQuestion } from "lucide-react"

import { Checkbox } from "@/components/shared/checkbox/_index"
import { Button } from "@/components/shared/button/_index"
import { Label } from "@/components/shared/label/_index"

interface Identifiable {
  id: string
}

function getIconForType(value: string | number) {
  if (typeof value === "string") {
    if (value.includes("@")) {
      return <AtSign className="h-4 w-4" />
    }
    return <LetterText className="h-4 w-4" />
  }
  if (typeof value === "number") {
    return <Hash className="h-4 w-4" />
  }
  return <FileQuestion className="h-4 w-4" />
}

export function generateColumns<T extends Identifiable>(data: T[]): ColumnDef<T>[] {
  if (data.length === 0) return []

  const keys = Object.keys(data[0]) as (keyof T)[]

  const columns: ColumnDef<T>[] = keys.map((key) => ({
    accessorKey: key as string,
    header: ({ column }) => (
      <div className="flex items-center">
        <div className="flex flex-row items-center gap-1">
          {getIconForType(data[0][key] as string | number)}
          <Label className="font-space-grotesk text-gray-600 dark:text-gray-400">
            {key.toString()}
          </Label>
        </div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue(key as string)}</div>,
  }))

  columns.unshift({
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
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
      <div className="flex justify-center">
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
