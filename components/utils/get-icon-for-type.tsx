import { LetterText, Hash, AtSign, FileQuestion } from "lucide-react"

export function getIconForType(value: string | number) {
  if (typeof value === "string") {
    if (value.includes("@")) {
      return <AtSign className="h-4 w-4" />
    }
    return <LetterText className="h-4 w-4" />
  }
  if (typeof value === "number") {
    return <Hash className="h-4 w-4" />
  }
  return <FileQuestion className="h-4 w-4" />
}
