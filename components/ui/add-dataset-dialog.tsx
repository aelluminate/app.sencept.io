"use client"
import * as React from "react"
import Link from "next/link"

import { Plus } from "lucide-react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"

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
import { ToastAction } from "@/components/shared/toast/_index"
import { Label } from "@/components/shared/label/label"
import { SourceCheckboxForm } from "@/components/ui/source-checkbox-form"

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
        return false
      }
      if (data.source === "url" && !data.url) {
        return false
      }
      return true
    },
    {
      message: "File or URL is required based on the selected source",
      path: ["file"],
    },
  )

type FormValues = z.infer<typeof FormSchema>

export function AddDatasetDialog() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const selectedSource = methods.watch("source")

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", data.datasetName)

      if (selectedSource === "file" && data.file) {
        formData.append("file", data.file)
      } else if (selectedSource === "url" && data.url) {
        formData.append("url", data.url)
      }

      const response = await fetch("/api/datasets/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Dataset uploaded successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: `Error: ${result.error}`,
          variant: "default",
          action: (
            <ToastAction altText="Report Issue">
              <Link href="https://github.com/aelluminate/app.sencept.io/issues" target="_blank">
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
        variant: "default",
        action: (
          <ToastAction
            altText="Report Issue"
            onClick={() =>
              window.open("https://github.com/aelluminate/app.sencept.io/issues", "_blank")
            }
          >
            Report
          </ToastAction>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (methods.formState.errors) {
      for (const error of Object.values(methods.formState.errors)) {
        toast({
          title: "Error",
          description: error.message,
          variant: "default",
          action: (
            <ToastAction altText="Report Issue">
              <Link href="https://github.com/aelluminate/app.sencept.io/issues" target="_blank">
                Report
              </Link>
            </ToastAction>
          ),
        })
      }
    }
  }, [methods.formState.errors, toast])

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
