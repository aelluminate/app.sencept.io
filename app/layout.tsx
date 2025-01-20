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
      <body className="font-geist antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
