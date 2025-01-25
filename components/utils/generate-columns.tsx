import * as React from "react"
import Link from "next/link"

import { ColumnDef } from "@tanstack/react-table"
import { Ellipsis, Eye, Sparkles, Trash2, Pencil } from "lucide-react"

import { Identifiable } from "@/lib/types/data-table"
import { formatFileSize } from "@/lib/utils/format-file-size"
import { formatDate } from "@/lib/utils/format-date"
import { Dataset } from "@/lib/types/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu/_index"
import { Button } from "@/components/shared/button/_index"
import { Checkbox } from "@/components/shared/checkbox/_index"
import { Badge } from "@/components/shared/badge/_index"
import { getTypeIcon } from "@/components/utils/get-type-icon"
import { UpdateDatasetDialog } from "@/components/ui/update-dataset-dialog"

export function generateColumns<T extends Identifiable>(
  data: T[],
  options?: boolean,
  arrangement?: Array<{ key: string; displayName: string; type?: string }>,
  dialogControls?: {
    isOpen: boolean
    openDialog: () => void
    closeDialog: () => void
  },
): ColumnDef<Identifiable>[] {
  if (data.length === 0) return []

  const keys = Object.keys(data[0]) as (keyof T)[]

  const orderedKeys = arrangement
    ? arrangement
        .filter((item) => keys.includes(item.key as keyof T))
        .map((item) => ({
          key: item.key,
          displayName: item.displayName,
          type: item.type,
        }))
    : keys.map((key) => ({ key: key as string, displayName: key.toString(), type: undefined }))

  const columns: ColumnDef<Identifiable>[] = orderedKeys.map(({ key, displayName, type }) => {
    const validKey = key as keyof T

    return {
      accessorKey: key as string,
      header: () => (
        <div className="flex items-center gap-2">
          {getTypeIcon(data[0][validKey] as string | number)}
          <span className="text-gray-800 dark:text-gray-200">{displayName}</span>
        </div>
      ),
      cell: ({ row }) => {
        const value = row.getValue(key as string)

        let formattedValue: React.ReactNode

        switch (type) {
          case "file_size":
            formattedValue = formatFileSize(value as number)
            break
          case "date":
            formattedValue = formatDate(value as string)
            break
          case "categories":
            formattedValue = <Badge variant="outline">{value as string}</Badge>
            break
          default:
            formattedValue = String(value)
        }

        return <span className="text-gray-600 dark:text-gray-400">{formattedValue}</span>
      },
    }
  })

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

  if (options && dialogControls) {
    const { isOpen, openDialog, closeDialog } = dialogControls

    columns.push({
      id: "actions",
      cell: ({ row }) => {
        const rowId = row.original.id

        // Use type assertion to tell TypeScript that row.original is a Dataset
        const dataset = row.original as Dataset

        // Define the onUpdate callback
        const handleUpdate = (updatedDataset: Dataset) => {
          console.log("Updated dataset:", updatedDataset)
          // You can add logic here to update the dataset in your state or API
        }

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-4 w-4">
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => console.log("Regenerate", dataset)}
                  className="flex flex-row items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Regenerate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openDialog} className="flex flex-row items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/dataset/${rowId}/`}
                    className="flex w-full flex-row items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => console.log("Delete", dataset)}
                  className="flex flex-row items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Render the dialog */}
            <UpdateDatasetDialog
              dataset={dataset}
              onUpdate={handleUpdate}
              isOpen={isOpen}
              onClose={closeDialog}
            />
          </>
        )
      },
      enableSorting: false,
      enableHiding: false,
    })
  }

  return columns
}
