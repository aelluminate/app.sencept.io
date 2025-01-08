"use client"

import { cn } from "../../../utils/cn"

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
}

DropdownMenuShortcut.displayName = "DropdownMenuShortcut"
