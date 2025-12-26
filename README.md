# Searching Demo - Rick and Morty Characters

Aplicación de búsqueda y filtrado de personajes de Rick and Morty desarrollada como prueba técnica.

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **GraphQL** - API de Rick and Morty
- **Tailwind CSS** - Estilos
- **React Query** - Gestión de estado del servidor
- **Jotai** - Estado global
- **React Router** - Navegación
- **Vitest** - Testing
- **Atomic Design** - Arquitectura de componentes

## 📦 Instalación

```bash
# Instalar dependencias
bun install

# Ejecutar en desarrollo
bun run dev

# Build de producción
bun run build

# Ejecutar tests
bun run test

# Quality check (lint + tests + build)
bun run quality-check
```

## ✨ Características

- 🔍 Búsqueda de personajes por nombre
- 🎯 Filtros por especie y estado (starred/others)
- ⭐ Sistema de favoritos (starred characters)
- 📱 Diseño responsive
- 🧪 Cobertura de tests: ~77%
- 🎨 Componentes reutilizables con Atomic Design

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes UI (Atomic Design)
├── fragments/          # Fragmentos de funcionalidad
├── hooks/              # Custom hooks
├── context/            # Estado global (Jotai)
├── graphql/            # Queries y servicios GraphQL
└── utils/              # Utilidades
```

## 🧪 Testing

- **350 tests** pasando
- **Vitest** + **Testing Library**
- Cobertura de código incluida

## 📝 Scripts Disponibles

- `dev` - Servidor de desarrollo
- `build` - Build de producción
- `test` - Ejecutar tests
- `test:ci` - Tests con cobertura
- `lint` - Linter
- `format` - Formatear código
- `quality-check` - Verificación completa (lint + tests + build)
