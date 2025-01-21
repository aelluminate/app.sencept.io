"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/shared/button/_index"

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
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className={`h-5 w-5 transition-all ${theme === "dark" ? "scale-0" : "scale-100"}`} />
      <Moon
        className={`absolute h-5 w-5 transition-all ${theme === "dark" ? "scale-100" : "scale-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
