"use client"

import { useState, useRef, useEffect } from "react"
import { X, Mic, MicOff, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface TutorViewProps {
  onClose: () => void
}

export default function TutorView({ onClose }: TutorViewProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "tutor" }[]>([
    { text: "Hi there! I'm your AI tutor. What would you like to learn today?", sender: "tutor" },
  ])
  const [isListening, setIsListening] = useState(false)
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
    scene.background = new THREE.Color(0xf8f9fa)

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

    // Create a simple character (placeholder for a more complex 3D model)
    const group = new THREE.Group()
    scene.add(group)

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(1, 1.5, 4, 8)
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x6366f1 })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    group.add(body)

    // Head
    const headGeometry = new THREE.SphereGeometry(0.7, 32, 32)
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xf9fafb })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.8
    group.add(head)

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32)
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.25, 1.9, 0.55)
    group.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.25, 1.9, 0.55)
    group.add(rightEye)

    // Mouth
    const mouthGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 32, Math.PI)
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
    mouth.position.set(0, 1.6, 0.6)
    mouth.rotation.x = Math.PI / 2
    group.add(mouth)

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.25, 1, 4, 8)
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0x6366f1 })

    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-1.2, 0.2, 0)
    leftArm.rotation.z = Math.PI / 6
    group.add(leftArm)

    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(1.2, 0.2, 0)
    rightArm.rotation.z = -Math.PI / 6
    group.add(rightArm)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01

      // Simple bobbing animation
      group.position.y = Math.sin(time) * 0.2

      // Simple arm waving
      leftArm.rotation.z = Math.PI / 6 + Math.sin(time) * 0.2
      rightArm.rotation.z = -Math.PI / 6 + Math.sin(time + Math.PI) * 0.2

      // Mouth animation (talking effect)
      if (messages[messages.length - 1]?.sender === "tutor") {
        mouth.scale.y = 1 + Math.sin(time * 10) * 0.2
      } else {
        mouth.scale.y = 1
      }

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
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setMessages([...messages, { text: message, sender: "user" }])
    setMessage("")

    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      let response = ""

      if (message.toLowerCase().includes("math") || message.toLowerCase().includes("multiplication")) {
        response = "I'd be happy to help with math! Let's practice multiplication. What's 7 × 8?"
      } else if (message.toLowerCase().includes("read") || message.toLowerCase().includes("book")) {
        response = "Reading is wonderful! Would you like to start with a short story or practice reading comprehension?"
      } else if (message.toLowerCase().includes("science")) {
        response =
          "Science is fascinating! We can explore the solar system, learn about animals, or discover how plants grow. What interests you most?"
      } else {
        response =
          "That's a great question! I can help you with math, reading, science, and many other subjects. What would you like to focus on today?"
      }

      setMessages((prev) => [...prev, { text: response, sender: "tutor" }])
    }, 1000)
  }

  const toggleVoiceRecognition = () => {
    setIsListening(!isListening)

    // In a real app, this would use the Web Speech API
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setMessage("Can you help me with multiplication tables?")
        setIsListening(false)
      }, 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Your AI Tutor</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid flex-1 grid-cols-1 md:grid-cols-2 overflow-hidden">
          <div ref={containerRef} className="h-full bg-muted/40" />

          <div className="flex flex-col h-full">
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleVoiceRecognition}
                  className={isListening ? "bg-primary text-primary-foreground" : ""}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask your tutor a question..."
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

