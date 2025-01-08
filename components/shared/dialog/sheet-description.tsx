"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
))

SheetDescription.displayName = SheetPrimitive.Description.displayName
