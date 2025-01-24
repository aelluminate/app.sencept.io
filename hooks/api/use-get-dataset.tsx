import * as React from "react"

import { FLASK_API_URL } from "@/config/constants"
import { UseGetDataset } from "@/lib/types/api"

export function useDatasets() {
  const [datasets, setDatasets] = React.useState<UseGetDataset[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchDatasets = async () => {
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

        const data = await response.json()
        setDatasets(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDatasets()
  }, [])

  return { datasets, isLoading, error }
}
