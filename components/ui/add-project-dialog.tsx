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

export function AddProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1" variant="outline" size="sm">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-3xl">
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>Please provide the project details.</DialogDescription>
          <form className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                type="text"
                id="project-name"
                name="project-name"
                className="mt-1 block w-full placeholder:text-gray-400"
                placeholder="Enter project name"
              />
            </div>
            <SourceCheckboxForm />
            <div className="flex items-center justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" size="sm">
                Add Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
