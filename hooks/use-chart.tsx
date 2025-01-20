import * as React from "react"

import { ChartContext as Context } from "@/lib/contexts/chart"

export function useChart() {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}
