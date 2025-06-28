"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Award,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import TutorView from "@/components/tutor-view"

export default function DashboardPage() {
  const [showTutor, setShowTutor] = useState(false)

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
              <Link href="/dashboard" className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-primary">
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
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Avatar>
            <AvatarImage src="" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1 text-sm">
              <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary">
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12h 30m</div>
                <p className="text-xs text-muted-foreground">+2h 15m from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Progress</CardTitle>
                <CardDescription>Your learning journey this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Math</span>
                        <Badge variant="outline">Multiplication</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Reading</span>
                        <Badge variant="outline">Comprehension</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Science</span>
                        <Badge variant="outline">Solar System</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <Progress value={40} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended</CardTitle>
                <CardDescription>Based on your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-muted p-2">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">Multiplication Tables</p>
                      <p className="text-sm text-muted-foreground">Continue your progress</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-muted p-2">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">Reading Adventure</p>
                      <p className="text-sm text-muted-foreground">New story available</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Start Learning</CardTitle>
                <CardDescription>Continue where you left off or start something new</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="cursor-pointer hover:bg-muted/50" onClick={() => setShowTutor(true)}>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Brain className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Meet Your Tutor</h3>
                        <p className="text-sm text-muted-foreground">Start an interactive learning session</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="rounded-full bg-primary/10 p-3">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Math Adventure</h3>
                        <p className="text-sm text-muted-foreground">Continue multiplication tables</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="rounded-full bg-primary/10 p-3">
                          <MessageSquare className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Reading Challenge</h3>
                        <p className="text-sm text-muted-foreground">Practice comprehension skills</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {showTutor && <TutorView onClose={() => setShowTutor(false)} />}
    </div>
  )
}

