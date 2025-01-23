import { Sparkles, Pencil } from "lucide-react"

import { Button } from "@/components/shared/button/_index"

export function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button className="flex items-center gap-1" variant="outline" size="sm">
        <Sparkles className="h-4 w-4" />
        Regenerate
      </Button>
      <Button className="flex items-center gap-1" variant="outline" size="sm">
        <Pencil className="h-4 w-4" />
        Edit
      </Button>
    </div>
  )
}
