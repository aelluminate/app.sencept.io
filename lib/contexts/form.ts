"use client"
import * as React from "react"

import { FormFieldContextValue, FormItemContextValue } from "@/lib/types/form" 

export const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)
export const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)
