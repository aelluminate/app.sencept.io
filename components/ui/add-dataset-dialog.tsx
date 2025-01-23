"use client"
import * as React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/shared/form/_index"
import { Button } from "@/components/shared/button/_index"
import { Input } from "@/components/shared/input/_index"
import { ToastAction } from "@/components/shared/toast/_index"
import { SourceCheckboxForm } from "@/components/ui/source-checkbox-form"

const FormSchema = z
  .object({
    datasetName: z.string().min(1, "Dataset name is required"),
    source: z.string().min(1, "Source is required"),
    file: z.instanceof(File).optional(),
    url: z.string().optional(),
    fileUrl: z.string().optional(),
    urlUrl: z.string().optional(),
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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false) // State to control dialog open/close
  const { toast } = useToast()

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", data.datasetName)

      if (data.source === "file" && data.file) {
        formData.append("file", data.file)
      } else if (data.source === "url" && data.url) {
        formData.append("url", data.url)
      }

      // Call the Flask backend
      const response = await fetch(`http://127.0.0.1:5000/datasets/upload`, {
        method: "POST",
        body: formData,
      })

      // Log the raw response
      const rawResponse = await response.text()
      console.log("Raw Response:", rawResponse)

      let result
      try {
        // Try to parse the response as JSON
        result = JSON.parse(rawResponse)
      } catch (error) {
        console.error("Failed to parse response as JSON:", error)
        throw new Error(`Invalid response from the server: ${rawResponse}`)
      }

      if (response.ok) {
        toast({
          title: "Success",
          description: "Dataset uploaded successfully!",
          variant: "success",
        })
        methods.reset() // Reset the form after successful submission
        setIsDialogOpen(false) // Close the dialog
      } else {
        toast({
          title: "Error",
          description: `Error: ${result.error || "Unknown error"}`,
          variant: "destructive",
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
        variant: "destructive",
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          <Form {...methods}>
            <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
              <FormField
                control={methods.control}
                name="datasetName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dataset Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter dataset name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SourceCheckboxForm />

              <div className="flex items-center justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" size="sm" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Create new Dataset"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
