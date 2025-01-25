import * as React from "react"
import Link from "next/link"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { GITHUB_REPO_ISSUES, FLASK_API_URL } from "@/config/constants"
import { useToast } from "@/hooks/use-toast"
import { FormSchema } from "@/lib/schema/form-schema"
import { FormValues } from "@/lib/types/form"
import { toSlugFormat } from "@/lib/utils/to-slug-format"

import { ToastAction } from "@/components/shared/toast/_index"

export function useCreateDataset({ onSuccess }: { onSuccess?: () => void } = {}) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datasetName: "",
      source: "",
      file: undefined,
      url: "",
      fileUrl: "",
      urlUrl: "",
    },
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()

      const slugName = toSlugFormat(data.datasetName)
      formData.append("name", slugName)
      if (data.source === "file" && data.file) {
        formData.append("file", data.file)
      } else if (data.source === "url" && data.url) {
        formData.append("url", data.url)
      }

      const response = await fetch(`${FLASK_API_URL}/datasets`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Dataset uploaded successfully!",
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
              <Link href={GITHUB_REPO_ISSUES} target="_blank">
                Report
              </Link>
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
