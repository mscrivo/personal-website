# Personal Portfolio Website

A modern, responsive portfolio website built with React, Three.js, and Tailwind CSS.

## Overview

This portfolio website showcases professional experience, technical skills, and projects in an interactive and visually appealing way. The website features 3D elements powered by React Three Fiber, smooth animations using Framer Motion, and a responsive design that works across all device sizes.

## Features

- **Interactive 3D elements** - Engaging 3D tech stack visualization using React Three Fiber
- **Smooth animations** - Transitions and effects powered by Framer Motion
- **Responsive design** - Fully responsive layout that works on mobile, tablet, and desktop
- **Modern UI** - Clean interface built with Tailwind CSS
- **Sections** - About, Projects, Work Experience, and Contact sections

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Project Structure

```sh
📦 personal-website
├── .github                # GitHub-specific files (workflows, dependabot config)
├── public                 # Static files
└── src                    # Source code
    ├── assets             # Images, icons, and other assets
    ├── components         # React components
    │   └── canvas         # Three.js components
    ├── constants          # Static data (projects, experience, etc.)
    ├── fonts              # Custom fonts
    ├── hoc                # Higher-order components
    └── utils              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Start development server

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```sh
npm run build
```

This will generate a production-ready build in the dist directory.

## Deployment

This project is configured with GitHub Actions for CI/CD. Pushing to the main branch will trigger the build workflow defined in build.yml.

## Linting and Formatting

```sh
npm run lint
npm run lint-fix
npm run format
npm run format:check
```

## Customization

- Update content in the index.js file to change project details, work experience, etc.
- Replace images in the assets directory
- Modify the styling by editing Tailwind configuration in tailwind.config.cjs

## Credits

- Template based on work by [Shaquille Ndunda](https://github.com/shaqdeff/Portfolio-Template)
- 3D models and animations powered by React Three Fiber and Drei

## License

This project is licensed under the MIT License
