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

- Node.js (v22 recommended, v18+ may work)
- pnpm

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/mscrivo/personal-website.git
   cd personal-website
   ```

2. Install dependencies

   ```sh
   pnpm install
   ```

3. Start development server

   ```sh
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```sh
pnpm run build
```

This will generate a production-ready build in the dist directory.

## Preview Production Build

```sh
pnpm run preview
```

This serves the production build locally for final checks.

## Deployment

Pushes to `main` are automatically deployed to the server via the GitHub Actions workflow in `.github/workflows/build.yml`:

1. **Build** — install deps, `lint`, `format:check`, then `pnpm run build` (output in `dist/`), uploaded as an artifact.
2. **Deploy** (only on `main`, after the build passes) — `rsync`s `dist/` over SSH into a timestamped release directory on the server (`.../site/releases/<commit-sha>/`), then atomically repoints a `current` symlink at it. The last 5 releases are kept for instant rollback.

The web server (Caddy) serves the `current` symlink, so a deploy goes live the moment the symlink is swapped — no restart needed. Because each push deploys, a broken build never reaches production: the deploy only runs if `lint`, `format:check`, and `build` all succeed.

Deployment requires these repository secrets: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, and `DEPLOY_PATH` (optionally `SSH_PORT`).

To roll back, repoint `current` at a previous release on the server:

```sh
ln -sfn releases/<old-sha> current.tmp && mv -T current.tmp current
```

## Linting and Formatting

```sh
pnpm run lint
pnpm run lint-fix
pnpm run format
pnpm run format:check
```

## Customization

- Update content in src/constants/index.js to change project details, work experience, and skills.
- Replace images and icons in src/assets.
- Modify global styling in src/index.css and PostCSS behavior in postcss.config.js.

## Credits

- Template based on work by [Shaquille Ndunda](https://github.com/shaqdeff/Portfolio-Template)
- 3D models and animations powered by React Three Fiber and Drei

## License

This project is licensed under the MIT License. See the LICENSE file for details.
