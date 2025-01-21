import * as React from "react"

import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shared/dropdown-menu/_index"
import { Button } from "@/components/shared/button/_index"

export function ProjectSwitcher() {
  return (
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
  )
}
