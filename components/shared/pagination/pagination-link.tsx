import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/variants"
import { PaginationLinkProps } from "@/lib/types/pagination"

export const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled,
  ...props
}: PaginationLinkProps & { disabled?: boolean }) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
        disabled,
      }),
      className,
      disabled && "cursor-not-allowed opacity-50",
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"
