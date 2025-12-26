# 🚀 Rick and Morty Character Search - Technical Demo

A production-ready React application demonstrating advanced frontend engineering practices, including real-time search, complex filtering, state management, and comprehensive testing.

🌐 **Live Demo**: [https://searching-demo.vercel.app/](https://searching-demo.vercel.app/)

## 📋 Overview

This application showcases a complete character search and filtering system built with modern React patterns. It implements a hybrid client/server-side filtering strategy, real-time search with debouncing, persistent state management, and a fully tested codebase with 83.42% code coverage.

## 🛠️ Technical Stack

### ⚛️ Core Technologies

- **⚛️ React 19** - Latest React with concurrent features
- **📘 TypeScript 5.9** - Strict type checking with full type safety
- **⚡ Vite 7** - Next-generation build tool with SWC compiler
- **🔷 GraphQL** - Type-safe API integration

### 🔄 State Management

- **🔄 TanStack Query v5** - Server state management with intelligent caching
  - ⏱️ Configurable stale time (5 minutes)
  - 🔀 Automatic request deduplication
  - 🔄 Background refetching
- **⚛️ Jotai** - Atomic state management for client-side state
  - 💾 Persistent storage via `atomWithStorage`
  - ⚡ Minimal re-renders through atomic updates

### 🎨 UI & Styling

- **🎨 Tailwind CSS 4** - Utility-first CSS with JIT compilation
- **✨ Motion (Framer Motion)** - Performance-optimized animations
- **🎯 Iconify** - Icon system with tree-shaking support

### 🧪 Testing & Quality

- **✅ Vitest** - Fast unit testing framework
- **🧪 Testing Library** - Component testing best practices
- **🔍 ESLint** - Code quality enforcement
- **💅 Prettier** - Consistent code formatting
- **📝 TypeScript ESLint** - Type-aware linting rules

## 🏗️ Architecture & Design Patterns

### 📦 Separation of Concerns

The codebase follows a clear separation of concerns:

```
src/
├── components/          # Reusable UI components (Atomic Design)
│   └── atomic-desing/
│       ├── atoms/      # Primitive components (Button, Input, etc.)
│       └── molecules/  # Composite components (Card, Message, etc.)
├── fragments/          # Feature-specific modules
│   ├── characters-list/
│   ├── characters-starred-list/
│   ├── details-character/
│   ├── components/     # Feature-specific components
│   ├── hooks/          # Feature-specific hooks
│   └── utils/          # Feature utilities
├── hooks/              # Data fetching hooks (separation from UI)
│   ├── useCharacters.ts
│   ├── useSearchCharacters.ts
│   ├── useCharactersBySpecies.ts
│   └── useCharacterByName.ts
├── graphql/            # API layer abstraction
│   ├── queries/        # GraphQL query definitions
│   ├── services/       # API service functions
│   └── types.ts        # Shared TypeScript types
├── context/            # Global state (minimal, focused)
└── utils/              # Shared utilities
```

### 🎯 Key Architectural Decisions

#### 1. **🔀 Hybrid Filtering Strategy**

Implemented a smart filtering approach that balances API efficiency with client-side flexibility:

- **🌐 API-side filtering**: Used for operations that reduce payload size
  - 🔍 Name search → GraphQL query with filter parameter
  - 👤 Species filter (Human) → GraphQL query with species filter
- **💻 Client-side filtering**: Used for operations that don't benefit from API filtering
  - 👽 Species filter (Alien) → Filter all results client-side
  - ⭐ Character filter (Starred/Others) → Filter based on localStorage state
  - 🔄 Sort order → Always client-side for instant feedback

**💡 Rationale**: Reduces unnecessary API calls while maintaining responsive UI interactions.

#### 2. **🪝 Custom Hooks for Data Fetching**

Each data fetching operation is encapsulated in its own hook:

- `useCharacters` - 📋 Fetches all characters
- `useSearchCharacters` - 🔍 Handles search with debouncing
- `useCharactersBySpecies` - 🧬 Fetches filtered by species
- `useCharacterByName` - 👤 Fetches single character details

**✨ Benefits**:

- ✅ Single Responsibility Principle
- 🧪 Easy to test in isolation
- ♻️ Reusable across components
- 🔀 Clear separation between data fetching and UI logic

#### 3. **🧩 Composition Pattern for Filtering**

The `useFilteredCharacters` hook orchestrates multiple filtering strategies:

```typescript
// Determines which query to use based on active filters
if (hasSearch) {
  activeQuery = searchQuery
} else if (shouldUseSpeciesQuery) {
  activeQuery = charactersBySpeciesQuery
} else {
  activeQuery = charactersQuery
}

// Applies client-side filters over fetched data
const filteredCharacters = useMemo(() => {
  // ... filtering logic
}, [dependencies])
```

**✨ Benefits**:

- 🎯 Centralized filtering logic
- 🔧 Easy to extend with new filter types
- 📊 Predictable data flow

#### 4. **⚛️ Atomic Design System**

Component architecture follows Atomic Design principles:

- **🔷 Atoms**: Basic building blocks (Button, Input, Text, Avatar)
- **🧬 Molecules**: Composed components (Card, Message, Popover)
- **📦 Fragments**: Complete feature sections

**✨ Benefits**:

- ♻️ High reusability
- 🎨 Consistent design system
- 🔧 Easy to maintain and extend

### 🔄 State Management Strategy

#### 🌐 Server State (TanStack Query)

- 💾 Automatic caching with configurable stale time
- 🔀 Request deduplication
- 🔄 Background updates
- ⚡ Optimistic updates support (ready for future features)

#### 💻 Client State (Jotai + React State)

- **⚛️ Jotai**: Global state that needs persistence
  - ⭐ Starred characters (localStorage)
  - ⚡ Atomic updates prevent unnecessary re-renders
- **⚛️ React State**: Local UI state
  - 🔍 Applied filters
  - 🔄 Sort order
  - ⌨️ Search input value

**💡 Rationale**: Clear distinction between server and client state prevents confusion and improves maintainability.

### ⚡ Performance Optimizations

1. **⏱️ Debounced Search**: 300ms debounce prevents excessive API calls
2. **💾 Memoization**: Strategic use of `useMemo` for expensive computations
3. **🔄 Query Caching**: TanStack Query caches responses, reducing redundant requests
4. **📦 Code Splitting**: Vite automatically code-splits for optimal bundle size
5. **⚡ SWC Compiler**: Faster builds and smaller bundles

### 🛡️ Type Safety

Full TypeScript coverage with strict mode enabled:

- ✅ All API responses are typed
- ✅ Component props are strictly typed
- ✅ Custom hooks return typed interfaces
- 🚫 No `any` types used
- 🔒 Type-safe constants with `as const satisfies`

Example:

```typescript
export const SpecieFilterValues = {
  ALL: 'all',
  HUMAN: 'human',
  ALIEN: 'alien',
} as const satisfies Record<string, SpecieFilterType>
```

## 🧪 Testing Strategy

### 📊 Test Coverage

- ✅ **358 tests** passing
- 📈 **83.42%** code coverage
- 💯 **100%** coverage on critical utilities and hooks

### 🎯 Testing Approach

1. **🔬 Unit Tests**: Individual components, hooks, and utilities
2. **🔗 Integration Tests**: Component interactions and data flows
3. **🎭 Mock Strategy**: Proper mocking of external dependencies (API, localStorage)

### 📁 Test Organization

```
src/
├── components/**/__tests__/     # Component tests
├── hooks/__tests__/             # Hook tests
├── fragments/**/__tests__/       # Feature tests
└── test/setup.ts                 # Test configuration
```

## 🚀 Development Workflow

### 📋 Prerequisites

- **🍞 Bun** (recommended) or **🟢 Node.js** 18+
- **📦 Git**

### ⚙️ Setup

```bash
# Clone repository
git clone <repository-url>
cd searching-demo

# Install dependencies
bun install

# Start development server
bun run dev
```

### 📜 Available Scripts

```bash
# 🛠️ Development
bun run dev              # Start dev server with HMR

# 🏗️ Build
bun run build            # Production build with type checking
bun run preview          # Preview production build

# 🧪 Testing
bun run test             # Watch mode
bun run test:ui          # Interactive UI
bun run test:ci          # CI mode with coverage

# ✅ Code Quality
bun run lint             # ESLint check
bun run format          # Prettier format
bun run format:check     # Check formatting
bun run quality-check    # Full quality pipeline (lint + test + build)
```

## 🔄 CI/CD Pipeline

Automated quality checks via GitHub Actions:

- **🔍 Linting**: ESLint validation on every push
- **🧪 Testing**: Full test suite with coverage reporting
- **🏗️ Build**: Type checking and production build verification
- **🚀 Deployment**: Automatic deployment to Vercel on successful builds

## ✅ Code Quality Standards

### 📘 TypeScript Configuration

- ✅ Strict mode enabled
- 🚫 No unused locals/parameters
- 🚫 No implicit any
- ✅ Strict null checks

### 🔍 ESLint Rules

- ⚛️ React Hooks rules enforced
- 📘 TypeScript-aware linting
- 💅 Prettier integration
- 📦 Import organization

### 📁 Code Organization

- 📝 Consistent file naming (kebab-case)
- 🔀 Clear separation of concerns
- ♻️ DRY principle applied
- ✅ Single Responsibility Principle

## 🎯 Key Features Implementation

### 🔍 Real-time Search

- ⏱️ Debounced input (300ms)
- ⚡ Immediate UI feedback
- 🚀 API query optimization
- 🎯 Client-side "starts with" filtering for exact matches

### 🔀 Advanced Filtering

- 🔗 Multiple filter types working in combination
- 📊 Filter state management
- 👁️ Visual filter summary
- 💾 Persistent filter preferences (via URL params, ready for implementation)

### ⭐ Favorites Management

- 💾 localStorage persistence via Jotai
- ⚡ Atomic state updates
- ⚡ Optimistic UI updates
- 📋 Separate filtered list for favorites

### 🔄 Dynamic Sorting

- ⚡ Client-side sorting for instant feedback
- 🔗 Shared sort state across lists
- ♻️ Reusable sorting utility
- 🛡️ Type-safe sort order management

## 🔌 API Integration

### 🔷 GraphQL Client

- 🎯 Centralized client configuration
- 🛡️ Type-safe queries
- ⚠️ Error handling
- 🔧 Request/response interceptors ready

### 📊 Query Strategy

- 🔀 Separate queries for different use cases
- 🔑 Query key management for proper caching
- ⚡ Conditional query execution
- 🚀 Optimized query selection based on filters

## 🌐 Browser Support

- 🌍 Modern browsers (ES2022+)
- 📱 Responsive design (mobile-first)
- ♿ Accessibility considerations
- ⚡ Performance optimized for low-end devices

## 🔮 Future Enhancements (Ready for Implementation)

- 🔗 URL parameter synchronization for filters
- ♾️ Infinite scroll pagination
- 🔍 Advanced filtering options
- 📤 Export functionality
- 🔗 Shareable filter links

## 📊 Project Metrics

- **📁 Total Files**: 100+ TypeScript/TSX files
- **🧪 Test Files**: 27 test suites
- **🧩 Components**: 15+ reusable components
- **🪝 Custom Hooks**: 8 custom hooks
- **📈 Code Coverage**: 83.42%
- **📦 Build Size**: Optimized with code splitting

## 📚 References

- **🔷 API**: [Rick and Morty GraphQL API](https://rickandmortyapi.com/documentation/#graphql)
- **🔄 React Query**: [TanStack Query Docs](https://tanstack.com/query/latest)
- **⚛️ Jotai**: [Jotai Documentation](https://jotai.org/)
- **⚡ Vite**: [Vite Documentation](https://vite.dev/)

---

💡 **Note**: This is a technical demonstration project showcasing modern React development practices, architectural patterns, and code quality standards.
