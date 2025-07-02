# 🎌 Anime Explorer

Una aplicación web moderna para explorar animes de Attack on Titan y Jujutsu Kaisen, construida con Vue 3, TypeScript y siguiendo los lineamientos de arquitectura modular para frontend B2B.

## ✨ Características

- **Arquitectura Modular**: Implementación completa de los lineamientos de arquitectura modular
- **API de Anime**: Integración con Jikan API (MyAnimeList) para datos reales
- **Gestión de Estado**: Pinia para manejo de estado global
- **TypeScript**: Tipado completo para mejor desarrollo
- **Diseño Responsivo**: Interfaz moderna y adaptable
- **Búsqueda en Tiempo Real**: Búsqueda con debounce
- **Sistema de Favoritos**: Guardado local de animes favoritos
- **Paginación**: Navegación eficiente entre páginas

## 🏗️ Arquitectura del Proyecto

```
src/
├── shared/                 # Recursos compartidos
│   ├── components/        # Componentes reutilizables
│   ├── composables/       # Composables globales
│   ├── constants/         # Constantes globales
│   ├── types/            # Tipos TypeScript globales
│   └── utils/            # Utilidades globales
├── modules/              # Módulos de la aplicación
│   └── anime/           # Módulo de anime
│       ├── components/   # Componentes específicos del módulo
│       ├── composables/  # Composables del módulo
│       ├── pages/        # Páginas del módulo
│       ├── routes.ts     # Rutas del módulo
│       ├── services/     # Servicios y APIs
│       ├── stores/       # Stores de Pinia
│       └── types/        # Tipos específicos del módulo
├── router/              # Configuración de rutas
└── main.ts             # Punto de entrada
```

## 🚀 Tecnologías Utilizadas

- **Vue 3** - Framework progresivo
- **TypeScript** - Tipado estático
- **Pinia** - Gestión de estado
- **Vue Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Vite** - Build tool
- **Jikan API** - API de MyAnimeList

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd anime-explorer
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   # o
   yarn build
   ```

## 🎯 Lineamientos de Arquitectura Modular Implementados

### ✅ Estructura de Módulos
- Cada módulo tiene su propia estructura completa
- Separación clara de responsabilidades
- Componentes específicos por módulo

### ✅ Recursos Compartidos
- Directorio `shared/` con componentes reutilizables
- Utilidades y constantes globales
- Tipos TypeScript organizados

### ✅ Gestión de Estado
- Stores de Pinia por módulo
- Estado local y global bien definido
- Composables para lógica reutilizable

### ✅ Servicios y APIs
- Servicios organizados por módulo
- Interceptores de Axios configurados
- Manejo de errores centralizado

### ✅ Enrutamiento Modular
- Rutas definidas por módulo
- Lazy loading de componentes
- Navegación optimizada

### ✅ Tipos TypeScript
- Tipos específicos por módulo
- Interfaces bien definidas
- Reutilización de tipos comunes

## 🎨 Componentes Principales

### BaseCard
Componente reutilizable para mostrar tarjetas de anime con:
- Imagen con fallback
- Información básica
- Sistema de rating
- Géneros con colores
- Estados de carga

### AnimeGrid
Grid responsivo para mostrar múltiples animes con:
- Paginación
- Estados de carga y error
- Búsqueda y filtros

### AnimeDetail
Página de detalle completa con:
- Hero section con imagen de fondo
- Información detallada
- Estadísticas
- Sistema de favoritos

## 🔧 Configuración

### Variables de Entorno
```env
VITE_API_BASE_URL=https://api.jikan.moe/v4
```

### Aliases de TypeScript
```json
{
  "@modules": "./src/modules",
  "@shared": "./src/shared"
}
```

## 📱 Funcionalidades

### Búsqueda y Filtros
- Búsqueda en tiempo real con debounce
- Filtros por popularidad, temporada actual, etc.
- Paginación eficiente

### Gestión de Favoritos
- Agregar/quitar animes de favoritos
- Persistencia local
- Interfaz intuitiva

### Información Detallada
- Sinopsis completa
- Estadísticas de popularidad
- Información de producción
- Géneros y clasificaciones

## 🎯 API Endpoints Utilizados

- `GET /anime` - Lista de animes
- `GET /anime/{id}` - Detalle de anime
- `GET /top/anime` - Animes populares
- `GET /seasons/now` - Temporada actual
- `GET /anime/{id}/recommendations` - Recomendaciones

## 🚀 Despliegue

### Netlify
```bash
npm run build
# Subir carpeta dist/ a Netlify
```

### Vercel
```bash
npm run build
# Conectar repositorio a Vercel
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Jikan API](https://jikan.moe) por proporcionar acceso a los datos de MyAnimeList
- [Vue.js](https://vuejs.org) por el excelente framework
- [Pinia](https://pinia.vuejs.org) por la gestión de estado
- [Vite](https://vitejs.dev) por las herramientas de desarrollo

---

Desarrollado con ❤️ siguiendo los mejores lineamientos de arquitectura modular para frontend B2B.
