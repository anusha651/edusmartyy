"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Award,
  BookOpen,
  Brain,
  Calculator,
  Calendar,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  Code,
  FlaskRoundIcon as Flask,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import SmartTutor from "@/components/smart-tutor/smart-tutor"

export default function AITutorPage() {
  const [showFullTutor, setShowFullTutor] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted hover:text-primary"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/dashboard/subjects"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted hover:text-primary"
              >
                <BookOpen className="h-5 w-5" />
                Subjects
              </Link>
              <Link
                href="/dashboard/math-lessons"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted hover:text-primary"
              >
                <Calculator className="h-5 w-5" />
                Math Lessons
              </Link>
              <Link
                href="/dashboard/ai-tutor"
                className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-primary"
              >
                <Brain className="h-5 w-5" />
                AI Tutor
              </Link>
              <Link
                href="/dashboard/progress"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted hover:text-primary"
              >
                <Award className="h-5 w-5" />
                Progress
              </Link>
              <Link
                href="/dashboard/schedule"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted hover:text-primary"
              >
                <Calendar className="h-5 w-5" />
                Schedule
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">edusmarty</span>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1 text-sm">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/dashboard/subjects"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                Subjects
              </Link>
              <Link
                href="/dashboard/math-lessons"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary"
              >
                <Calculator className="h-4 w-4" />
                Math Lessons
              </Link>
              <Link
                href="/dashboard/ai-tutor"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary"
              >
                <Brain className="h-4 w-4" />
                AI Tutor
              </Link>
              <Link
                href="/dashboard/progress"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary"
              >
                <Award className="h-4 w-4" />
                Progress
              </Link>
              <Link
                href="/dashboard/schedule"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary"
              >
                <Calendar className="h-4 w-4" />
                Schedule
              </Link>
            </nav>
            <div className="mt-auto">
              <Button variant="outline" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">AI Tutor</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Mathematics</CardTitle>
                  </div>
                  <CardDescription>Numbers, operations, and problem-solving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <Button className="w-full justify-between">
                      Learn with AI Tutor
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Flask className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Science</CardTitle>
                  </div>
                  <CardDescription>Natural world, experiments, and discoveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm text-muted-foreground">60%</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <Button className="w-full justify-between">
                      Learn with AI Tutor
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Social Studies</CardTitle>
                  </div>
                  <CardDescription>History, geography, and society</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
                    <Button className="w-full justify-between">
                      Learn with AI Tutor
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>English</CardTitle>
                  </div>
                  <CardDescription>Reading, writing, and language skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} />
                    </div>
                    <Button className="w-full justify-between">
                      Learn with AI Tutor
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Coding</CardTitle>
                  </div>
                  <CardDescription>Programming and computational thinking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm text-muted-foreground">30%</span>
                      </div>
                      <Progress value={30} />
                    </div>
                    <Button className="w-full justify-between">
                      Learn with AI Tutor
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How to Use the AI Tutor</CardTitle>
                <CardDescription>Get the most out of your learning experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                        1
                      </div>
                      <h3 className="font-medium">Ask Questions</h3>
                      <p className="text-sm text-muted-foreground">
                        Type or speak your questions about any subject to get instant help
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                        2
                      </div>
                      <h3 className="font-medium">Explore Topics</h3>
                      <p className="text-sm text-muted-foreground">
                        Browse through different subjects and topics to find what interests you
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                        3
                      </div>
                      <h3 className="font-medium">Practice Skills</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete interactive lessons and quizzes to reinforce your learning
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {showFullTutor && (
        <SmartTutor
          fullScreen={true}
          onToggleFullScreen={() => setShowFullTutor(false)}
          onClose={() => setShowFullTutor(false)}
        />
      )}
    </div>
  )
}

