import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDark])

  return (
    <nav
      aria-label="Primary"
      className="relative z-10 flex h-16 w-full items-center border-b border-border bg-card px-4 md:px-8"
    >
      <span className="font-semibold tracking-tight text-foreground">PR</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        onClick={() => setIsDark((v) => !v)}
        className="ml-auto"
      >
        {isDark ? <Moon /> : <Sun />}
      </Button>
    </nav>
  )
}
