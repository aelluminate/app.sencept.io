import * as React from "react"

import { cn } from "@/lib/utils"

export const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"
