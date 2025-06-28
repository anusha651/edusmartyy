"use client"

import { useState } from "react"
import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import TutorView from "@/components/tutor-view"

export default function DemoPage() {
  const [showTutor, setShowTutor] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">edusmarty</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        {!showTutor && (
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold">Try Our AI Tutor</h1>
            <p className="mt-4 text-muted-foreground">
              Experience how our AI-powered 3D Virtual Tutor can make learning fun and interactive.
            </p>
            <Button className="mt-6" size="lg" onClick={() => setShowTutor(true)}>
              Start Demo
            </Button>
          </div>
        )}

        {showTutor && <TutorView onClose={() => setShowTutor(false)} />}
      </main>
    </div>
  )
}

