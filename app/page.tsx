import * as React from "react"

import { Link2 } from "lucide-react"

import { DatasetSwitcher } from "@/components/ui/dataset-switcher"
import { DataTable } from "@/components/shared/data-table/data-table"

import { data } from "@/static/data.js"

export default function HomePage() {
  return (
    <main className="h-full w-full p-4 text-sm">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <DatasetSwitcher />
          <div className="flex items-center gap-2 text-xs text-gray-800 dark:text-gray-200">
            <Link2 className="h-4 w-4" />
            <span>github.com/mnemonic-vault/sales-simulation</span>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full overflow-hidden">
        <DataTable data={data} />
      </div>
    </main>
  )
}
