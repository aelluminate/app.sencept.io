"use client"
import * as React from "react"

import { Pyramid } from "lucide-react"

import { SidebarMenu, SidebarMenuItem } from "@/components/shared/sidebar/_index"
import { ModeToggle } from "./mode-toggle"

export function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full">
          <div className="flex w-full flex-row items-center justify-between gap-1">
            <div className="flex w-full flex-row items-center gap-2">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Pyramid className="size-4" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold">Sencept</span>
                <span className="text-xs">by Aelluminate</span>
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
