# AgroSmart AI 🌿🤖

Sistema de riego inteligente impulsado por Inteligencia Artificial para agricultura. Este repositorio contiene todo el código del sistema (Mobile, Web, API) estructurado como un Monorepo usando NPM Workspaces.

## 📁 Estructura del Proyecto

- `apps/mobile`: Aplicación móvil (React Native + Expo) para agricultores.
- `apps/web`: Dashboard web (React + Vite) para administración central.
- `apps/api`: Backend central (Node.js) que gestiona IoT, IA y base de datos.
- `packages/shared-types`: Interfaces y tipos comunes (TypeScript).
- `packages/ui-constants`: Constantes de diseño (colores, tipografías) compartidas entre Web y Mobile.

## 🚀 Cómo empezar

1. Instala las dependencias globales del proyecto:
   ```bash
   npm install
   ```

2. Para iniciar todas las aplicaciones en modo desarrollo:
   ```bash
   npm run dev
   ```

O puedes iniciar cada servicio de forma individual:
- `npm run start:mobile`
- `npm run start:web`
- `npm run start:api`
