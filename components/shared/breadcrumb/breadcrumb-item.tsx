"use client"

import * as React from "react"

import { cn } from "../../../utils/cn"

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
)

BreadcrumbItem.displayName = "BreadcrumbItem"