import * as React from "react"

import { ChevronDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shared/dropdown-menu/_index"

export const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-row items-center gap-2 border">
      <div>Sencept</div> /{" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer flex-row items-center gap-2 font-space-grotesk">
            sales-simulation <ChevronDown className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" sideOffset={5}>
          <DropdownMenuItem>sales-simulation</DropdownMenuItem>
          <DropdownMenuItem>traffic-system</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Dataset</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
