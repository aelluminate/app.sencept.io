import { ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu/_index"
import { Button } from "@/components/shared/button/_index"

interface PageSizeDropdownProps {
  pageSize: number
  setPageSize: (size: number) => void
}

export function PageSizeDropdown({ pageSize, setPageSize }: PageSizeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {pageSize} items <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {[15, 25, 50].map((size) => (
          <DropdownMenuItem key={size} onClick={() => setPageSize(size)}>
            {size} items
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
