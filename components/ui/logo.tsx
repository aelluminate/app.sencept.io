"use client"
import * as React from "react"

import { Pyramid } from "lucide-react"

import { SidebarMenu, SidebarMenuItem } from "@/components/shared/sidebar/_index"

export function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full">
          <div className="flex w-full flex-row items-center justify-between gap-1">
            <div className="flex w-full flex-row items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                <Pyramid className="size-4" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold">Sencept</span>
                <span className="text-xs">by Aelluminate</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
