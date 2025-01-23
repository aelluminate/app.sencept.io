import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shared/breadcrumb/_index"
import { Separator } from "@/components/shared/separator/_index"
import { SidebarTrigger } from "@/components/shared/sidebar/_index"
import { Avatar, AvatarText } from "@/components/shared/avatar/_index"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function Header() {
  return (
    <div className="flex h-16 w-full shrink-0 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Schemas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-row items-center gap-2">
        <ModeToggle />
        <Avatar>
          <AvatarText>S</AvatarText>
        </Avatar>
      </div>
    </div>
  )
}
