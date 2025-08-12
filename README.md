# Kanban Board Project

A React-based Kanban board application built with Vite, featuring drag-and-drop functionality and real-time status updates.

## Features

- Drag and drop cards between columns
- Search functionality for tasks
- Color-coded status columns
- Developer avatars
- Task type indicators
- Real-time card count per column

## Technologies Used

- React 19
- Vite 7
- Tailwind CSS
- DND Kit for drag-and-drop
- Axios for API calls

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd test-kanban
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
test-kanban/
├── src/
│   ├── KanbanBoard/
│   │   ├── Kanban.jsx
│   │   └── KanbanType.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
└── package.json
```

## API Integration

The project fetches data from:
```
https://mocki.io/v1/282222c9-43cf-4d92-9ba0-0e0d1447f403
```
