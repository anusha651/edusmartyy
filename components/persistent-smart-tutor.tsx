"use client"

import { useState, useEffect } from "react"
import SmartTutor from "@/components/smart-tutor/smart-tutor"

export default function PersistentSmartTutor() {
  const [isMinimized, setIsMinimized] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Show the tutor after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <SmartTutor
      minimized={isMinimized}
      onMinimize={() => setIsMinimized(true)}
      onMaximize={() => setIsMinimized(false)}
      fullScreen={isFullScreen}
      onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
    />
  )
}

