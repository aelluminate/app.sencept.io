import * as React from "react"
import { FileText, Hash, HelpCircle, Calendar } from "lucide-react"
import { parseISO, isValid } from "date-fns"

export function getTypeIcon(value: string | number | Date) {
  if (typeof value === "string") {
    // Try to parse the string as a date
    const parsedDate = parseISO(value)
    if (isValid(parsedDate)) {
      return <Calendar className="h-4 w-4 text-sidebar-primary" />
    }
    return <FileText className="h-4 w-4 text-sidebar-primary" />
  }
  if (typeof value === "number") {
    return <Hash className="h-4 w-4 text-sidebar-primary" />
  }
  if (value instanceof Date) {
    return <Calendar className="h-4 w-4 text-sidebar-primary" />
  }
  return <HelpCircle className="h-4 w-4 text-sidebar-primary" />
}
