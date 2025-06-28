"use client"

import { CardTitle } from "@/components/ui/card"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Maximize2,
  Minimize2,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  MessageSquare,
  BookOpen,
  Award,
  Calculator,
  FlaskRoundIcon as Flask,
  ChevronDown,
} from "lucide-react"

import { TutorCharacter } from "./tutor-character"
import { SubjectContent } from "./subject-content"

// Define message types
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Define props for the SmartTutor component
interface SmartTutorProps {
  minimized?: boolean
  onMinimize?: () => void
  onMaximize?: () => void
  fullScreen?: boolean
  onToggleFullScreen?: () => void
  onClose?: () => void
}

// Sample responses for different subjects
const sampleResponses: Record<string, string[]> = {
  mathematics: [
    "Great question about math! Let me explain how to solve this step-by-step...",
    "In mathematics, we approach this problem by breaking it down into smaller parts...",
    "This is a common math concept. Let me show you an example with numbers...",
    "When working with this type of math problem, remember to follow the order of operations: PEMDAS.",
    "Let's visualize this math concept with a graph to make it clearer.",
  ],
  science: [
    "That's an interesting science question! The scientific explanation is...",
    "In science, this phenomenon occurs because of the relationship between...",
    "Scientists have discovered that this process works by...",
    "Let me explain this scientific concept with a simple experiment you can visualize...",
    "This is how atoms and molecules interact to create the effect you're asking about...",
  ],
  "social-studies": [
    "In history, this event happened because of several important factors...",
    "Geographically speaking, this region is significant because...",
    "The cultural impact of this development was far-reaching, affecting...",
    "From an economic perspective, this change led to...",
    "The political systems in this time period were structured around...",
  ],
  english: [
    "This literary device is used by authors to create a specific effect where...",
    "When analyzing this text, pay attention to how the author uses language to...",
    "The grammar rule you're asking about works like this...",
    "Let's break down the structure of this sentence to understand it better...",
    "This writing technique helps communicate ideas more effectively by...",
  ],
  coding: [
    "In programming, this concept is fundamental because it allows us to...",
    "This algorithm works by following these specific steps...",
    "When coding this function, remember to consider edge cases like...",
    "The syntax for this programming construct is structured like this...",
    "Let me show you how to debug this issue by checking for...",
  ],
}

export default function SmartTutor({
  minimized = false,
  onMinimize,
  onMaximize,
  fullScreen = false,
  onToggleFullScreen,
  onClose,
}: SmartTutorProps) {
  // State for the tutor
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! I'm your AI tutor. I can help you with mathematics, science, social studies, English, and coding. What would you like to learn today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [mood, setMood] = useState<"neutral" | "happy" | "thinking" | "explaining">("neutral")
  const [showingVisualAid, setShowingVisualAid] = useState(false)
  const [visualAidType, setVisualAidType] = useState<"none" | "3d-model" | "graph" | "diagram" | "animation">("none")
  const [micEnabled, setMicEnabled] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("chat")
  const [subject, setSubject] = useState("mathematics")
  const [gradeLevel, setGradeLevel] = useState(5)
  const [points, setPoints] = useState(120)
  const [streak, setStreak] = useState(3)
  const [level, setLevel] = useState(2)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [voiceSpeed, setVoiceSpeed] = useState(1)
  const [voicePitch, setVoicePitch] = useState(1)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when not minimized
  useEffect(() => {
    if (!minimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [minimized])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsProcessing(true)
    setMood("thinking")

    // Determine which subject the question is about
    const subjectKeywords = {
      mathematics: [
        "math",
        "algebra",
        "geometry",
        "calculation",
        "equation",
        "number",
        "add",
        "subtract",
        "multiply",
        "divide",
      ],
      science: [
        "science",
        "biology",
        "chemistry",
        "physics",
        "experiment",
        "atom",
        "molecule",
        "cell",
        "energy",
        "force",
      ],
      "social-studies": [
        "history",
        "geography",
        "society",
        "culture",
        "government",
        "economy",
        "politics",
        "country",
        "civilization",
        "war",
      ],
      english: [
        "english",
        "grammar",
        "writing",
        "reading",
        "literature",
        "book",
        "story",
        "poem",
        "author",
        "character",
      ],
      coding: [
        "code",
        "programming",
        "algorithm",
        "function",
        "variable",
        "loop",
        "condition",
        "syntax",
        "debug",
        "computer",
      ],
    }

    let detectedSubject = subject
    const lowerCaseInput = inputValue.toLowerCase()

    for (const [subj, keywords] of Object.entries(subjectKeywords)) {
      if (keywords.some((keyword) => lowerCaseInput.includes(keyword))) {
        detectedSubject = subj
        break
      }
    }

    // Determine if we should show a visual aid
    const shouldShowVisualAid = Math.random() > 0.5
    let aidType: "none" | "3d-model" | "graph" | "diagram" | "animation" = "none"

    if (shouldShowVisualAid) {
      const aidTypes: ("3d-model" | "graph" | "diagram" | "animation")[] = ["3d-model", "graph", "diagram", "animation"]
      aidType = aidTypes[Math.floor(Math.random() * aidTypes.length)]

      // Adjust based on subject
      if (detectedSubject === "mathematics") {
        aidType = Math.random() > 0.5 ? "graph" : "diagram"
      } else if (detectedSubject === "science") {
        aidType = Math.random() > 0.5 ? "3d-model" : "animation"
      }
    }

    // Simulate AI processing time
    setTimeout(() => {
      // Get a random response for the detected subject
      const subjectResponses = sampleResponses[detectedSubject] || sampleResponses.mathematics
      const responseContent = subjectResponses[Math.floor(Math.random() * subjectResponses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)
      setMood("explaining")
      setShowingVisualAid(shouldShowVisualAid)
      setVisualAidType(aidType)
      setIsSpeaking(true)

      // Award points for asking a question
      setPoints((prev) => prev + 10)

      // Simulate speech duration based on message length
      const speechDuration = Math.min(10000, responseContent.length * 50)
      setTimeout(() => {
        setIsSpeaking(false)
        setMood("neutral")
      }, speechDuration)
    }, 1500)
  }

  // Handle input submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Toggle microphone (simulated)
  const handleMicToggle = () => {
    if (!micEnabled) {
      setMicEnabled(true)
      // Simulate listening for 3 seconds
      setTimeout(() => {
        setMicEnabled(false)
        // Simulate detected speech
        setInputValue("Can you explain how photosynthesis works?")
      }, 3000)
    } else {
      setMicEnabled(false)
    }
  }

  // Toggle voice output
  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled)
    if (isSpeaking && voiceEnabled) {
      setIsSpeaking(false)
    }
  }

  // Render the minimized button
  if (minimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" onClick={onMaximize}>
          <Brain className="h-6 w-6" />
        </Button>
      </motion.div>
    )
  }

  // Render the full tutor interface
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed z-50 bg-background border rounded-lg shadow-xl overflow-hidden ${
          fullScreen ? "inset-0" : "bottom-4 right-4 w-[400px] h-[600px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-semibold">Smart Tutor</span>
            <Badge variant="outline" className="ml-2">
              Grade {gradeLevel}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(!settingsOpen)}>
              <Settings className="h-4 w-4" />
            </Button>
            {fullScreen ? (
              <Button variant="ghost" size="icon" onClick={onToggleFullScreen}>
                <Minimize2 className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={onToggleFullScreen}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onMinimize}>
              <ChevronDown className="h-4 w-4" />
            </Button>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Settings panel */}
        <AnimatePresence>
          {settingsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Subject & Grade</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="social-studies">Social Studies</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="coding">Coding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select
                        value={gradeLevel.toString()}
                        onValueChange={(value) => setGradeLevel(Number.parseInt(value))}
                      >
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                            <SelectItem key={grade} value={grade.toString()}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Voice Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="voice-toggle">Voice Output</Label>
                      <Switch id="voice-toggle" checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-speed">Speed</Label>
                        <span className="text-sm text-muted-foreground">{voiceSpeed}x</span>
                      </div>
                      <Slider
                        id="voice-speed"
                        min={0.5}
                        max={2}
                        step={0.1}
                        value={[voiceSpeed]}
                        onValueChange={(value) => setVoiceSpeed(value[0])}
                        disabled={!voiceEnabled}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-pitch">Pitch</Label>
                        <span className="text-sm text-muted-foreground">{voicePitch}x</span>
                      </div>
                      <Slider
                        id="voice-pitch"
                        min={0.5}
                        max={1.5}
                        step={0.1}
                        value={[voicePitch]}
                        onValueChange={(value) => setVoicePitch(value[0])}
                        disabled={!voiceEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats bar */}
        <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{points} pts</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                Streak: {streak} days
              </Badge>
            </div>
          </div>
          <div>
            <Badge className="bg-primary">Level {level}</Badge>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col h-[calc(100%-12rem)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-3 px-4 py-2">
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Learn</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>Progress</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
              <div className="flex flex-1">
                {/* Character view */}
                <div className={`${fullScreen ? "w-1/2" : "hidden md:block w-1/2"} border-r`}>
                  <TutorCharacter
                    mood={mood}
                    isSpeaking={isSpeaking}
                    showingVisualAid={showingVisualAid}
                    visualAidType={visualAidType}
                  />
                </div>

                {/* Chat view */}
                <div className={`${fullScreen ? "w-1/2" : "w-full"} flex flex-col`}>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                            <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                            <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleMicToggle}
                        className={micEnabled ? "bg-primary text-primary-foreground" : ""}
                      >
                        {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        className="flex-1"
                        disabled={isProcessing || micEnabled}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleVoiceToggle}
                        className={!voiceEnabled ? "bg-muted" : ""}
                      >
                        {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim() || isProcessing}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="learn" className="flex-1 p-4 m-0 overflow-y-auto">
              <SubjectContent subject={subject} gradeLevel={gradeLevel} />
            </TabsContent>

            <TabsContent value="progress" className="flex-1 p-4 m-0 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Your Learning Journey</h2>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>Overall Progress</CardTitle>
                        <Badge>Level {level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Experience</span>
                          <span className="text-sm text-muted-foreground">{points} / 200</span>
                        </div>
                        <div className="h-4 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(100, (points / 200) * 100)}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {200 - points} points until Level {level + 1}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Subject Mastery</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Calculator className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">Mathematics</h4>
                              <span className="text-sm text-muted-foreground">75%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Flask className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">Science</h4>
                              <span className="text-sm text-muted-foreground">60%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">English</h4>
                              <span className="text-sm text-muted-foreground">65%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted mt-2 overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "65%" }} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                  <Card>
                    <CardContent className="p-4">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <Award className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Completed Fractions Lesson</p>
                            <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                          </div>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Asked 5 Questions</p>
                            <p className="text-sm text-muted-foreground">Yesterday, 3:45 PM</p>
                          </div>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="rounded-full bg-yellow-100 p-2">
                            <Award className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium">Earned "Quick Learner" Badge</p>
                            <p className="text-sm text-muted-foreground">2 days ago</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

