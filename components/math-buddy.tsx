"use client"

import { useState, useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Send, X, Calculator, Plus, Minus, Divide, Asterisk } from "lucide-react"

interface MathBuddyProps {
  onClose?: () => void
  minimized?: boolean
  onMinimize?: () => void
  onMaximize?: () => void
}

export default function MathBuddy({ onClose, minimized = false, onMinimize, onMaximize }: MathBuddyProps) {
  const [activeTab, setActiveTab] = useState("addition")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Hi there! I'm Math Buddy, your personal math tutor. What would you like to learn today?", sender: "bot" },
  ])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 3D character setup
  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f4ff) // Light blue background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.5

    // Create a robot character
    const robot = new THREE.Group()
    scene.add(robot)

    // Robot body
    const bodyGeometry = new THREE.CylinderGeometry(1, 0.8, 2, 16)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f46e5, // Indigo color
      metalness: 0.7,
      roughness: 0.3,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    robot.add(body)

    // Robot head
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32)
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1, // Lighter indigo
      metalness: 0.7,
      roughness: 0.3,
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.5
    robot.add(head)

    // Robot eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x66fff6,
      emissiveIntensity: 0.5,
    })

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.3, 1.6, 0.6)
    robot.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.3, 1.6, 0.6)
    robot.add(rightEye)

    // Robot antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16)
    const antennaMaterial = new THREE.MeshStandardMaterial({ color: 0xc7d2fe })
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial)
    antenna.position.y = 2.3
    robot.add(antenna)

    // Antenna top
    const antennaTopGeometry = new THREE.SphereGeometry(0.1, 16, 16)
    const antennaTopMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.5,
    })
    const antennaTop = new THREE.Mesh(antennaTopGeometry, antennaTopMaterial)
    antennaTop.position.y = 2.6
    robot.add(antennaTop)

    // Robot arms
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16)
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0x818cf8 })

    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-1.2, 0, 0)
    leftArm.rotation.z = Math.PI / 3
    robot.add(leftArm)

    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(1.2, 0, 0)
    rightArm.rotation.z = -Math.PI / 3
    robot.add(rightArm)

    // Robot hands
    const handGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const handMaterial = new THREE.MeshStandardMaterial({ color: 0xc7d2fe })

    const leftHand = new THREE.Mesh(handGeometry, handMaterial)
    leftHand.position.set(-1.8, -0.5, 0)
    robot.add(leftHand)

    const rightHand = new THREE.Mesh(handGeometry, handMaterial)
    rightHand.position.set(1.8, -0.5, 0)
    robot.add(rightHand)

    // Robot mouth (can be animated for speaking)
    const mouthGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 32, Math.PI)
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xc7d2fe })
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
    mouth.position.set(0, 1.2, 0.7)
    mouth.rotation.x = Math.PI / 2
    robot.add(mouth)

    // Add math symbols floating around the robot
    const symbolGroup = new THREE.Group()
    robot.add(symbolGroup)

    const createSymbol = (symbol: string, color: number, position: THREE.Vector3) => {
      const textGeometry = new THREE.TextGeometry(symbol, {
        font: new THREE.Font({}), // This would need a proper font
        size: 0.3,
        height: 0.05,
      })

      // Since we can't easily use TextGeometry without loading a font,
      // let's use simple geometries instead
      let geometry

      switch (symbol) {
        case "+":
          geometry = new THREE.BoxGeometry(0.3, 0.05, 0.05)
          const plusVertical = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }))
          const plusHorizontal = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }))
          plusHorizontal.rotation.z = Math.PI / 2
          const plusGroup = new THREE.Group()
          plusGroup.add(plusVertical)
          plusGroup.add(plusHorizontal)
          plusGroup.position.copy(position)
          return plusGroup
        case "-":
          geometry = new THREE.BoxGeometry(0.3, 0.05, 0.05)
          const minus = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }))
          minus.position.copy(position)
          return minus
        case "×":
          geometry = new THREE.BoxGeometry(0.3, 0.05, 0.05)
          const multVertical = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }))
          const multHorizontal = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }))
          multVertical.rotation.z = Math.PI / 4
          multHorizontal.rotation.z = -Math.PI / 4
          const multGroup = new THREE.Group()
          multGroup.add(multVertical)
          multGroup.add(multHorizontal)
          multGroup.position.copy(position)
          return multGroup
        case "÷":
          geometry = new THREE.BoxGeometry(0.3, 0.05, 0.05)
          const divHorizontal = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }))
          const divDot1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 16, 16),
            new THREE.MeshStandardMaterial({ color }),
          )
          const divDot2 = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 16, 16),
            new THREE.MeshStandardMaterial({ color }),
          )
          divDot1.position.y = 0.15
          divDot2.position.y = -0.15
          const divGroup = new THREE.Group()
          divGroup.add(divHorizontal)
          divGroup.add(divDot1)
          divGroup.add(divDot2)
          divGroup.position.copy(position)
          return divGroup
        default:
          // For other symbols, just use a sphere as placeholder
          const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            new THREE.MeshStandardMaterial({ color }),
          )
          sphere.position.copy(position)
          return sphere
      }
    }

    // Add some math symbols around the robot
    const symbols = [
      { symbol: "+", color: 0xff5555, position: new THREE.Vector3(-1.5, 1.5, -0.5) },
      { symbol: "-", color: 0x55ff55, position: new THREE.Vector3(1.5, 1.5, -0.5) },
      { symbol: "×", color: 0x5555ff, position: new THREE.Vector3(-1.5, -1, -0.5) },
      { symbol: "÷", color: 0xffff55, position: new THREE.Vector3(1.5, -1, -0.5) },
    ]

    symbols.forEach(({ symbol, color, position }) => {
      try {
        const symbolMesh = createSymbol(symbol, color, position)
        symbolGroup.add(symbolMesh)
      } catch (error) {
        console.error("Error creating symbol:", error)
      }
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01

      // Floating animation
      robot.position.y = Math.sin(time) * 0.1

      // Arm animation
      leftArm.rotation.z = Math.PI / 3 + Math.sin(time * 0.5) * 0.1
      rightArm.rotation.z = -Math.PI / 3 + Math.sin(time * 0.5 + Math.PI) * 0.1

      // Eye glow animation
      const eyeIntensity = 0.5 + Math.sin(time * 2) * 0.2
      eyeMaterial.emissiveIntensity = eyeIntensity

      // Antenna light blinking
      antennaTopMaterial.emissiveIntensity = 0.5 + Math.sin(time * 5) * 0.5

      // Mouth animation (talking effect)
      if (isSpeaking) {
        mouth.scale.y = 1 + Math.sin(time * 10) * 0.3
      } else {
        mouth.scale.y = 1
      }

      // Rotate math symbols
      symbolGroup.children.forEach((symbol, i) => {
        symbol.rotation.y = time * (i % 2 === 0 ? 1 : -1)
        symbol.rotation.x = time * 0.5 * (i % 2 === 0 ? -1 : 1)
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [isSpeaking])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setMessages([...messages, { text: message, sender: "user" }])
    setMessage("")

    // Set speaking state
    setIsSpeaking(true)

    // Process the message and generate a response
    setTimeout(() => {
      let response = ""
      const lowerMessage = message.toLowerCase()

      // Check for math topics
      if (lowerMessage.includes("add") || lowerMessage.includes("addition") || lowerMessage.includes("plus")) {
        response =
          "Addition is when we combine numbers to find their total. For example, 3 + 4 = 7. Would you like to practice some addition problems?"
        setActiveTab("addition")
      } else if (
        lowerMessage.includes("subtract") ||
        lowerMessage.includes("subtraction") ||
        lowerMessage.includes("minus")
      ) {
        response =
          "Subtraction is when we find the difference between numbers. For example, 7 - 3 = 4. Would you like to practice some subtraction problems?"
        setActiveTab("subtraction")
      } else if (
        lowerMessage.includes("multiply") ||
        lowerMessage.includes("multiplication") ||
        lowerMessage.includes("times")
      ) {
        response =
          "Multiplication is a quick way to add the same number multiple times. For example, 3 × 4 means 3 + 3 + 3 + 3 = 12. Would you like to practice multiplication?"
        setActiveTab("multiplication")
      } else if (lowerMessage.includes("divide") || lowerMessage.includes("division")) {
        response =
          "Division is sharing a number into equal parts. For example, 8 ÷ 2 = 4 means we can split 8 into 2 equal groups of 4. Would you like to practice division?"
        setActiveTab("division")
      } else if (lowerMessage.includes("fraction")) {
        response =
          "Fractions represent parts of a whole. For example, 1/4 means one part out of four equal parts. Would you like to learn more about fractions?"
        setActiveTab("fractions")
      } else if (lowerMessage.includes("geometry") || lowerMessage.includes("shape")) {
        response =
          "Geometry is all about shapes and their properties. We can learn about circles, triangles, squares, and more! What shape would you like to explore?"
        setActiveTab("geometry")
      }
      // Check for specific math problems
      else if (/\d+\s*[+\-*/]\s*\d+/.test(lowerMessage)) {
        // Extract the math expression
        const expression = lowerMessage.match(/\d+\s*[+\-*/]\s*\d+/)[0]
        try {
          // Safely evaluate the expression
          const result = Function(`'use strict'; return (${expression})`)()
          response = `Let me solve ${expression} for you:\n\n${expression} = ${result}\n\nWould you like me to explain how I solved it?`
        } catch (error) {
          response = "I'm having trouble solving that problem. Could you rephrase it?"
        }
      } else {
        response =
          "I'm your math buddy! I can help you with addition, subtraction, multiplication, division, fractions, and geometry. What would you like to learn about today?"
      }

      // Add bot response
      setMessages((prev) => [...prev, { text: response, sender: "bot" }])

      // Stop speaking animation after a delay
      setTimeout(() => {
        setIsSpeaking(false)
      }, 1000)
    }, 1000)
  }

  // Generate example problems based on the active tab
  const getExampleProblems = () => {
    switch (activeTab) {
      case "addition":
        return [
          { problem: "2 + 3 = ?", answer: "5", explanation: "We add 2 and 3 together to get 5." },
          { problem: "7 + 8 = ?", answer: "15", explanation: "We add 7 and 8 together to get 15." },
          { problem: "12 + 9 = ?", answer: "21", explanation: "We add 12 and 9 together to get 21." },
        ]
      case "subtraction":
        return [
          { problem: "8 - 3 = ?", answer: "5", explanation: "We take away 3 from 8 to get 5." },
          { problem: "15 - 7 = ?", answer: "8", explanation: "We take away 7 from 15 to get 8." },
          { problem: "20 - 12 = ?", answer: "8", explanation: "We take away 12 from 20 to get 8." },
        ]
      case "multiplication":
        return [
          {
            problem: "3 × 4 = ?",
            answer: "12",
            explanation: "3 groups of 4 is 12. We can think of it as 4 + 4 + 4 = 12.",
          },
          {
            problem: "5 × 6 = ?",
            answer: "30",
            explanation: "5 groups of 6 is 30. We can think of it as 6 + 6 + 6 + 6 + 6 = 30.",
          },
          {
            problem: "7 × 8 = ?",
            answer: "56",
            explanation: "7 groups of 8 is 56. We can think of it as 8 + 8 + 8 + 8 + 8 + 8 + 8 = 56.",
          },
        ]
      case "division":
        return [
          { problem: "10 ÷ 2 = ?", answer: "5", explanation: "If we divide 10 into 2 equal groups, each group has 5." },
          { problem: "15 ÷ 3 = ?", answer: "5", explanation: "If we divide 15 into 3 equal groups, each group has 5." },
          { problem: "24 ÷ 6 = ?", answer: "4", explanation: "If we divide 24 into 6 equal groups, each group has 4." },
        ]
      case "fractions":
        return [
          {
            problem: "What is 1/2 of 10?",
            answer: "5",
            explanation: "Half of 10 is 5. We can calculate this by dividing 10 by 2.",
          },
          {
            problem: "What is 1/4 of 20?",
            answer: "5",
            explanation: "One quarter of 20 is 5. We can calculate this by dividing 20 by 4.",
          },
          {
            problem: "What is 3/4 of 12?",
            answer: "9",
            explanation:
              "Three quarters of 12 is 9. We can calculate this by multiplying 12 by 3/4, or by finding 1/4 (which is 3) and multiplying by 3.",
          },
        ]
      case "geometry":
        return [
          {
            problem: "How many sides does a triangle have?",
            answer: "3",
            explanation: "A triangle has 3 sides and 3 angles.",
          },
          {
            problem: "What is the formula for the area of a rectangle?",
            answer: "length × width",
            explanation: "To find the area of a rectangle, we multiply its length by its width.",
          },
          {
            problem: "How many degrees are in a circle?",
            answer: "360",
            explanation: "A full circle contains 360 degrees.",
          },
        ]
      default:
        return []
    }
  }

  const problems = getExampleProblems()

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg" onClick={onMaximize}>
          <Calculator className="h-8 w-8" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-[350px] md:w-[400px] shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Math Buddy</CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={onMinimize}>
            <Minus className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="p-0">
            <div className="flex flex-col h-[500px]">
              <div ref={containerRef} className="h-[200px] bg-muted/40" />

              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about math..."
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="lessons" className="p-4 h-[500px] overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="addition">
                  <Plus className="h-4 w-4 mr-1" />
                  Addition
                </TabsTrigger>
                <TabsTrigger value="subtraction">
                  <Minus className="h-4 w-4 mr-1" />
                  Subtraction
                </TabsTrigger>
                <TabsTrigger value="multiplication">
                  <Asterisk className="h-4 w-4 mr-1" />
                  Multiplication
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="division">
                  <Divide className="h-4 w-4 mr-1" />
                  Division
                </TabsTrigger>
                <TabsTrigger value="fractions">Fractions</TabsTrigger>
                <TabsTrigger value="geometry">Geometry</TabsTrigger>
              </TabsList>

              <div className="space-y-4 mt-4">
                <h3 className="font-bold text-lg capitalize">{activeTab}</h3>
                <p className="text-muted-foreground">
                  {activeTab === "addition" && "Addition is when we combine numbers to find their total."}
                  {activeTab === "subtraction" && "Subtraction is when we find the difference between numbers."}
                  {activeTab === "multiplication" &&
                    "Multiplication is a quick way to add the same number multiple times."}
                  {activeTab === "division" && "Division is sharing a number into equal parts."}
                  {activeTab === "fractions" && "Fractions represent parts of a whole."}
                  {activeTab === "geometry" && "Geometry is all about shapes and their properties."}
                </p>

                <div className="space-y-4 mt-6">
                  <h4 className="font-semibold">Example Problems:</h4>
                  {problems.map((problem, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="font-medium">{problem.problem}</p>
                      <p className="mt-2">Answer: {problem.answer}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{problem.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

