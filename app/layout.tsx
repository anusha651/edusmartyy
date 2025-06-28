import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import PersistentSmartTutor from "@/components/persistent-smart-tutor"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI-Powered 3D Virtual Tutor for Kids",
  description:
    "Transform learning into an exciting adventure with our interactive 3D tutor that adapts to your child's unique learning style.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <PersistentSmartTutor />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'