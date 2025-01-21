import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/shared/checkbox/_index"
import { Button } from "@/components/shared/button/_index"
import { ArrowUpDown, MoreHorizontal, ALargeSmall, Hash, AtSign, FileQuestion } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu/_index"

interface Identifiable {
  id: string
}

function getIconForType(value: string | number) {
  if (typeof value === "string") {
    if (value.includes("@")) {
      return <AtSign className="mr-2" />
    }
    return <ALargeSmall className="mr-2" />
  }
  if (typeof value === "number") {
    return <Hash className="mr-2" />
  }
  return <FileQuestion className="mr-2" />
}

export function generateColumns(data: Identifiable[]): ColumnDef<Identifiable>[] {
  if (data.length === 0) return []

  const keys = Object.keys(data[0]) as (keyof Identifiable)[]

  const columns: ColumnDef<Identifiable>[] = keys.map((key) => ({
    accessorKey: key as string,
    header: ({ column }) => (
      <div className="flex items-center">
        {getIconForType(data[0][key] as string | number)}
        <span className="font-space-grotesk text-base">{key.toString()}</span>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2" />
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

  columns.push({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  })

  return columns
}
