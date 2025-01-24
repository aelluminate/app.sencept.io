"use client"
import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

import { useDatasets } from "@/hooks/api/use-get-dataset"
import { useToast } from "@/hooks/use-toast"

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
  const router = useRouter()
  const pathname = usePathname()
  const { datasets, isLoading: isDatasetsLoading, error: datasetsError } = useDatasets()
  const { toast } = useToast()

  // Extract the datasetId from the URL
  const datasetId = pathname.split("/").pop() || null

  // Find the selected dataset based on the datasetId
  const selectedDataset = datasets.find((dataset) => dataset.id === datasetId)

  // Handle dataset selection
  const handleDatasetSelect = (datasetId: string) => {
    router.push(`/dataset/${datasetId}`)
  }

  // Show toast notification if there's an error
  React.useEffect(() => {
    if (datasetsError) {
      toast({
        title: "Error",
        description: `Failed to load datasets: ${datasetsError}`,
        variant: "destructive",
      })
    }
  }, [datasetsError, toast])

  return (
    <div className="flex flex-col gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center" variant="outline" size="default">
            {isDatasetsLoading
              ? "Loading datasets..."
              : selectedDataset
                ? selectedDataset.name
                : "Select a dataset"}
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {datasets.map((dataset) => (
            <DropdownMenuItem key={dataset.id} onSelect={() => handleDatasetSelect(dataset.id)}>
              {dataset.name}
            </DropdownMenuItem>
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
    </div>
  )
}
