# QuickEats Food Delivery Application

## Overview

QuickEats is a modern food delivery application built with a full-stack TypeScript architecture. The application features a React frontend with a shadcn/ui component library, an Express.js backend, and PostgreSQL database integration through Drizzle ORM. The system allows users to browse restaurants, view menus, add items to cart, place orders, and track delivery status.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui with Radix UI primitives and Tailwind CSS
- **State Management**: React Context for cart management, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for restaurants, menu items, and orders
- **Request Logging**: Custom middleware for API request/response logging
- **Error Handling**: Centralized error handling middleware

### Data Storage Solutions
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM for type-safe database operations
- **Development Storage**: In-memory storage implementation for development/testing
- **Connection**: Neon Database serverless PostgreSQL connection
- **Migrations**: Drizzle Kit for database schema migrations

## Key Components

### Database Schema
- **Restaurants**: Store restaurant information including name, cuisine, ratings, delivery details
- **Menu Items**: Restaurant-specific menu items with categories, pricing, and availability
- **Orders**: Complete order tracking with customer details, items, pricing, and status

### API Endpoints
- `GET /api/restaurants` - Fetch all restaurants
- `GET /api/restaurants/:id` - Get specific restaurant details
- `GET /api/restaurants/:id/menu` - Get menu items for a restaurant
- `POST /api/orders` - Create new order
- `GET /api/orders/number/:orderNumber` - Track order by order number

### Frontend Components
- **Restaurant Discovery**: Restaurant cards with ratings, delivery time, and pricing
- **Menu Management**: Categorized menu items with add-to-cart functionality
- **Cart System**: Persistent cart with quantity management and checkout flow
- **Order Tracking**: Real-time order status updates with progress indicators

## Data Flow

1. **Restaurant Discovery**: Users browse restaurants fetched from the API
2. **Menu Browsing**: Restaurant selection loads menu items via API
3. **Cart Management**: Items added to cart are stored in React context
4. **Order Placement**: Cart contents and delivery details submitted to orders API
5. **Order Tracking**: Order status updates retrieved via order number lookup

The application uses a unidirectional data flow pattern with TanStack Query managing server state caching and synchronization.

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **wouter**: Lightweight routing solution
- **tailwindcss**: Utility-first CSS framework
- **date-fns**: Date manipulation utilities

### Backend Dependencies
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **zod**: Runtime type validation
- **express**: Web application framework

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **drizzle-kit**: Database migration tool

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:
- **Development**: `npm run dev` runs both frontend and backend concurrently
- **Production Build**: `npm run build` creates optimized client build and bundles server
- **Production Start**: `npm run start` serves the production application
- **Database**: PostgreSQL provisioned through Replit's database service
- **Port Configuration**: Server runs on port 5000, mapped to external port 80
- **Static Assets**: Client build served from `dist/public` directory

The deployment uses autoscale configuration for handling variable traffic loads.

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
- June 14, 2025. Added clear search functionality and fixed Mexican cuisine image display
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```