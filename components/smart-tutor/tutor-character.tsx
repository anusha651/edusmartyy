"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface TutorCharacterProps {
  mood: "neutral" | "happy" | "thinking" | "explaining"
  isSpeaking: boolean
  showingVisualAid: boolean
  visualAidType: "none" | "3d-model" | "graph" | "diagram" | "animation"
}

export function TutorCharacter({ mood, isSpeaking, showingVisualAid, visualAidType }: TutorCharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null)

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
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.5

    // Create a humanoid character
    const character = new THREE.Group()
    scene.add(character)

    // Character body
    const bodyGeometry = new THREE.CapsuleGeometry(0.8, 1.2, 16, 16)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f46e5, // Indigo color
      metalness: 0.2,
      roughness: 0.8,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = -0.2
    body.castShadow = true
    character.add(body)

    // Character head
    const headGeometry = new THREE.SphereGeometry(0.7, 32, 32)
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xf9fafb, // Light color for face
      metalness: 0.1,
      roughness: 0.8,
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.3
    head.castShadow = true
    character.add(head)

    // Character eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 32, 32)
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e40af, // Deep blue
      emissive: 0x93c5fd,
      emissiveIntensity: 0.5,
    })

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.25, 1.4, 0.55)
    character.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.25, 1.4, 0.55)
    character.add(rightEye)

    // Character eyebrows
    const eyebrowGeometry = new THREE.BoxGeometry(0.25, 0.05, 0.05)
    const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b })

    const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial)
    leftEyebrow.position.set(-0.25, 1.6, 0.55)
    character.add(leftEyebrow)

    const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial)
    rightEyebrow.position.set(0.25, 1.6, 0.55)
    character.add(rightEyebrow)

    // Character mouth
    const mouthGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 32, Math.PI)
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xef4444 })
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
    mouth.position.set(0, 1.1, 0.6)
    mouth.rotation.x = Math.PI / 2
    character.add(mouth)

    // Character arms
    const armGeometry = new THREE.CapsuleGeometry(0.2, 0.8, 16, 16)
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0x4f46e5 })

    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-1, 0.3, 0)
    leftArm.rotation.z = Math.PI / 6
    leftArm.castShadow = true
    character.add(leftArm)

    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(1, 0.3, 0)
    rightArm.rotation.z = -Math.PI / 6
    rightArm.castShadow = true
    character.add(rightArm)

    // Character hands
    const handGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const handMaterial = new THREE.MeshStandardMaterial({ color: 0xf9fafb })

    const leftHand = new THREE.Mesh(handGeometry, handMaterial)
    leftHand.position.set(-1.4, -0.1, 0)
    leftHand.castShadow = true
    character.add(leftHand)

    const rightHand = new THREE.Mesh(handGeometry, handMaterial)
    rightHand.position.set(1.4, -0.1, 0)
    rightHand.castShadow = true
    character.add(rightHand)

    // Character legs
    const legGeometry = new THREE.CapsuleGeometry(0.25, 0.8, 16, 16)
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3730a3 })

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
    leftLeg.position.set(-0.4, -1.2, 0)
    leftLeg.castShadow = true
    character.add(leftLeg)

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
    rightLeg.position.set(0.4, -1.2, 0)
    rightLeg.castShadow = true
    character.add(rightLeg)

    // Character feet
    const footGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5)
    const footMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b })

    const leftFoot = new THREE.Mesh(footGeometry, footMaterial)
    leftFoot.position.set(-0.4, -1.7, 0.1)
    leftFoot.castShadow = true
    character.add(leftFoot)

    const rightFoot = new THREE.Mesh(footGeometry, footMaterial)
    rightFoot.position.set(0.4, -1.7, 0.1)
    rightFoot.castShadow = true
    character.add(rightFoot)

    // Visual aids group
    const visualAidGroup = new THREE.Group()
    visualAidGroup.position.set(2.5, 0.5, -1)
    scene.add(visualAidGroup)

    // Create different visual aids based on type
    if (visualAidType === "3d-model") {
      // Example: Atom model for science
      const nucleusGeometry = new THREE.SphereGeometry(0.3, 32, 32)
      const nucleusMaterial = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xef4444,
        emissiveIntensity: 0.3,
      })
      const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial)
      visualAidGroup.add(nucleus)

      // Create electron orbits
      const orbitGeometry = new THREE.TorusGeometry(0.8, 0.02, 16, 100)
      const orbitMaterial = new THREE.MeshStandardMaterial({ color: 0x93c5fd })

      const orbit1 = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit1.rotation.x = Math.PI / 2
      visualAidGroup.add(orbit1)

      const orbit2 = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit2.rotation.x = Math.PI / 4
      visualAidGroup.add(orbit2)

      const orbit3 = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit3.rotation.x = -Math.PI / 4
      visualAidGroup.add(orbit3)

      // Create electrons
      const electronGeometry = new THREE.SphereGeometry(0.08, 16, 16)
      const electronMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.5,
      })

      const electron1 = new THREE.Mesh(electronGeometry, electronMaterial)
      electron1.position.set(0.8, 0, 0)
      visualAidGroup.add(electron1)

      const electron2 = new THREE.Mesh(electronGeometry, electronMaterial)
      electron2.position.set(-0.4, 0.7, 0)
      visualAidGroup.add(electron2)

      const electron3 = new THREE.Mesh(electronGeometry, electronMaterial)
      electron3.position.set(-0.4, -0.7, 0)
      visualAidGroup.add(electron3)
    } else if (visualAidType === "graph") {
      // Example: Coordinate system for math
      // X-axis
      const xAxisGeometry = new THREE.BoxGeometry(2, 0.03, 0.03)
      const axisMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
      const xAxis = new THREE.Mesh(xAxisGeometry, axisMaterial)
      xAxis.position.set(0, 0, 0)
      visualAidGroup.add(xAxis)

      // Y-axis
      const yAxisGeometry = new THREE.BoxGeometry(0.03, 2, 0.03)
      const yAxis = new THREE.Mesh(yAxisGeometry, axisMaterial)
      yAxis.position.set(0, 0, 0)
      visualAidGroup.add(yAxis)

      // Function graph (parabola)
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-1, -0.5, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(1, -0.5, 0),
      )

      const points = curve.getPoints(50)
      const graphGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const graphMaterial = new THREE.LineBasicMaterial({ color: 0xef4444 })
      const graph = new THREE.Line(graphGeometry, graphMaterial)
      visualAidGroup.add(graph)
    } else if (visualAidType === "diagram") {
      // Example: Fraction diagram
      const wholeGeometry = new THREE.BoxGeometry(1.6, 0.8, 0.1)
      const wholeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      })
      const whole = new THREE.Mesh(wholeGeometry, wholeMaterial)
      visualAidGroup.add(whole)

      // Dividing lines
      const lineGeometry = new THREE.BoxGeometry(0.02, 0.8, 0.12)
      const lineMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })

      for (let i = 1; i < 4; i++) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial)
        line.position.set(-0.8 + i * 0.4, 0, 0)
        visualAidGroup.add(line)
      }

      // Highlight 3/4
      const highlightGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.05)
      const highlightMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.5,
      })
      const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial)
      highlight.position.set(-0.2, 0, 0.1)
      visualAidGroup.add(highlight)
    } else if (visualAidType === "animation") {
      // Example: Simple animation placeholder
      // This will be animated in the animation loop
      const animGeometry = new THREE.BoxGeometry(1.5, 1, 0.1)
      const animMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8,
      })
      const animPlane = new THREE.Mesh(animGeometry, animMaterial)
      visualAidGroup.add(animPlane)

      // Add some animated elements
      const element1Geometry = new THREE.SphereGeometry(0.1, 16, 16)
      const element1Material = new THREE.MeshStandardMaterial({ color: 0xef4444 })
      const element1 = new THREE.Mesh(element1Geometry, element1Material)
      element1.position.set(-0.5, 0, 0.1)
      visualAidGroup.add(element1)

      const element2Geometry = new THREE.SphereGeometry(0.1, 16, 16)
      const element2Material = new THREE.MeshStandardMaterial({ color: 0x22c55e })
      const element2 = new THREE.Mesh(element2Geometry, element2Material)
      element2.position.set(0, 0, 0.1)
      visualAidGroup.add(element2)

      const element3Geometry = new THREE.SphereGeometry(0.1, 16, 16)
      const element3Material = new THREE.MeshStandardMaterial({ color: 0xeab308 })
      const element3 = new THREE.Mesh(element3Geometry, element3Material)
      element3.position.set(0.5, 0, 0.1)
      visualAidGroup.add(element3)
    }

    // Set visual aid visibility
    visualAidGroup.visible = showingVisualAid

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Ground plane for shadow
    const groundGeometry = new THREE.PlaneGeometry(10, 10)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f4ff,
      roughness: 1,
      metalness: 0,
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -1.8
    ground.receiveShadow = true
    scene.add(ground)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)

      time += 0.01

      // Character animations based on mood
      if (mood === "neutral") {
        // Subtle idle animation
        character.position.y = Math.sin(time * 0.5) * 0.05
        leftArm.rotation.z = Math.PI / 6 + Math.sin(time * 0.5) * 0.05
        rightArm.rotation.z = -Math.PI / 6 + Math.sin(time * 0.5) * 0.05

        // Reset eyebrows and mouth
        leftEyebrow.position.y = 1.6
        rightEyebrow.position.y = 1.6
        leftEyebrow.rotation.z = 0
        rightEyebrow.rotation.z = 0
        mouth.scale.set(1, 1, 1)
      } else if (mood === "happy") {
        // Happy bouncing animation
        character.position.y = Math.sin(time) * 0.1
        leftArm.rotation.z = Math.PI / 6 + Math.sin(time) * 0.2
        rightArm.rotation.z = -Math.PI / 6 + Math.sin(time) * 0.2

        // Happy eyebrows and smile
        leftEyebrow.position.y = 1.65
        rightEyebrow.position.y = 1.65
        mouth.scale.set(1.2, 1, 1)
      } else if (mood === "thinking") {
        // Thinking pose
        character.position.y = Math.sin(time * 0.3) * 0.05
        leftArm.rotation.z = Math.PI / 2.5
        rightArm.rotation.z = -Math.PI / 6
        rightHand.position.y = 1.2
        rightHand.position.x = 0.5

        // Thinking expression
        leftEyebrow.position.y = 1.65
        rightEyebrow.position.y = 1.55
        leftEyebrow.rotation.z = -0.2
        rightEyebrow.rotation.z = 0.2
        mouth.scale.set(0.7, 1, 1)
      } else if (mood === "explaining") {
        // Explaining animation with gesturing
        character.position.y = Math.sin(time * 0.5) * 0.05
        leftArm.rotation.z = Math.PI / 6 + Math.sin(time * 2) * 0.5
        rightArm.rotation.z = -Math.PI / 6 + Math.cos(time * 2) * 0.5

        // Alert, engaging expression
        leftEyebrow.position.y = 1.65
        rightEyebrow.position.y = 1.65
        mouth.scale.set(1, 1, 1)
      }

      // Mouth animation when speaking
      if (isSpeaking) {
        mouth.scale.y = 1 + Math.sin(time * 10) * 0.5
      }

      // Animate visual aids if showing
      if (showingVisualAid) {
        visualAidGroup.rotation.y = time * 0.2

        if (visualAidType === "3d-model") {
          // Rotate electron positions
          if (visualAidGroup.children.length >= 7) {
            const electron1 = visualAidGroup.children[4]
            const electron2 = visualAidGroup.children[5]
            const electron3 = visualAidGroup.children[6]

            electron1.position.x = Math.cos(time * 2) * 0.8
            electron1.position.z = Math.sin(time * 2) * 0.8

            electron2.position.x = Math.cos(time * 2 + 2) * 0.8
            electron2.position.z = Math.sin(time * 2 + 2) * 0.8

            electron3.position.x = Math.cos(time * 2 + 4) * 0.8
            electron3.position.z = Math.sin(time * 2 + 4) * 0.8
          }
        } else if (visualAidType === "animation") {
          // Animate the elements
          if (visualAidGroup.children.length >= 4) {
            const element1 = visualAidGroup.children[1]
            const element2 = visualAidGroup.children[2]
            const element3 = visualAidGroup.children[3]

            element1.position.y = Math.sin(time * 3) * 0.3
            element2.position.y = Math.sin(time * 3 + 1) * 0.3
            element3.position.y = Math.sin(time * 3 + 2) * 0.3
          }
        }
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
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [mood, isSpeaking, showingVisualAid, visualAidType])

  return <div ref={containerRef} className="w-full h-full" />
}

