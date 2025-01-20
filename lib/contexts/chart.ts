"use client"

import * as React from "react"

import { ChartContextProps as Context } from "@/lib/types/chart"

export const ChartContext = React.createContext<Context | null>(null)