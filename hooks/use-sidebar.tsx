import * as React from "react"

import { SidebarContext as Context } from "@/lib/contexts/sidebar"

export function useSidebar() {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}
