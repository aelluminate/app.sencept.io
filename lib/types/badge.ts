import { type VariantProps } from "class-variance-authority"

import { badgeVariants } from "@/lib/variants"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}