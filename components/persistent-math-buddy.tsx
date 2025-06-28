"use client"

import { useState, useEffect } from "react"
import MathBuddy from "@/components/math-buddy"

export default function PersistentMathBuddy() {
  const [isMinimized, setIsMinimized] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Show the math buddy after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <MathBuddy
      minimized={isMinimized}
      onMinimize={() => setIsMinimized(true)}
      onMaximize={() => setIsMinimized(false)}
    />
  )
}

