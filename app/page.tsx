import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shared/dropdown-menu/_index"
import { Button } from "@/components/shared/button/_index"
import { DataTableDemo } from "@/components/shared/data-table/_index"
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
import { Input } from "@/components/shared/input/_index"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/shared/select/_index"

export default function HomePage() {
  return (
    <main className="h-full w-full p-4 text-sm">
      <div className="flex flex-row items-center justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center" variant="outline" size="sm">
              sales-simulation
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>sales-simulation</DropdownMenuItem>
            <DropdownMenuItem>traffic-system</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1" variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogTitle>Add Project</DialogTitle>
              <DialogDescription>Please provide the project details.</DialogDescription>
              <form className="space-y-4">
                <div>
                  <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <Input
                    type="text"
                    id="project-name"
                    name="project-name"
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="project-source"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Source
                  </label>
                  <Select>
                    <SelectTrigger
                      id="project-source"
                      name="project-source"
                      className="mt-1 w-full"
                    >
                      <SelectValue placeholder="Select a source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="API">API</SelectItem>
                      <SelectItem value="Connect to a database">Connect to a database</SelectItem>
                      <SelectItem value="Upload file">Upload file</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Project</Button>
                </div>
              </form>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      <div className="mt-4">
        <DataTableDemo />
      </div>
    </main>
  )
}
