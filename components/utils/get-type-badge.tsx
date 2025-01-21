import { Badge } from "@/components/shared/badge/_index"

export function getTypeBadge(value: string | number) {
  if (typeof value === "string") {
    return (
      <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
        String
      </Badge>
    )
  }
  if (typeof value === "number") {
    return (
      <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
        Number
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
      Other
    </Badge>
  )
}
