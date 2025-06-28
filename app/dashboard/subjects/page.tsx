"use client"

import Link from "next/link"
import { Award, BookOpen, Brain, Calendar, ChevronRight, Home, LogOut, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubjectsPage() {
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
                className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-primary"
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
        <div className="relative ml-auto flex-1 md:grow-0 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search subjects..." className="w-full pl-8 md:w-80" />
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
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary"
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
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Subjects</h1>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Mathematics</CardTitle>
                      <CardDescription>Numbers, operations, and problem-solving</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Multiplication Tables</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Reading</CardTitle>
                      <CardDescription>Comprehension, vocabulary, and stories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">60%</span>
                          </div>
                          <Progress value={60} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Reading Comprehension</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Science</CardTitle>
                      <CardDescription>Natural world, experiments, and discoveries</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">40%</span>
                          </div>
                          <Progress value={40} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Solar System</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Writing</CardTitle>
                      <CardDescription>Grammar, composition, and creative writing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Basic Grammar</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>History</CardTitle>
                      <CardDescription>Past events, civilizations, and cultures</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">10%</span>
                          </div>
                          <Progress value={10} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Ancient Civilizations</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Coding</CardTitle>
                      <CardDescription>Programming basics and computational thinking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">5%</span>
                          </div>
                          <Progress value={5} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Introduction to Coding</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="in-progress" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Mathematics</CardTitle>
                      <CardDescription>Numbers, operations, and problem-solving</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Multiplication Tables</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Reading</CardTitle>
                      <CardDescription>Comprehension, vocabulary, and stories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">60%</span>
                          </div>
                          <Progress value={60} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Reading Comprehension</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Science</CardTitle>
                      <CardDescription>Natural world, experiments, and discoveries</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">40%</span>
                          </div>
                          <Progress value={40} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Current: Solar System</div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No completed subjects yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Keep learning to complete your first subject!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

