# To-Do List Web App

A responsive to-do app built with React, TypeScript, and Styled Components 
as part of a Frontend Mentor intermediate coding challenge.

🔗 **[Live Demo](https://supermollyo.github.io/to-do-app/)**
📋 **[Portfolio Page](https://mollychanel.com/projects/website/to-do-app/)**

## Overview

Built to match the design mocks and requirements from the 
[Frontend Mentor Todo App Challenge](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW) 
(Intermediate level), while adding my own enhancements — including 
drag-and-drop reordering built from scratch, accessibility improvements, 
and a light/dark theme toggle.

## Features

- Add, complete, and delete tasks
- Filter by all / active / completed
- Clear all completed tasks
- Light and dark mode toggle with smooth transition
- Drag and drop to reorder tasks
- Fully responsive (mobile and desktop)
- Hover states for all interactive elements
- Custom accessible checkbox with gradient border hover effect
- ARIA attributes throughout for keyboard and screen reader support

## What I Added Beyond the Challenge

- Built drag-and-drop reordering from scratch without an external 
  library — intentional choice to tackle the implementation myself
- Custom CSS checkbox using pseudo-elements with gradient border 
  hover effect
- ARIA attributes throughout for accessibility (`aria-pressed` on 
  filter buttons, `role="list"`, visually hidden checkbox with 
  keyboard focus state)
- Smooth light/dark theme transition
- Swapped sun/moon button placement for improved UX

## Tech Stack

- React
- TypeScript
- Styled Components
- nanoid (unique ID generation)
- Design tokens for consistent styling
- Deployed via GitHub Pages

## Author

- Website: [mollychanel.com](https://mollychanel.com)
- GitHub: [@SuperMollyo](https://github.com/SuperMollyo)

## Getting Started

### Prerequisites
- Node.js
- Yarn

### Installation

1. Clone the repo
```bash
   git clone https://github.com/SuperMollyo/to-do-app.git
```

2. Install dependencies
```bash
   yarn install
```

3. Run the development server
```bash
   yarn start
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser
