import * as React from "react"

import { cn } from "@/lib/utils"
import { BadgeProps } from "@/lib/types/badge"
import { badgeVariants } from "@/components/shared/variants"

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
