# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OnMixer CMS is a Next.js 15 React application that serves as a Content Management System for managing broadcast networks, shows, episodes, and media content. The application uses GraphQL for data fetching and features a modular component architecture with dynamic form generation capabilities.

## Common Development Commands

```bash
# Start development server (uses Turbopack)
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Generate GraphQL types and operations
npm run compile

# Watch mode for GraphQL code generation
npm run watch

# Docker development environment
docker-compose up
```

## Architecture Overview

### Network-Based Multi-Tenancy

The application is built around a network-based architecture where content is organized by network codes:

- Routes follow pattern: `/networks/[networkCode]/*`
- NetworkContext provides network-specific state management
- All entities (shows, episodes, presenters) are scoped to networks
- Tracks and media are not scoped to a spepcifc network and are shared

### GraphQL Integration

- Apollo Client with Next.js App Router integration
- GraphQL Code Generator creates type-safe operations from schema
- Generated types live in `src/graphql/__generated__/`
- Queries in `src/graphql/queries/` and mutations in `src/graphql/mutations/`
- Always import the `gql` function from the `__generated__` directory
- GraphQL endpoint: `localhost:4000` (configurable via `NEXT_PUBLIC_GRAPHQL_URL`)

### Component Structure

```
src/components/
├── blocks/        # Reusable UI components (DataTable, Card, Button)
├── forms/         # Entity-specific forms (EpisodeForm, ShowForm, etc.)
├── pages/         # Page-level components
├── icons/         # Custom SVG icon components
└── DynamicForm/   # Dynamic form builder system
```

### Entity Relationships

- **Networks** - Root organizational unit
- **Shows** - Belong to networks, contain episodes
- **Episodes** - Individual show instances, can belong to series
- **Series** - Collections of episodes within shows
- **Presenters** - Can be assigned to shows and episodes
- **Schedule** - Templates and assignments for broadcast scheduling
- **Media** - Assets managed through upload and selection interfaces

## Key Technical Patterns

### Dynamic Form System

The `DynamicForm` component provides a flexible form builder:

- Uses React Hook Form with FormProvider
- Supports multiple field types (text, textarea, multiselect, checkbox, media)
- Type-safe field configurations
- See `src/components/DynamicForm/DynamicForm.Readme.md` for detailed usage

### Apollo Client Setup

Apollo Client is configured in `src/lib/Apollo/ApolloWrapper.tsx`:

- Client-side caching enabled
- Error handling for GraphQL operations
- Type-safe query and mutation hooks

### State Management

- **NetworkContext** - Manages current network state and switching
- **DrawerContext** - Controls drawer/modal states
- Apollo Client cache for GraphQL data
- React Hook Form for form state

### Styling System

- SCSS modules with component-scoped styles
- **@soundwaves/components** - External component library
- Utility classes for common styling patterns
- Responsive design with mobile-first approach

## Development Workflow

### Adding New Features

1. Define GraphQL operations in `src/graphql/queries/` or `src/graphql/mutations/`
2. Run `npm run compile` to generate TypeScript types
3. Create component in appropriate directory under `src/components/`
4. Add routing in `src/app/networks/[networkCode]/` as needed or in `src/app/` for none network specific entites
5. Update forms using DynamicForm system when applicable

### Working with GraphQL

- Schema changes require running `npm run compile`
- Use generated hooks like `useGetShowsQuery` and `useCreateShowMutation`
- All operations are automatically typed based on GraphQL schema
- Use `npm run watch` during development for auto-regeneration

### Component Development

- Follow existing patterns in `src/components/blocks/` for reusable components
- Use TypeScript interfaces for component props
- Implement proper error boundaries for robust UX
- Leverage DynamicForm for entity creation/editing forms

### Testing Considerations

- No specific test framework configured - check with maintainer for preferred approach
- Components use TypeScript for compile-time validation
- GraphQL operations are type-safe through code generation

## Environment Configuration

Required environment variables:

- `NEXT_PUBLIC_GRAPHQL_URL` - GraphQL API endpoint (defaults to localhost:4000)

## Deployment

- Application is containerized with multi-stage Docker build
- Optimized for Vercel deployment (not used or perffed)
- Production build uses Next.js static optimization where possible
- Self hosted in coolify using docker
