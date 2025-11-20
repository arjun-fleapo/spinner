# Premium Spinner Wheel

A React + Vite + TypeScript application featuring an interactive spinner wheel for reward claiming.

## Features

- Interactive spinner wheel with smooth animations
- Reward claiming system with API integration
- Toast notifications for user feedback
- Responsive design for mobile and desktop
- TypeScript for type safety
- Modern React with hooks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
spinner/
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Usage

The app expects query parameters in the URL:
- `userId`: User identifier
- `mangoId`: Mango identifier

Example: `http://localhost:5173?userId=123&mangoId=456`

## Technologies

- React 18
- TypeScript
- Vite
- CSS3 (with animations)

