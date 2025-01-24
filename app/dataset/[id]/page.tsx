"use client"
import * as React from "react"
import { Link2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { DatasetSwitcher } from "@/components/ui/dataset-switcher"
import { DataTable } from "@/components/ui/data-table"
import { useGetDatasetData } from "@/hooks/api/use-get-dataset-data"

export default function DatasetPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [datasetId, setDatasetId] = React.useState<string | null>(null)

  const unwrappedParams = React.use(params)
  const id = unwrappedParams.id

  React.useEffect(() => {
    if (!id) {
      router.push("/")
    } else {
      setDatasetId(id)
    }
  }, [id, router])

  const {
    data: datasetData,
    isLoading: isDataLoading,
    error: dataError,
  } = useGetDatasetData(datasetId)

  if (!datasetId) {
    return null
  }

  return (
    <div className="h-full w-full p-4 text-sm">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <DatasetSwitcher />
          <div className="flex items-center gap-2 text-xs text-blue-500">
            <Link2 className="h-4 w-4" />
            <p>github.com/mnemonic-vault/sales-simulation</p>
          </div>
        </div>
      </div>

      <div
        className={`mt-4 w-full overflow-hidden ${
          isDataLoading ? "flex items-center justify-center" : ""
        }`}
      >
        {isDataLoading ? (
          <div>Loading dataset data...</div>
        ) : dataError ? (
          <div>Error: {dataError}</div>
        ) : (
          <DataTable data={datasetData} />
        )}
      </div>
    </div>
  )
}
