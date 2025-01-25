import * as React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useToast } from "@/hooks/use-toast"
import { GITHUB_REPO_ISSUES, FLASK_API_URL } from "@/config/constants"
import { UpdateDatasetSchema, UpdateDatasetValues } from "@/lib/schema/update-dataset-schema"

import { ToastAction } from "@/components/shared/toast/_index"

export function useUpdateDataset({
  datasetId,
  onSuccess,
}: {
  datasetId: string
  onSuccess?: () => void
}) {
  const methods = useForm<UpdateDatasetValues>({
    resolver: zodResolver(UpdateDatasetSchema),
    defaultValues: {
      name: "",
      file: undefined,
    },
  })

  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: UpdateDatasetValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", data.name)

      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0])
      }

      const response = await fetch(`${FLASK_API_URL}/datasets/${datasetId}`, {
        method: "PUT",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Dataset updated successfully!",
          variant: "success",
        })
        methods.reset()
        onSuccess?.()
      } else {
        toast({
          title: "Error",
          description: `Error: ${result.error || "Unknown error"}`,
          variant: "destructive",
          action: (
            <ToastAction altText="Report Issue">
              <a href={GITHUB_REPO_ISSUES} target="_blank" rel="noopener noreferrer">
                Report
              </a>
            </ToastAction>
          ),
        })
      }
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: "Error",
        description: `Error: ${errorMessage}`,
        variant: "destructive",
        action: (
          <ToastAction
            altText="Report Issue"
            onClick={() => window.open(`${GITHUB_REPO_ISSUES}`, "_blank")}
          >
            Report
          </ToastAction>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { methods, onSubmit, isLoading }
}
