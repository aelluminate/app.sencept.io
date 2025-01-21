import * as React from "react"

import { ProjectSwitcher } from "@/components/ui/project-switcher"
import { AddProjectDialog } from "@/components/ui/add-project-dialog"
import { DataTable } from "@/components/shared/data-table/data-table"

import { data } from "@/static/data"

export default function HomePage() {
  return (
    <main className="h-full w-full p-4 text-sm">
      <div className="flex flex-row items-center justify-between gap-2">
        <ProjectSwitcher />
        <AddProjectDialog />
      </div>
      <div className="mt-4">
        <DataTable data={data} />
      </div>
    </main>
  )
}
