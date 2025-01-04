import * as React from "react"
import { cn } from "../../utils/cn"
import { Slot } from "@radix-ui/react-slot"
import { ButtonProps } from "@/types/button"
import { buttonVariants } from "@/lib/variants"

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)

Button.displayName = "Button"
