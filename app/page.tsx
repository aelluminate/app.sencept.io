import { SidebarProvider } from "@/components/providers/sidebar"

import { AppSidebar } from "@/components/ui/main-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shared/breadcrumb/_index"
import { Separator } from "@/components/shared/separator/_index"
import { SidebarInset, SidebarTrigger } from "@/components/shared/sidebar/_index"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Generate</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
