"use client"
import * as React from "react"
import { FLASK_API_URL } from "@/config/constants"

interface DatasetData {
  id: string
  [key: string]: string | number | boolean
}

export function useGetDatasetData(datasetId: string | null) {
  const [data, setData] = React.useState<DatasetData[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!datasetId) return

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${FLASK_API_URL}/datasets/${datasetId}/data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch dataset data: ${response.statusText}`)
        }

        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [datasetId])

  return { data, isLoading, error }
}
