# Personal Portfolio Website

A modern, responsive portfolio website built with React, OGL (WebGL), and Tailwind CSS.

## Overview

This portfolio website showcases professional experience, technical skills, and projects in an interactive and visually appealing way. The website features WebGL elements powered by OGL, smooth animations using Motion, and a responsive design that works across all device sizes.

## Features

- **Interactive WebGL elements** - Tech stack visualization rendered with OGL
- **Smooth animations** - Transitions and effects powered by Motion
- **Responsive design** - Fully responsive layout that works on mobile, tablet, and desktop
- **Modern UI** - Clean interface built with Tailwind CSS
- **Light/dark theme** - Toggle between light and dark modes
- **Sections** - About, Tech, Projects, Work Experience, and Contact sections

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **OGL** - Lightweight WebGL library
- **Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Playwright** - End-to-end testing

## Project Structure

```sh
📦 personal-website
├── .github                # GitHub Actions workflows
├── tests                  # Playwright end-to-end tests
└── src                    # Source code
    ├── assets             # Images, icons, and other assets
    ├── components         # React components
    │   └── canvas         # WebGL (OGL) components
    ├── constants          # Static data (projects, experience, etc.)
    ├── fonts              # Custom fonts
    ├── hoc                # Higher-order components
    └── utils              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js and pnpm (versions pinned in `mise.toml`; run `mise install` if you use [mise](https://mise.jdx.dev))

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

Pushes to `main` are built and deployed automatically by the GitHub Actions workflow in `.github/workflows/build.yml`. The workflow runs `lint`, `format:check`, `build`, and the Playwright e2e tests; the site is only deployed if all of them pass. Pull requests run the same checks without deploying.

## Testing

```sh
pnpm run build
pnpm run test:e2e
```

The e2e tests run against the production build in `dist/`, so build first. Install browsers once with `pnpm exec playwright install`.

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

## License

This project is licensed under the MIT License. See the LICENSE file for details.
