<div align="center">

# 🌙 Night Space Forum

[![CI](https://github.com/Nthoel/open-space-app-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Nthoel/open-space-app-v2/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://open-space-app-v2.vercel.app)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Aplikasi Forum Diskusi dengan tema Night Space, dibangun menggunakan React dan Redux.**

[Demo Live](https://open-space-app-v2.vercel.app) · [Laporkan Bug](https://github.com/Nthoel/open-space-app-v2/issues) · [Request Fitur](https://github.com/Nthoel/open-space-app-v2/issues)

</div>

---

## 📋 Table of Contents

- [Fitur](#-fitur)
- [Tech Stack](#️-tech-stack)
- [Testing](#-testing)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 🔐 **Autentikasi** | Register & Login dengan JWT |
| 📝 **CRUD Thread** | Buat, baca, update, hapus thread |
| 💬 **Komentar** | Sistem komentar pada setiap thread |
| 👍 **Voting System** | Upvote & Downvote untuk thread dan komentar |
| 🏆 **Leaderboard** | Peringkat user berdasarkan aktivitas |
| 🏷️ **Filter Kategori** | Filter thread berdasarkan kategori |
| 🌙 **Night Space Theme** | Tema gelap yang eye-friendly |

---

## 🛠️ Tech Stack

### Core
- **React 18** - UI Library
- **Redux Toolkit** - State Management
- **React Router DOM 7** - Client-side Routing
- **Vite 5** - Build Tool & Dev Server

### Styling
- **Tailwind CSS 3** - Utility-first CSS Framework
- **PostCSS** - CSS Processing

### Testing
- **Vitest** - Unit Testing Framework
- **React Testing Library** - Component Testing
- **Cypress** - End-to-End Testing
- **Storybook** - Component Documentation

### CI/CD
- **GitHub Actions** - Continuous Integration
- **Vercel** - Deployment & Hosting

---

## 🧪 Testing

Project ini menggunakan multiple testing strategy:

### Unit Testing (Vitest)
```bash
npm run test           # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### E2E Testing (Cypress)
```bash
npm run e2e            # Run headless
npm run e2e:open       # Open Cypress GUI
```

### Component Documentation (Storybook)
```bash
npm run storybook      # Start Storybook dev server
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Nthoel/open-space-app-v2.git

# Masuk ke folder
cd open-space-app-v2

# Install dependencies
npm install --legacy-peer-deps

# Jalankan development server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

---

## 📜 Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run test` | Jalankan unit tests |
| `npm run test:coverage` | Generate coverage report |
| `npm run e2e` | Jalankan E2E tests |
| `npm run storybook` | Jalankan Storybook |
| `npm run lint` | Cek code dengan ESLint |

---

## 📁 Project Structure

```
open-space-app-v2/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI
├── .storybook/             # Storybook config
├── cypress/                # E2E tests
│   ├── e2e/
│   └── support/
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── states/             # Redux slices & store
│   ├── styles/             # Global styles
│   ├── test/               # Test setup
│   └── utils/              # Utility functions
├── package.json
├── vite.config.js
├── vitest.config.js
├── cypress.config.js
└── tailwind.config.js
```

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**Made with ❤️ by [Muhammad Fathul Barry](https://github.com/Nthoel)**

</div>
