import * as React from "react"
import { SidebarContextType } from "@/types/sidebar"

export const SidebarContext = React.createContext<SidebarContextType | null>(null)
