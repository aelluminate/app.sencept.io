"use client"
import * as React from "react"

import { ChevronsUpDown, Plus } from "lucide-react"

import { useDatasets } from "@/hooks/api/use-get-dataset"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shared/dropdown-menu/_index"
import { Button } from "@/components/shared/button/_index"
import { Separator } from "@/components/shared/separator/_index"
import { AddDatasetDialog } from "@/components/ui/add-dataset-dialog"

export function DatasetSwitcher() {
  const { datasets, isLoading, error } = useDatasets()

  if (isLoading) {
    return <div>Loading datasets...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center" variant="outline" size="default">
          {datasets.length > 0 ? datasets[0].name : "No datasets available"}
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {datasets.map((dataset) => (
          <DropdownMenuItem key={dataset.id}>{dataset.name}</DropdownMenuItem>
        ))}

        {datasets.length > 0 && <Separator className="my-1" />}

        {/* Always show the "Create new dataset" option */}
        <AddDatasetDialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create new dataset</span>
            </div>
          </DropdownMenuItem>
        </AddDatasetDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
