"use client"
import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

import { useGetDatasets } from "@/hooks/api/use-get-datasets" // Use the new hook
import { useToast } from "@/hooks/use-toast"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shared/dropdown-menu/_index"
import { Button } from "@/components/shared/button/_index"
import { Separator } from "@/components/shared/separator/_index"
import { CreateNewDatasetDialog } from "@/components/ui/create-new-dataset-dialog"

export function DatasetSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: datasets, isLoading: isDatasetsLoading, error: datasetsError } = useGetDatasets() // Use the new hook
  const { toast } = useToast()

  const datasetId = pathname.split("/").pop() || null

  const selectedDataset = datasets.find((dataset) => dataset.id === datasetId)

  const handleDatasetSelect = (datasetId: string) => {
    router.push(`/dataset/${datasetId}`)
  }

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
          <CreateNewDatasetDialog>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create new dataset</span>
              </div>
            </DropdownMenuItem>
          </CreateNewDatasetDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
