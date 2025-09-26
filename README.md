# EcoLearn - Environmental Education Platform

A gamified environmental education platform that makes learning about sustainability interactive and engaging.

## 🌱 Features

- **Interactive Learning**: Engaging lessons on ecosystems, climate change, and sustainability
- **Gamification**: Points, badges, streaks, and achievements to motivate learners
- **Progress Tracking**: Monitor your learning journey with detailed progress stats
- **Leaderboards**: Compete with other learners globally
- **Beautiful UI**: Nature-themed design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

Copy `.env.example` to `.env.local` (or `.env`) and add your Supabase credentials:

```
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

These environment files are ignored by Git. Do not commit real credentials.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── Hero.tsx        # Landing page hero
│   ├── Navigation.tsx  # Site navigation
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   ├── Learn.tsx       # Learning interface
│   └── Leaderboard.tsx # Competition rankings
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 🎨 Design System

The project uses a nature-inspired design system with:
- Forest green and earth tone color palette
- Organic animations (floating, leaf-fall effects)
- Custom gradients and shadows
- Responsive design patterns

## 📱 Pages

- **Home**: Welcome page with progress overview and topic previews
- **Learn**: Interactive lessons with progress tracking
- **Leaderboard**: Global rankings and achievements

## 🌟 Development

The project is structured for easy development with:
- Hot module replacement via Vite
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for rapid styling

## 📄 License

MIT License - feel free to use this project as a foundation for your own environmental education initiatives!
