# HeartGame

**HeartGame** is a **real-time multiplayer card game** built with **React**, **TypeScript**, and **Vite**. It connects to the **[HeartServer](https://github.com/charitraa/HeartServer)** Django REST API to enable secure gameplay, user authentication, and live game sessions.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue)
![Vite](https://img.shields.io/badge/Vite-5%2B-purple)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Features

- **Real-time Multiplayer** via REST API polling & WebSocket-ready  
- **JWT Authentication** (Login, Register, Token Refresh)  
- **Game Lobby** – Create or join games   
- **Type Safety** with TypeScript  
- **Fast Development** with Vite + HMR  
- **Modular Architecture** (`src/components`, `src/api`, `src/hooks`)  

---

## Tech Stack

| Technology       | Version |
|------------------|----------|
| React            | 18+      |
| TypeScript       | 5+       |
| Vite             | 5+       |
| Tailwind CSS     | 3+       |
| Axios            | Latest   |
| React Router     | 6+       |
| Zustand / Context| —        |

---

## Project Structure
```
HeartGame/
├── public/              # Static assets
│   └── index.html
├── src/
│   ├── api/             # API calls (axios instance, endpoints)
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route pages (Login, Lobby, Game)
│   ├── store/           # State management (Zustand/Context)
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Helper functions
│   └── App.tsx
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md            # You are here!
```

---

## Prerequisites

- Node.js **18+**
- npm / yarn / pnpm
- Running **[HeartServer](https://github.com/charitraa/HeartServer)** backend

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/charitraa/HeartGame.git
cd HeartGame
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env` file in the root:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_WS_URL=ws://127.0.0.1:8000/ws
```
> Ensure **HeartServer** is running at `http://127.0.0.1:8000`

### 4. Start Development Server
```bash
npm run dev
# or
vite
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## Screenshots

![Game Lobby](/screenshots/lobby.png)
![Gameplay](/screenshots/gameplay.png)

---

## Scripts

| Command | Description |
|----------|--------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## Testing
Use **React Testing Library** or **Vitest** for unit tests.
```bash
npm run test
```

---

## Deployment
Deploy easily on **Vercel** or **Netlify**:

1. Push to GitHub  
2. Connect repo on hosting platform  
3. Add environment variable:  
   `VITE_API_BASE_URL=https://your-heartserver.com/api`  

---

## Contributing
1. Fork the repo  
2. Create a branch:  
   ```bash
   git checkout -b feature/amazing-ui
   ```
3. Commit changes:  
   ```bash
   git commit -m "Add amazing UI feature"
   ```
4. Push and open a Pull Request  

---

## Recent Updates
- ✅ 2 days ago – Integrated all API endpoints  
- ✅ 4 days ago – Project setup with Vite + TypeScript  
- ✅ 4 days ago – Added .gitignore, ESLint, Prettier  

---

## Backend
This project requires the **HeartServer** backend:  
[https://github.com/charitraa/HeartServer](https://github.com/charitraa/HeartServer)

---

## License
This project is licensed under the **MIT License** – see `LICENSE` for details.

---

## Contact
**Maintainer:** [charitraa](https://github.com/charitraa)  
**Game:** Hearts 
**Backend:** HeartServer  
**Live Demo:** Coming soon!  

---

🎮 *Let’s play Hearts!*
