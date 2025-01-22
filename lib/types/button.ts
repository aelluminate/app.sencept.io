import { type VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/components/shared/variants"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
