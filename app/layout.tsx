import type { Metadata } from "next"

import "@/assets/globals.css"
import { geistSans, spaceGroteskMono } from "../lib/fonts"
import { metadata as SiteMetadata } from "@/lib/meta/metadata"
export const metadata: Metadata = SiteMetadata

import { ThemeProvider } from "@/components/shared/theme-provider"
import { SidebarProvider } from "@/components/providers/sidebar"
import { AppSidebar } from "@/components/ui/main-sidebar"
import { SidebarInset } from "@/components/shared/sidebar/_index"
import { Header } from "@/components/ui/header"
import { Toaster } from "@/components/shared/toast/_index"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={[geistSans.variable, spaceGroteskMono.variable].join(" ")}
      suppressHydrationWarning
    >
      <body className="font-berkeley antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar />
            <div className="min-h-screen flex-1 overflow-x-hidden">
              <SidebarInset>
                <Header />
                {children}
                <Toaster />
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
