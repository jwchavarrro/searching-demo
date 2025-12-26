# Rick and Morty Character Search Demo

Una aplicación web moderna para buscar, filtrar y explorar personajes de la serie Rick and Morty. Desarrollada con React, TypeScript y GraphQL, esta demo muestra un sistema completo de búsqueda en tiempo real con filtros avanzados y gestión de favoritos.

🌐 **Demo en vivo**: [https://searching-demo.vercel.app/](https://searching-demo.vercel.app/)

## ✨ Características

### 🔍 Búsqueda y Filtrado

- **Búsqueda en tiempo real**: Búsqueda instantánea de personajes por nombre mientras escribes
- **Filtro por personaje**:
  - Todos los personajes
  - Solo favoritos (starred)
  - Otros (excluyendo favoritos)
- **Filtro por especie**:
  - Todas las especies
  - Humanos
  - Alienígenas
- **Ordenamiento dinámico**: Ordena los resultados de forma ascendente o descendente por nombre

### ⭐ Gestión de Favoritos

- Marca personajes como favoritos con un solo clic
- Los favoritos se guardan automáticamente en localStorage
- Lista separada de personajes favoritos con sus propios filtros

### 📊 Visualización

- Vista detallada de cada personaje al hacer clic
- Resumen de resultados cuando hay filtros activos
- Interfaz responsive y moderna con animaciones suaves

## 🛠️ Tecnologías

### Core

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **GraphQL** - API de Rick and Morty

### Estado y Datos

- **TanStack Query (React Query)** - Gestión de estado del servidor y caché
- **Jotai** - Estado global (favoritos en localStorage)
- **GraphQL Request** - Cliente GraphQL

### Estilos y UI

- **Tailwind CSS 4** - Framework CSS utility-first
- **Motion (Framer Motion)** - Animaciones
- **Iconify** - Iconos

### Testing y Calidad

- **Vitest** - Framework de testing
- **Testing Library** - Utilidades para testing de componentes
- **ESLint** - Linter
- **Prettier** - Formateador de código

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables (Atomic Design)
│   └── atomic-desing/
│       ├── atoms/      # Componentes básicos (Button, Input, Text, etc.)
│       └── molecules/  # Componentes compuestos (Card, Message, etc.)
├── fragments/          # Fragmentos de la aplicación
│   ├── characters-list/        # Lista principal de personajes
│   ├── characters-starred-list/ # Lista de favoritos
│   ├── details-character/      # Vista de detalles
│   ├── components/              # Componentes de fragmentos
│   │   ├── filter/             # Componente de filtros
│   │   └── sort-order/         # Componente de ordenamiento
│   ├── hooks/                  # Hooks personalizados
│   └── utils/                  # Utilidades de fragmentos
├── graphql/            # Configuración GraphQL
│   ├── queries/        # Queries GraphQL
│   ├── services/       # Servicios de API
│   └── types.ts        # Tipos TypeScript
├── hooks/              # Hooks de datos
│   ├── useCharacters.ts
│   ├── useSearchCharacters.ts
│   ├── useCharactersBySpecies.ts
│   └── useCharacterByName.ts
├── context/            # Context API
│   ├── use-characters-starred.ts  # Gestión de favoritos
│   └── use-selected-character.ts  # Personaje seleccionado
└── utils/              # Utilidades generales
```

## 🚀 Instalación

### Prerrequisitos

- **Bun** (recomendado) o **Node.js** 18+
- Git

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd searching-demo
   ```

2. **Instalar dependencias**

   ```bash
   bun install
   # o con npm
   npm install
   ```

3. **Ejecutar en desarrollo**

   ```bash
   bun run dev
   # o con npm
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
bun run dev              # Inicia el servidor de desarrollo

# Build
bun run build            # Construye la aplicación para producción
bun run preview          # Previsualiza el build de producción

# Testing
bun run test             # Ejecuta tests en modo watch
bun run test:ui          # Ejecuta tests con UI interactiva
bun run test:run         # Ejecuta tests una vez
bun run test:ci          # Ejecuta tests con coverage (CI)

# Calidad de código
bun run lint             # Ejecuta ESLint
bun run format           # Formatea código con Prettier
bun run format:check     # Verifica formato sin modificar
bun run quality-check    # Ejecuta lint + tests + build
```

## 🧪 Testing

El proyecto incluye una suite completa de tests con **Vitest** y **Testing Library**:

- **358 tests** pasando
- **83.42%** de cobertura de código
- Tests unitarios para componentes, hooks y utilidades
- Tests de integración para flujos completos

Ejecutar tests:

```bash
bun run test:ci
```

## 🏗️ Arquitectura

### Flujo de Datos

1. **Búsqueda en tiempo real**: El input de búsqueda actualiza el estado inmediatamente y usa debouncing para optimizar las peticiones
2. **Filtros avanzados**: Los filtros de personaje y especie se aplican al presionar el botón "Filter"
3. **Híbrido API/Cliente**:
   - Búsqueda por nombre → API GraphQL
   - Filtro "Human" → API GraphQL
   - Filtro "Alien" → Cliente (filtrado local)
   - Filtro de personaje → Cliente (localStorage)
4. **Ordenamiento**: Se aplica dinámicamente en el cliente sobre los resultados filtrados

### Gestión de Estado

- **TanStack Query**: Cachea y gestiona datos del servidor
- **Jotai**: Estado global para favoritos (persistido en localStorage)
- **React State**: Estado local de UI (filtros aplicados, ordenamiento)

## 🎨 Diseño

El proyecto sigue principios de **Atomic Design**:

- **Atoms**: Componentes básicos reutilizables
- **Molecules**: Componentes compuestos
- **Fragments**: Secciones completas de la aplicación

## 📦 Despliegue

La aplicación está desplegada en **Vercel** con CI/CD automático:

- **Producción**: [https://searching-demo.vercel.app/](https://searching-demo.vercel.app/)
- Cada push a `main` o `dev` dispara un build automático
- Los tests y el lint se ejecutan antes del despliegue

## 🔗 Enlaces Útiles

- **API de Rick and Morty**: [https://rickandmortyapi.com/](https://rickandmortyapi.com/)
- **Documentación GraphQL**: [https://rickandmortyapi.com/documentation/#graphql](https://rickandmortyapi.com/documentation/#graphql)
- **Vite**: [https://vite.dev/](https://vite.dev/)
- **TanStack Query**: [https://tanstack.com/query](https://tanstack.com/query)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)

## 📝 Licencia

Este proyecto es una demo educativa. Los datos de personajes pertenecen a [Rick and Morty API](https://rickandmortyapi.com/).

---

Desarrollado con ❤️ usando React, TypeScript y GraphQL
