import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shared/dropdown-menu/_index"
import { ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "@/components/shared/button/button"
import { DataTableDemo } from "@/components/shared/data-table/_index"

export default function Home() {
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
        <Button className="flex items-center gap-1" variant="outline" size="sm">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>
      <div className="mt-4">
        <DataTableDemo />
      </div>
    </main>
  )
}
