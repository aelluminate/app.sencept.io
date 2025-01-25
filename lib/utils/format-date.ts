import { format, parseISO } from "date-fns"

export function formatDate(dateString: string): string {
    return format(parseISO(dateString), "MMM dd, yyyy HH:mm:ss")
}
  