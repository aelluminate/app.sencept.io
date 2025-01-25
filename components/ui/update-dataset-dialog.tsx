import * as React from "react"

import { useUpdateDataset } from "@/hooks/api/use-update-dataset"
import { UpdateDatasetDialogProps } from "@/lib/types/dialog"
import { toSlugFormat } from "@/lib/utils/to-slug-format"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/shared/dialog/_index"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/shared/form/_index"
import { Button } from "@/components/shared/button/_index"
import { Input, CharacterCounter } from "@/components/shared/input/_index"
import { Label } from "@/components/shared/label/_index"
import { Badge } from "@/components/shared/badge/_index"

export function UpdateDatasetDialog({
  dataset,
  onUpdate,
  isOpen,
  onClose,
}: UpdateDatasetDialogProps & { isOpen: boolean; onClose: () => void }) {
  const { methods, onSubmit, isLoading } = useUpdateDataset({
    datasetId: dataset.id,
    onSuccess: () => {
      onUpdate(dataset)
      onClose()
    },
  })

  const inputValue = methods.watch("name")

  const hyphenCount = (slug: string) => (slug.match(/-/g) || []).length

  React.useEffect(() => {
    methods.reset({
      name: dataset.name || "",
      file: undefined,
    })
  }, [dataset, methods])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Dataset</DialogTitle>
          <DialogDescription>Update the details of the dataset.</DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={methods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Dataset Name</Label>
                  <FormControl>
                    <Input
                      id="name"
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
                        <span className="font-bold text-blue-500">
                          &quot;
                          {toSlugFormat(inputValue).substring(
                            0,
                            50 + hyphenCount(toSlugFormat(inputValue)),
                          )}
                          &quot;{" "}
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

            <FormField
              control={methods.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="file">Upload New File</Label>
                  <FormControl>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center gap-2">
              <Label>Current File</Label>
              <Badge variant="outline">{dataset.filename}</Badge>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
