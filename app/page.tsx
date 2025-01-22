import * as React from "react"

import { Link2 } from "lucide-react"

import { ProjectSwitcher } from "@/components/ui/project-switcher"
import { AddDatasetDialog } from "@/components/ui/add-dataset-dialog"
import { DataTable } from "@/components/shared/data-table/data-table"

import { data } from "@/static/data.js"

export default function HomePage() {
  return (
    <main className="h-full w-full p-4 text-sm">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ProjectSwitcher />
          <div className="flex items-center gap-2 text-xs text-gray-800 dark:text-gray-200">
            <Link2 className="h-4 w-4" />
            <span>github.com/mnemonic-vault/sales-simulation</span>
          </div>
        </div>
        <AddDatasetDialog />
      </div>
      <div className="mt-4 w-full overflow-hidden">
        <DataTable data={data} />
      </div>
    </main>
  )
}
