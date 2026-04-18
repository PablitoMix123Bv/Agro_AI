# AgroSmart AI 🌿🤖

**Sistema de Riego y Gestión Agrícola Inteligente impulsado por Inteligencia Artificial y Azure Maps.**

AgroSmart AI es una solución integral diseñada para modernizar la agricultura mediante el uso de sensores, procesamiento de datos con Inteligencia Artificial, y geolocalización satelital avanzada. Este repositorio contiene el ecosistema completo estructurado como un **Monorepo** usando NPM Workspaces.

---

## ✨ Características Principales

* **🗺️ Mapeo Geográfico Dinámico:** Visualización satelital impulsada por [Azure Maps Web SDK](https://learn.microsoft.com/es-es/azure/azure-maps/) totalmente integrada en la web y la aplicación móvil. Incluye renderizado de polígonos orgánicos para simular hectáreas reales e inserciones limpias de etiquetas (A1, B2...).
* **🤖 IA Predictiva (Sugerencias):** Generación de recomendaciones ideales para ventanas de riego en base a humedad, radiación solar, ráfagas de viento y proyecciones de evaporación.
* **📱 Aplicación Móvil:** App diseñada para el uso diario en campo, construida con React Native + Expo. Permite monitoreo del rendimiento y estatus de los sensores (Ej. Higrómetro, Rayos UV).
* **💻 Dashboard Administrativo:** Interfaz gráfica para manejo centralizado a través de Vite + React. Gestiona estados de la propiedad, NDVI, promedios e historial.
* **🌐 Backend Central (IoT & API):** API en Node.js que unifica el control, la comunicación de dispositivos y despacha recursos entre interfaces.

---

## 📁 Arquitectura del Monorepo

```text
Agro_AI/
├── apps/
│   ├── mobile/          # Aplicación móvil (React Native / Expo)
│   ├── web/             # Plataforma web y Dashboard Administrativo (Vite / React)
│   └── api/             # Servidor central, base de datos y endpoints IoT (Node.js)
├── packages/
│   ├── shared-types/    # Interfaces de TypeScript compartidas (modelos de datos)
│   └── ui-constants/    # Shared Design Tokens, temas y colores constantes.
```

---

## 🚀 Empezando tu Entorno

### Configuración de Seguridad (`.env`)
AgroSmart requiere credenciales y tokens comerciales. Necesitarás tener tu suscripción a Azure Maps:
* En `apps/mobile/.env`: `EXPO_PUBLIC_AZURE_MAPS_KEY=tu_clave_de_azure_aqui`
* En `apps/web/.env`: `VITE_AZURE_MAPS_KEY=tu_clave_de_azure_aqui`

*(Importante: ¡Nunca subas tus claves de producción a git!)*

### Comandos de Instalación
En la raíz de este proyecto ejecuta la instalación masiva usando npm workspaces:

```bash
npm install
```

### Ejecutar Desarrollo
Puedes rodar el entorno completo al mismo tiempo con:

```bash
npm run dev
```

O si solo trabajas en un aspecto modular del proyecto:
- Móvil: `npm run start:mobile` (Abre el portal en Metro Bundler local)
- Web: `npm run start:web` (Inicia el HMR de Vite para Webapp)
- API: `npm run start:api` (Enciende API central para peticiones)
