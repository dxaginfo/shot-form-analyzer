# Shot Form Analyzer

An AI-powered web application that analyzes basketball shooting form from uploaded videos, providing personalized feedback to improve shooting technique.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Key Components](#key-components)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [License](#license)

## Overview

Shot Form Analyzer uses computer vision and machine learning to help basketball players improve their shooting technique. Users can upload videos of their shot, and the application provides detailed metrics, visual feedback, and personalized recommendations to enhance form and accuracy.

## Features

- **Video Upload & Processing**: Upload or record shooting videos for analysis
- **AI-Powered Analysis**: Real-time pose detection using TensorFlow.js and MediaPipe
- **Key Metric Measurement**:
  - Elbow angle
  - Release point height
  - Shot arc
  - Body alignment
  - Follow-through
- **Visual Feedback**: Interactive visual representation of body mechanics
- **Form Comparison**: Side-by-side comparison with ideal shooting form
- **Personalized Recommendations**: Custom drills and tips based on analysis
- **Progress Tracking**: Monitor improvement over time
- **Client-Side Processing**: All analysis happens in the browser for privacy

## Technical Stack

- **Frontend**: React.js with styled-components
- **AI/ML**: TensorFlow.js, MediaPipe Pose Detection
- **State Management**: React Context API and hooks
- **Styling**: Styled Components
- **Visualization**: D3.js for metrics visualization
- **Video Processing**: HTML5 Canvas API
- **Routing**: React Router
- **Build Tool**: Create React App

## Project Structure

```
shot-form-analyzer/
├── docs/                 # Documentation files
│   ├── architecture.md   # System architecture
│   └── user-guide.md     # User guide
├── public/               # Static files
├── src/                  # Source code
│   ├── components/       # UI components
│   │   ├── analysis/     # Analysis-specific components
│   │   ├── layout/       # Layout components
│   │   └── upload/       # Upload-specific components
│   ├── pages/            # Page components
│   ├── services/         # Core services
│   │   └── poseDetectionService.js  # AI processing
│   ├── styles/           # Global styles and theme
│   ├── utils/            # Utility functions
│   ├── App.js            # Main App component
│   └── index.js          # Entry point
└── package.json          # Dependencies and scripts
```

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/shot-form-analyzer.git
   cd shot-form-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Key Components

### Pose Detection Service

The core of the application is the `poseDetectionService.js` file which handles:

- TensorFlow.js model initialization
- Video frame processing
- Keypoint detection
- Shooting form analysis
- Metric calculation

### Video Uploader

The `VideoUploader` component manages:

- Drag-and-drop file upload
- Video format validation
- Video previewing
- Submission to analysis pipeline

### Analysis Dashboard

The `Analysis` page displays:

- Overall form score
- Detailed metrics with visualizations
- Side-by-side comparison
- Personalized recommendations
- Drill suggestions

## How It Works

1. **Video Upload**: User uploads or records a video of their basketball shot
2. **Preprocessing**: Video is prepared for analysis (frame extraction)
3. **Pose Detection**: TensorFlow.js model identifies body keypoints in key frames
4. **Form Analysis**: System calculates shooting form metrics:
   - Identifies key moments (setup, release, follow-through)
   - Measures angles, positions, and trajectories
   - Compares to ideal form models
5. **Feedback Generation**: Creates personalized feedback based on analysis
6. **Visualization**: Presents results in an intuitive visual dashboard
7. **Progress Tracking**: Saves analysis for future comparison (for registered users)

## Future Enhancements

- **3D Analysis**: Support for multi-angle video analysis
- **Ball Tracking**: Advanced ball trajectory analysis
- **Mobile App**: Native mobile application for on-court use
- **Team Dashboard**: Coach portal for managing multiple players
- **Video Export**: Export annotated videos with form analysis
- **AI Coaching**: Real-time feedback during practice sessions
- **Exercise Library**: Expanded library of corrective drills

## Contributors

- [Dxaginfo Team](https://github.com/dxaginfo)

## License

This project is licensed under the MIT License - see the LICENSE file for details.