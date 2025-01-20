import * as SheetPrimitive from "@radix-ui/react-dialog"
import { type VariantProps } from "class-variance-authority"

import { sheetVariants } from "@/lib/variants"

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}
