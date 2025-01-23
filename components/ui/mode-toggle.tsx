"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/shared/button/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button onClick={toggleTheme} className="flex" size="icon" variant="ghost">
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-blue-500" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
