# XTREMCOL Adventure Tourism Landing Page

## Overview

XTREMCOL is a comprehensive adventure tourism booking platform for extreme sports in Guaduas, Cundinamarca, Colombia. The application is designed as a modern, conversion-focused landing page featuring ATV (cuatrimoto) and Can-Am buggy tours with multiple route options, VIP experiences, and professional video services. The system supports multilingual content (Spanish), booking management, testimonials, and availability tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built as a single-page application using React 18 with TypeScript, following a component-based architecture pattern. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized production builds. The UI framework is based on shadcn/ui components with Radix UI primitives, ensuring accessibility and consistent design patterns.

**Key Frontend Components:**
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Management**: React Hook Form with Zod validation
- **UI Components**: Custom components built on Radix UI primitives

**Design System:**
The application follows a motorsport/extreme adventure theme with a dark color scheme (black/graphite backgrounds) and accent colors (red for action, yellow for energy/alerts). The design emphasizes conversion optimization with prominent WhatsApp CTAs, trust badges, and clear pricing displays.

### Backend Architecture
The backend follows a RESTful API architecture using Express.js with TypeScript. The server implements middleware for request logging, error handling, and CORS support. The architecture separates concerns through distinct layers:

**Core Backend Components:**
- **API Layer**: Express routes handling HTTP requests/responses
- **Storage Layer**: Database abstraction through IStorage interface
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions with Zod validation

**API Endpoints:**
- `/api/routes` - Tour route management (GET, POST, PUT)
- `/api/bookings` - Reservation management (POST, GET)
- `/api/availability` - Date/time availability checking
- `/api/testimonials` - Customer testimonial management

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Neon serverless hosting. The database schema is managed through Drizzle ORM, providing type-safe database operations and automatic schema migrations.

**Database Schema Structure:**
- **Users**: Admin authentication and management
- **Routes**: Tour route definitions with pricing and descriptions
- **Bookings**: Customer reservations with payment tracking
- **Availability**: Date-based availability management
- **Testimonials**: Customer reviews and ratings

**Key Features:**
- Enum-based type safety for vehicle types, route names, and booking statuses
- Decimal precision for pricing calculations
- Array fields for route inclusions and features
- Timestamp tracking for auditing

### Authentication and Authorization
The system implements a simple user-based authentication system for administrative functions. User sessions are managed through Express sessions with PostgreSQL session storage. The authentication pattern supports admin-only operations for managing routes, bookings, and availability.

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations and schema management
- **Connect-PG-Simple**: PostgreSQL session storage for Express sessions

### Frontend Libraries
- **React Query (TanStack)**: Server state management and caching
- **Wouter**: Lightweight routing solution
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for forms and API data
- **shadcn/ui + Radix UI**: Component library with accessibility features

### Development and Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundling for production builds

### Communication Services
- **WhatsApp Business API**: Primary communication channel for bookings
- **Font Awesome**: Icon library for UI elements

### External Integrations
- **Unsplash Images**: Placeholder images for routes and gallery
- **Google Fonts**: Typography (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Replit Services**: Development environment integration and error monitoring

The application is optimized for mobile-first responsive design with particular attention to conversion optimization, fast loading times, and accessibility standards. The architecture supports easy scaling and maintenance through its modular design and type-safe implementation.