# Overview

This is a full-stack web application built with React frontend and Express backend. The project appears to be a personal portfolio website for a PhD researcher in Electrical Engineering, featuring sections for education, research, publications, and professional activities. The application follows a modern TypeScript-based architecture with strong separation between client and server concerns.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight React router alternative)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom design tokens and dark theme support
- **Animation**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for fast production builds
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) and interface for future database integration

## Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured but not actively used - currently using in-memory storage)
- **Schema Management**: Centralized schema definitions in shared directory
- **Validation**: Drizzle-Zod integration for runtime type safety

## Authentication & Session Management
- **Session Storage**: connect-pg-simple for PostgreSQL-based session storage
- **Database Driver**: @neondatabase/serverless for serverless PostgreSQL connections

## Development & Deployment
- **Monorepo Structure**: Client and server code organized in separate directories with shared schema
- **Hot Reloading**: Vite HMR for frontend, tsx watch mode for backend
- **Build Process**: Separate build commands for client (Vite) and server (esbuild)
- **Path Aliases**: Configured TypeScript path mapping for clean imports (@/, @shared/)

# External Dependencies

## Database & Storage
- **PostgreSQL**: Primary database (configured via Drizzle)
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)

## UI & Design System
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for typography

## Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Error Handling**: Runtime error overlay for development debugging

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional className utilities
- **nanoid**: Unique ID generation
- **class-variance-authority**: Type-safe variant API for component styling