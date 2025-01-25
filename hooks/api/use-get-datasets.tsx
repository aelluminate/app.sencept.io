"use client"
import * as React from "react"

import { FLASK_API_URL } from "@/config/constants"
import { Dataset, APIResponse } from "@/lib/types/api/use-get-datasets"

export function useGetDatasets() {
  const [data, setData] = React.useState<Dataset[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${FLASK_API_URL}/datasets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch datasets: ${response.statusText}`)
        }

        const result: APIResponse = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
}
