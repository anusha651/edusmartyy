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
  Plus,
  Minus,
  Asterisk,
  Divide,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import MathBuddy from "@/components/math-buddy"

export default function MathLessonsPage() {
  const [showFullMathBuddy, setShowFullMathBuddy] = useState(false)

  const mathTopics = [
    {
      name: "Addition",
      icon: <Plus className="h-6 w-6 text-primary" />,
      description: "Learn to add numbers together",
      progress: 75,
      level: "Beginner to Advanced",
      lessons: 12,
    },
    {
      name: "Subtraction",
      icon: <Minus className="h-6 w-6 text-primary" />,
      description: "Learn to find the difference between numbers",
      progress: 60,
      level: "Beginner to Advanced",
      lessons: 10,
    },
    {
      name: "Multiplication",
      icon: <Asterisk className="h-6 w-6 text-primary" />,
      description: "Learn to multiply numbers together",
      progress: 45,
      level: "Intermediate",
      lessons: 15,
    },
    {
      name: "Division",
      icon: <Divide className="h-6 w-6 text-primary" />,
      description: "Learn to divide numbers into equal parts",
      progress: 30,
      level: "Intermediate",
      lessons: 12,
    },
    {
      name: "Fractions",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      description: "Learn about parts of a whole",
      progress: 20,
      level: "Intermediate to Advanced",
      lessons: 18,
    },
    {
      name: "Geometry",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      description: "Learn about shapes and their properties",
      progress: 15,
      level: "All Levels",
      lessons: 20,
    },
  ]

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
                className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-primary"
              >
                <Calculator className="h-5 w-5" />
                Math Lessons
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
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary"
              >
                <Calculator className="h-4 w-4" />
                Math Lessons
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
              <h1 className="text-2xl font-bold">Math Lessons</h1>
              <Button onClick={() => setShowFullMathBuddy(true)} className="gap-2">
                <Calculator className="h-4 w-4" />
                Open Math Buddy
              </Button>
            </div>

            <Tabs defaultValue="all-topics">
              <TabsList>
                <TabsTrigger value="all-topics">All Topics</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              <TabsContent value="all-topics" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mathTopics.map((topic, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-muted/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-2">{topic.icon}</div>
                          <CardTitle>{topic.name}</CardTitle>
                        </div>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Progress</span>
                              <span className="text-sm text-muted-foreground">{topic.progress}%</span>
                            </div>
                            <Progress value={topic.progress} />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-muted-foreground">Level: </span>
                              <span>{topic.level}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Lessons: </span>
                              <span>{topic.lessons}</span>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full justify-between">
                            Continue Learning
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="in-progress" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mathTopics
                    .filter((topic) => topic.progress > 0 && topic.progress < 100)
                    .map((topic, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-muted/50">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary/10 p-2">{topic.icon}</div>
                            <CardTitle>{topic.name}</CardTitle>
                          </div>
                          <CardDescription>{topic.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Progress</span>
                                <span className="text-sm text-muted-foreground">{topic.progress}%</span>
                              </div>
                              <Progress value={topic.progress} />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div>
                                <span className="text-muted-foreground">Level: </span>
                                <span>{topic.level}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Lessons: </span>
                                <span>{topic.lessons}</span>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full justify-between">
                              Continue Learning
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="recommended" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mathTopics
                    .filter((topic) => topic.progress < 30)
                    .map((topic, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-muted/50">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary/10 p-2">{topic.icon}</div>
                            <CardTitle>{topic.name}</CardTitle>
                          </div>
                          <CardDescription>{topic.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Progress</span>
                                <span className="text-sm text-muted-foreground">{topic.progress}%</span>
                              </div>
                              <Progress value={topic.progress} />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div>
                                <span className="text-muted-foreground">Level: </span>
                                <span>{topic.level}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Lessons: </span>
                                <span>{topic.lessons}</span>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full justify-between">
                              Start Learning
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {showFullMathBuddy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Math Buddy - Interactive Tutor</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowFullMathBuddy(false)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <MathBuddy />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

