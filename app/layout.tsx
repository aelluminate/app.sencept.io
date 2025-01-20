import type { Metadata } from "next"

import "@/assets/globals.css"
import { geistSans, spaceGroteskMono } from "../lib/fonts"
import { metadata as SiteMetadata } from "@/lib/meta/metadata"
export const metadata: Metadata = SiteMetadata

import { ThemeProvider } from "@/components/shared/theme-provider"

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
