"use client"

import { cn } from "../../../utils/cn"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-primary/10 animate-pulse rounded-md", className)} {...props} />
}

Skeleton.displayName = "Skeleton"
