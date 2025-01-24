"use client"
import * as React from "react"
import { Plus } from "lucide-react"
import { useDatasetForm } from "@/hooks/api/use-dataset-form"
import { toSlugFormat } from "@/lib/utils/to-slug-format"
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
import { Input, CharacterCounter } from "@/components/shared/input/_index"
import { SourceCheckboxForm } from "@/components/ui/source-checkbox-form"

interface AddDatasetDialogProps {
  children?: React.ReactNode
  onSuccess?: () => void
}

export function AddDatasetDialog({ children, onSuccess }: AddDatasetDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const { methods, onSubmit, isLoading } = useDatasetForm({
    onSuccess: () => {
      setIsDialogOpen(false)
      onSuccess?.()
    },
  })

  const inputValue = methods.watch("datasetName")

  const hyphenCount = (slug: string) => (slug.match(/-/g) || []).length

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children || (
          <div className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Create new Dataset
          </div>
        )}
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
                      <Input
                        type="text"
                        placeholder="Enter dataset name"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.substring(0, 100)
                          field.onChange(value)
                        }}
                        maxLength={50}
                      />
                    </FormControl>
                    <div className="flex w-full flex-row items-center justify-between text-xs">
                      {inputValue && (
                        <p>
                          <span className="font-bold">
                            {toSlugFormat(inputValue).substring(
                              0,
                              50 + hyphenCount(toSlugFormat(inputValue)),
                            )}{" "}
                          </span>
                          will be the new dataset name.
                        </p>
                      )}
                      <CharacterCounter
                        currentLength={inputValue?.length || 0}
                        maxLength={50}
                        showAfter={30}
                      />
                    </div>
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
