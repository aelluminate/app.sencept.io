"use client"

import * as React from "react"

import { cn } from "../../../utils/cn"

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5",
      className,
    )}
    {...props}
  />
))

BreadcrumbList.displayName = "BreadcrumbList"
