"use client"
import * as React from "react"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/shared/dialog/_index"
import { Button } from "@/components/shared/button/_index"
import { Input } from "@/components/shared/input/_index"
import { Label } from "@/components/shared/label/label"
import { SourceCheckboxForm } from "@/components/ui/source-checkbox-form"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const FormSchema = z
  .object({
    datasetName: z.string().min(1, "Dataset name is required"),
    source: z.string().min(1, "Source is required"),
    file: z.instanceof(File).optional(),
    url: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.source === "file" && !data.file) {
        return false // File is required when source is "file"
      }
      if (data.source === "url" && !data.url) {
        return false // URL is required when source is "url"
      }
      return true
    },
    {
      message: "File or URL is required based on the selected source",
      path: ["file"], // Highlight the file field when validation fails
    },
  )

type FormValues = z.infer<typeof FormSchema>

export function AddDatasetDialog() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const selectedSource = methods.watch("source")

  const onSubmit = async (data: FormValues) => {
    console.log("Form data submitted:", data) // Debugging: Log form data
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", data.datasetName)

      if (selectedSource === "file" && data.file) {
        formData.append("file", data.file)
      } else if (selectedSource === "url" && data.url) {
        formData.append("url", data.url)
      }

      console.log("FormData being sent:", formData) // Debugging: Log FormData

      const response = await fetch("/api/datasets/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        alert("Dataset uploaded successfully!")
        console.log("Uploaded dataset:", result)
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error("Error uploading dataset:", error)
      alert("An error occurred while uploading the dataset.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline" size="sm">
          <Plus className="h-4 w-4" />
          Create new Dataset
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-3xl">
          <DialogTitle>New Dataset</DialogTitle>
          <DialogDescription>Please provide the dataset details.</DialogDescription>
          <FormProvider {...methods}>
            <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="dataset-name">Dataset Name</Label>
                <Input
                  type="text"
                  id="dataset-name"
                  className="mt-1 block w-full placeholder:text-gray-400"
                  placeholder="Enter dataset name"
                  {...methods.register("datasetName")}
                />
                {methods.formState.errors.datasetName && (
                  <p className="text-sm text-red-500">
                    {methods.formState.errors.datasetName.message}
                  </p>
                )}
              </div>

              <SourceCheckboxForm />

              {selectedSource === "file" && (
                <div>
                  <Label htmlFor="file">Upload File</Label>
                  <Input
                    type="file"
                    id="file"
                    className="mt-1 block w-full"
                    {...methods.register("file", {
                      required: selectedSource === "file" ? "File is required" : false,
                    })}
                  />
                  {methods.formState.errors.file && (
                    <p className="text-sm text-red-500">{methods.formState.errors.file.message}</p>
                  )}
                </div>
              )}

              {selectedSource === "url" && (
                <div>
                  <Label htmlFor="url">Dataset URL</Label>
                  <Input
                    type="text"
                    id="url"
                    className="mt-1 block w-full placeholder:text-gray-400"
                    placeholder="Enter dataset URL"
                    {...methods.register("url", {
                      required: selectedSource === "url" ? "URL is required" : false,
                    })}
                  />
                  {methods.formState.errors.url && (
                    <p className="text-sm text-red-500">{methods.formState.errors.url.message}</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" size="sm" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Create new Dataset"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
