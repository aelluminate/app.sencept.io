"use client"
import { Blocks, Boxes } from "lucide-react"

import { useGetDatasets } from "@/hooks/api/use-get-datasets"
import { DataTable } from "@/components/ui/data-table"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/shared/card/_index"
import { Badge } from "@/components/shared/badge/_index"

export default function HomePage() {
  const { data: datasets, isLoading, error } = useGetDatasets()

  const generatedDatasets = datasets?.filter((dataset) => dataset.category === "Generated") || []

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 text-sm">
      <div className="grid w-full grid-cols-2 items-start justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <div className="text-3xl font-bold">Welcome.</div>
          <p className="max-w-xl">
            We enables the creation of customizable, schema-driven synthetic data that accurately
            simulates real-world scenarios, making it an invaluable asset for testing, development,
            and research in machine learning.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
              <Boxes className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{datasets?.length || 0}</div>
              <div className="mt-4 flex flex-row items-center gap-2">
                <Badge variant="outline">Latest</Badge>
                <a className="text-xs text-blue-500">{datasets?.[0]?.name || "No datasets"}</a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Generated Datasets</CardTitle>
              <Blocks className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{generatedDatasets.length}</div>
              <div className="mt-4 flex flex-row items-center gap-2">
                <Badge variant="outline">Latest</Badge>
                <a className="text-xs text-blue-500">
                  {generatedDatasets[0]?.name || "No generated datasets"}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="pt-4">
        <DataTable
          data={datasets || []}
          options
          arrangement={[
            { key: "id", displayName: "ID" },
            { key: "name", displayName: "Dataset Name" },
            { key: "filesize", displayName: "File Size", type: "file_size" },
            { key: "category", displayName: "Category", type: "categories" },
            { key: "created_at", displayName: "Created At", type: "date" },
            { key: "updated_at", displayName: "Updated At", type: "date" },
          ]}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}
