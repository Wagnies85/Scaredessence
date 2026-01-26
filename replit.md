# Sacred Essence

## Overview

Sacred Essence is a spiritual guidance web application that provides users with personalized insights through Vedic astrology, numerology, and human design systems. The platform offers a cosmic calendar, compatibility analysis, and subscription-based premium features. Users can input their birth details to receive customized spiritual readings and sync insights to external calendars.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS v4 with custom theme variables, using the new `@tailwindcss/vite` plugin
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Typography**: Cormorant Garamond (serif) and DM Sans (sans-serif) fonts for spiritual aesthetic

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: Hot module replacement via Vite dev server proxied through Express

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - contains users and spiritual profiles tables
- **Session Storage**: PostgreSQL-backed sessions via `connect-pg-simple`
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization

### Key Design Decisions

1. **Shared Schema Pattern**: Database schema defined in `shared/` directory allows type sharing between frontend and backend, ensuring type safety across the stack.

2. **Monorepo Structure**: Single repository with `client/`, `server/`, and `shared/` directories. Build process bundles both client (Vite) and server (esbuild) into `dist/`.

3. **Premium Content Model**: The application uses a freemium model where basic features are free and advanced insights require subscription. Profile API returns `isPremium` status.

4. **Spiritual Profile System**: Users store birth date, time, and location. The system generates astrology charts, human design bodygraphs, and numerology numbers stored as JSONB.

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle ORM for type-safe database queries
- `connect-pg-simple` for session persistence

### UI/Frontend Libraries
- Radix UI primitives for accessible components
- Embla Carousel for carousel functionality
- React Day Picker for calendar components
- Lucide React for icons

### Build & Development
- Vite with React plugin and Tailwind CSS
- esbuild for server bundling (optimized for cold start times)
- Custom Vite plugins for Replit integration (dev banner, cartographer, meta images)

### Validation
- Zod for runtime validation
- `drizzle-zod` for generating Zod schemas from Drizzle table definitions
- `@hookform/resolvers` for form validation integration