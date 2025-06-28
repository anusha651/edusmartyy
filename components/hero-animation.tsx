"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

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
  }, [])

  return <div ref={containerRef} className="w-full h-[400px] md:h-[500px]" />
}

