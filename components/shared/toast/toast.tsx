"use client"
import * as React from "react"

import * as ToastPrimitives from "@radix-ui/react-toast"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toastVariants } from "@/components/shared/variants"

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName
