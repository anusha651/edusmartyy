"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calculator, BookOpen, FlaskRoundIcon as Flask, Globe, Code, ChevronRight, Award, Clock } from "lucide-react"

interface SubjectContentProps {
  subject: string
  gradeLevel: number
}

export function SubjectContent({ subject, gradeLevel }: SubjectContentProps) {
  const [activeTab, setActiveTab] = useState("topics")

  // Get appropriate topics based on subject and grade level
  const getTopics = () => {
    if (subject === "mathematics") {
      if (gradeLevel <= 3) {
        return [
          { name: "Counting and Numbers", progress: 85, icon: <Calculator className="h-5 w-5" /> },
          { name: "Addition and Subtraction", progress: 70, icon: <Calculator className="h-5 w-5" /> },
          { name: "Basic Shapes", progress: 90, icon: <Calculator className="h-5 w-5" /> },
          { name: "Telling Time", progress: 60, icon: <Clock className="h-5 w-5" /> },
          { name: "Simple Fractions", progress: 40, icon: <Calculator className="h-5 w-5" /> },
        ]
      } else if (gradeLevel <= 6) {
        return [
          { name: "Multiplication and Division", progress: 75, icon: <Calculator className="h-5 w-5" /> },
          { name: "Fractions and Decimals", progress: 60, icon: <Calculator className="h-5 w-5" /> },
          { name: "Geometry", progress: 65, icon: <Calculator className="h-5 w-5" /> },
          { name: "Measurement", progress: 80, icon: <Calculator className="h-5 w-5" /> },
          { name: "Data and Graphs", progress: 55, icon: <Calculator className="h-5 w-5" /> },
        ]
      } else {
        return [
          { name: "Pre-Algebra", progress: 65, icon: <Calculator className="h-5 w-5" /> },
          { name: "Algebra", progress: 50, icon: <Calculator className="h-5 w-5" /> },
          { name: "Geometry", progress: 60, icon: <Calculator className="h-5 w-5" /> },
          { name: "Statistics", progress: 45, icon: <Calculator className="h-5 w-5" /> },
          { name: "Trigonometry", progress: 30, icon: <Calculator className="h-5 w-5" /> },
        ]
      }
    } else if (subject === "science") {
      if (gradeLevel <= 3) {
        return [
          { name: "Plants and Animals", progress: 80, icon: <Flask className="h-5 w-5" /> },
          { name: "Weather and Seasons", progress: 75, icon: <Flask className="h-5 w-5" /> },
          { name: "Five Senses", progress: 90, icon: <Flask className="h-5 w-5" /> },
          { name: "Earth and Space", progress: 65, icon: <Flask className="h-5 w-5" /> },
          { name: "Simple Machines", progress: 50, icon: <Flask className="h-5 w-5" /> },
        ]
      } else if (gradeLevel <= 6) {
        return [
          { name: "Life Cycles", progress: 70, icon: <Flask className="h-5 w-5" /> },
          { name: "Ecosystems", progress: 65, icon: <Flask className="h-5 w-5" /> },
          { name: "Matter and Energy", progress: 60, icon: <Flask className="h-5 w-5" /> },
          { name: "Earth's Systems", progress: 75, icon: <Flask className="h-5 w-5" /> },
          { name: "Human Body", progress: 80, icon: <Flask className="h-5 w-5" /> },
        ]
      } else {
        return [
          { name: "Biology", progress: 60, icon: <Flask className="h-5 w-5" /> },
          { name: "Chemistry", progress: 55, icon: <Flask className="h-5 w-5" /> },
          { name: "Physics", progress: 50, icon: <Flask className="h-5 w-5" /> },
          { name: "Earth Science", progress: 65, icon: <Flask className="h-5 w-5" /> },
          { name: "Environmental Science", progress: 70, icon: <Flask className="h-5 w-5" /> },
        ]
      }
    } else if (subject === "social-studies") {
      if (gradeLevel <= 3) {
        return [
          { name: "Families and Communities", progress: 85, icon: <Globe className="h-5 w-5" /> },
          { name: "Maps and Globes", progress: 75, icon: <Globe className="h-5 w-5" /> },
          { name: "Holidays and Traditions", progress: 90, icon: <Globe className="h-5 w-5" /> },
          { name: "Jobs and Responsibilities", progress: 80, icon: <Globe className="h-5 w-5" /> },
          { name: "Rules and Laws", progress: 70, icon: <Globe className="h-5 w-5" /> },
        ]
      } else if (gradeLevel <= 6) {
        return [
          { name: "U.S. History", progress: 65, icon: <Globe className="h-5 w-5" /> },
          { name: "World Cultures", progress: 70, icon: <Globe className="h-5 w-5" /> },
          { name: "Geography", progress: 75, icon: <Globe className="h-5 w-5" /> },
          { name: "Government", progress: 60, icon: <Globe className="h-5 w-5" /> },
          { name: "Economics", progress: 55, icon: <Globe className="h-5 w-5" /> },
        ]
      } else {
        return [
          { name: "Ancient Civilizations", progress: 70, icon: <Globe className="h-5 w-5" /> },
          { name: "World History", progress: 65, icon: <Globe className="h-5 w-5" /> },
          { name: "American History", progress: 75, icon: <Globe className="h-5 w-5" /> },
          { name: "Civics and Government", progress: 60, icon: <Globe className="h-5 w-5" /> },
          { name: "Global Issues", progress: 55, icon: <Globe className="h-5 w-5" /> },
        ]
      }
    } else if (subject === "english") {
      if (gradeLevel <= 3) {
        return [
          { name: "Phonics and Reading", progress: 80, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Vocabulary", progress: 75, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Grammar Basics", progress: 70, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Writing Sentences", progress: 65, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Storytelling", progress: 85, icon: <BookOpen className="h-5 w-5" /> },
        ]
      } else if (gradeLevel <= 6) {
        return [
          { name: "Reading Comprehension", progress: 60, icon: <BookOpen className="h-5 w-5" /> },
        ]
      } else {
        return [
          { name: "Literary Analysis", progress: 65, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Essay Writing", progress: 60, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Research Skills", progress: 55, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Advanced Grammar", progress: 70, icon: <BookOpen className="h-5 w-5" /> },
          { name: "Public Speaking", progress: 50, icon: <BookOpen className="h-5 w-5" /> },
        ]
      }
    } else if (subject === "coding") {
      if (gradeLevel <= 3) {
        return [
          { name: "Basic Concepts", progress: 75, icon: <Code className="h-5 w-5" /> },
          { name: "Block Coding", progress: 85, icon: <Code className="h-5 w-5" /> },
          { name: "Simple Algorithms", progress: 70, icon: <Code className="h-5 w-5" /> },
          { name: "Sequencing", progress: 80, icon: <Code className="h-5 w-5" /> },
          { name: "Debugging Basics", progress: 65, icon: <Code className="h-5 w-5" /> },
        ]
      } else if (gradeLevel <= 6) {
        return [
          { name: "Scratch Programming", progress: 80, icon: <Code className="h-5 w-5" /> },
          { name: "Loops and Conditionals", progress: 70, icon: <Code className="h-5 w-5" /> },
          { name: "Variables", progress: 65, icon: <Code className="h-5 w-5" /> },
          { name: "Simple Games", progress: 75, icon: <Code className="h-5 w-5" /> },
          { name: "Basic HTML", progress: 60, icon: <Code className="h-5 w-5" /> },
        ]
      } else {
        return [
          { name: "Python Basics", progress: 65, icon: <Code className="h-5 w-5" /> },
          { name: "JavaScript", progress: 55, icon: <Code className="h-5 w-5" /> },
          { name: "Web Development", progress: 60, icon: <Code className="h-5 w-5" /> },
          { name: "Data Structures", progress: 45, icon: <Code className="h-5 w-5" /> },
          { name: "App Development", progress: 50, icon: <Code className="h-5 w-5" /> },
        ]
      }
    }

    // Default topics if subject doesn't match
    return [
      { name: "Topic 1", progress: 50, icon: <BookOpen className="h-5 w-5" /> },
      { name: "Topic 2", progress: 50, icon: <BookOpen className="h-5 w-5" /> },
      { name: "Topic 3", progress: 50, icon: <BookOpen className="h-5 w-5" /> },
    ]
  }

  const topics = getTopics()

  // Get lessons for the first topic
  const getLessons = () => {
    const firstTopic = topics[0]?.name || "Topic"

    return [
      { name: `Introduction to ${firstTopic}`, duration: "15 min", completed: true },
      { name: `${firstTopic} Fundamentals`, duration: "20 min", completed: true },
      { name: `Practicing ${firstTopic}`, duration: "25 min", completed: false },
      { name: `Advanced ${firstTopic}`, duration: "30 min", completed: false },
      { name: `${firstTopic} Challenge`, duration: "20 min", completed: false },
    ]
  }

  const lessons = getLessons()

  // Get achievements
  const getAchievements = () => {
    return [
      { name: "First Steps", description: "Complete your first lesson", earned: true, date: "2 weeks ago" },
      { name: "Quick Learner", description: "Complete 5 lessons", earned: true, date: "1 week ago" },
      { name: "Subject Expert", description: "Master a topic", earned: false },
      { name: "Perfect Score", description: "Get 100% on a quiz", earned: true, date: "3 days ago" },
      { name: "Consistent Learner", description: "Study for 5 days in a row", earned: false },
    ]
  }

  const achievements = getAchievements()

  // Get subject icon
  const getSubjectIcon = () => {
    switch (subject) {
      case "mathematics":
        return <Calculator className="h-6 w-6 text-primary" />
      case "science":
        return <Flask className="h-6 w-6 text-primary" />
      case "social-studies":
        return <Globe className="h-6 w-6 text-primary" />
      case "english":
        return <BookOpen className="h-6 w-6 text-primary" />
      case "coding":
        return <Code className="h-6 w-6 text-primary" />
      default:
        return <BookOpen className="h-6 w-6 text-primary" />
    }
  }

  // Get subject name
  const getSubjectName = () => {
    switch (subject) {
      case "mathematics":
        return "Mathematics"
      case "science":
        return "Science"
      case "social-studies":
        return "Social Studies"
      case "english":
        return "English"
      case "coding":
        return "Coding"
      default:
        return "Subject"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {getSubjectIcon()}
        <h2 className="text-2xl font-bold">{getSubjectName()}</h2>
        <Badge variant="outline">Grade {gradeLevel}</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-4 mt-4">
          {topics.map((topic, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-2">{topic.icon}</div>
                    <CardTitle className="text-lg">{topic.name}</CardTitle>
                  </div>
                  <Badge variant={topic.progress >= 70 ? "default" : "outline"}>
                    {topic.progress >= 70 ? "Mastering" : "In Progress"}
                  </Badge>
                </div>
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
                  <Button variant="outline" className="w-full justify-between">
                    Continue Learning
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="lessons" className="space-y-4 mt-4">
          {lessons.map((lesson, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{lesson.name}</h3>
                    <p className="text-sm text-muted-foreground">Duration: {lesson.duration}</p>
                  </div>
                  {lesson.completed ? <Badge>Completed</Badge> : <Button size="sm">Start</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 mt-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className={!achievement.earned ? "opacity-50" : undefined}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.earned && <p className="text-xs text-muted-foreground">Earned {achievement.date}</p>}
                  </div>
                  {achievement.earned ? <Badge>Earned</Badge> : <Badge variant="outline">Locked</Badge>}
                </div>
              </CardContent>
            </Card>
             ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}