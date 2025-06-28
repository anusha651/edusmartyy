"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Brain, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setLoading(true)
      // Simulate completion process
      setTimeout(() => {
        setLoading(false)
        router.push("/dashboard")
      }, 1500)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-16 items-center border-b px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">edusmarty</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Let&apos;s set up your account</h1>
            <p className="text-muted-foreground">
              {step === 1 && "Tell us about your child"}
              {step === 2 && "Select learning areas"}
              {step === 3 && "Create your child's profile"}
            </p>
          </div>

          <div className="flex justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step > i ? "bg-primary border-primary" : step === i ? "border-primary" : "border-muted"
                  }`}
                >
                  {step > i ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <span className={step === i ? "text-primary" : "text-muted-foreground"}>{i}</span>
                  )}
                </div>
                <span className="mt-2 text-xs text-muted-foreground">
                  {i === 1 && "Child Info"}
                  {i === 2 && "Subjects"}
                  {i === 3 && "Profile"}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="child-name">Child&apos;s name</Label>
                <Input id="child-name" placeholder="Enter your child's name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-age">Child&apos;s age</Label>
                <Input id="child-age" type="number" min="4" max="12" placeholder="Age" />
              </div>
              <div className="space-y-2">
                <Label>Grade level</Label>
                <RadioGroup defaultValue="elementary">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="preschool" id="preschool" />
                    <Label htmlFor="preschool">Preschool (Ages 3-5)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elementary" id="elementary" />
                    <Label htmlFor="elementary">Elementary (Grades K-5)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="middle" id="middle" />
                    <Label htmlFor="middle">Middle School (Grades 6-8)</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleNext} className="w-full">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select subjects your child needs help with</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Math", "Reading", "Science", "Writing", "History", "Art", "Music", "Coding"].map((subject) => (
                    <Card key={subject} className="cursor-pointer hover:border-primary">
                      <CardContent className="flex items-center justify-between p-4">
                        <span>{subject}</span>
                        <input type="checkbox" className="h-4 w-4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Create a username for your child</Label>
                <Input id="username" placeholder="Username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pin">Create a 4-digit PIN</Label>
                <Input id="pin" type="password" maxLength={4} placeholder="••••" />
              </div>
              <div className="space-y-2">
                <Label>Select an avatar</Label>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="aspect-square cursor-pointer rounded-full bg-muted hover:ring-2 hover:ring-primary"
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1" disabled={loading}>
                  {loading ? "Completing setup..." : "Complete Setup"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

