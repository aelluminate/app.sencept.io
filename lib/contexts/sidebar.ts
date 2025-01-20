"use client"

import * as React from "react"

import { SidebarContext as Context } from "../types/sidebar"

export const SidebarContext = React.createContext<Context | null>(null)
