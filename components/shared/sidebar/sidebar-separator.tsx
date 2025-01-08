"use client"

import * as React from "react"

import { cn } from "../../../utils/cn"
import { Separator } from "../separator/separator"

export const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
})

SidebarSeparator.displayName = "SidebarSeparator"
