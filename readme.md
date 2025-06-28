# AI  edusmarty Tutor Project

A modern, interactive AI tutoring system with a 3D character interface and adaptive learning capabilities.

## Overview
![image](https://github.com/user-attachments/assets/5bd85f0e-d105-48f7-be26-55bf23364be7)

The AI Tutor is a React-based application that provides personalized tutoring through an interactive AI character. The system features multiple interaction modes, subject-specific content, and an engaging user interface designed to enhance the learning experience.
![image](https://github.com/user-attachments/assets/3ae096ea-be9f-475e-b395-b673a322a66b)
## Key Components

### Core Components

- **Smart Tutor (`smart-tutor.tsx`)**: The main component that handles the tutor interface, chat functionality, and integration with other components. Supports different view modes (minimized, regular, and full-screen).

- **Persistent Smart Tutor (`persistent-smart-tutor.tsx`)**: A floating version of the Smart Tutor that remains accessible throughout the application, allowing users to get help at any time.

- **Dashboard Page (`app/dashboard/ai-tutor/page.tsx`)**: A full-screen implementation of the Smart Tutor with additional features like subject selection and comprehensive progress tracking.


### Features Implemented

- Multiple interface modes (minimized, regular, full-screen)
- Chat functionality with simulated AI responses
- Integration points for 3D character animation
- Subject content components
- User settings and customization options
- Progress tracking and gamification elements


## Current Progress

We have successfully created the foundational architecture for the AI Tutor system. The main `smart-tutor.tsx` component has been implemented, which was previously causing import errors in other components that depended on it.

## Next Steps

1. Implement the AI response logic with more sophisticated NLP capabilities
2. Develop subject-specific content modules
3. Enhance the 3D character animations and interactions
4. Add user authentication and progress persistence
5. Implement adaptive learning algorithms
6. Expand gamification features
7. Conduct user testing and gather feedback

## Getting Started
![image](https://github.com/user-attachments/assets/14854084-8a18-4d8f-a3a4-1a6ed87fb747)

To run the AI Tutor project:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Access the application at `http://localhost:3000`

## Tech Stack

- Next.js/React
- TypeScript
- Three.js (for 3D character rendering)
- Tailwind CSS
- [Additional libraries to be added as needed]

![newww](https://github.com/user-attachments/assets/c043d5aa-7763-4caa-b8d9-e402cbdb8ef2)
