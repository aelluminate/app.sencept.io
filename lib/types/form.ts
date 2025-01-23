import { z } from "zod"
import {
  FieldPath,
  FieldValues,
} from "react-hook-form"

import { FormSchema } from "@/lib/schema/form-schema"

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

export type FormItemContextValue = {
  id: string
}

export type FormValues = z.infer<typeof FormSchema>