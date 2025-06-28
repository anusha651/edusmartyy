"use client"

import Link from "next/link"
import { Award, BookOpen, Brain, Calendar, Home, LogOut, Menu, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProgressPage() {
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
                href="/dashboard/progress"
                className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-primary"
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
                href="/dashboard/progress"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary"
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
            <h1 className="text-2xl font-bold">Your Progress</h1>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12h 30m</div>
                  <p className="text-xs text-muted-foreground">+2h 15m from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+5 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Progress</CardTitle>
                    <CardDescription>Your progress across all subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Mathematics</span>
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Reading</span>
                          <span className="text-sm text-muted-foreground">60%</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Science</span>
                          <span className="text-sm text-muted-foreground">40%</span>
                        </div>
                        <Progress value={40} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Writing</span>
                          <span className="text-sm text-muted-foreground">25%</span>
                        </div>
                        <Progress value={25} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">History</span>
                          <span className="text-sm text-muted-foreground">10%</span>
                        </div>
                        <Progress value={10} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Coding</span>
                          <span className="text-sm text-muted-foreground">5%</span>
                        </div>
                        <Progress value={5} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>Your learning activity over the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-[200px] items-end gap-2">
                      {[30, 45, 25, 60, 75, 40, 50].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-primary rounded-t-md" style={{ height: `${height}%` }} />
                          <span className="text-xs text-muted-foreground">
                            {["M", "T", "W", "T", "F", "S", "S"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="badges" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Earned Badges</CardTitle>
                    <CardDescription>Badges you've earned through your learning journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {[
                        "Math Whiz",
                        "Reading Star",
                        "Science Explorer",
                        "Consistent Learner",
                        "Quick Thinker",
                        "Perfect Score",
                        "Early Bird",
                      ].map((badge, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 text-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Star className="h-8 w-8 text-primary" />
                          </div>
                          <span className="font-medium">{badge}</span>
                          <span className="text-xs text-muted-foreground">Earned on May {i + 1}, 2023</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="achievements" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Special milestones you've reached</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">5-Day Streak</h3>
                          <p className="text-sm text-muted-foreground">You've learned for 5 days in a row!</p>
                        </div>
                        <span className="text-xs text-muted-foreground">May 10, 2023</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Math Master</h3>
                          <p className="text-sm text-muted-foreground">Completed 10 math lessons with perfect scores</p>
                        </div>
                        <span className="text-xs text-muted-foreground">May 8, 2023</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Reading Champion</h3>
                          <p className="text-sm text-muted-foreground">
                            Read 5 stories and answered all questions correctly
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">May 5, 2023</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">First Day Complete</h3>
                          <p className="text-sm text-muted-foreground">Completed your first day of learning</p>
                        </div>
                        <span className="text-xs text-muted-foreground">May 1, 2023</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

