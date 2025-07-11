# Lineamientos de Arquitectura Modular para el Frontend B2B

**Última actualización**: Julio 9 2025  
**Autor actualización**: Anderson Mesa  
**Autor**: Andersson Mesa  
**Responsable**: Equipo de Desarrollo  
**Versión**: 1.0.0 

## Tabla de Contenido

### [Sección 1: Visión General](#sección-1-visión-general)
- [Nuestra Arquitectura: Una Fusión de Mejores Prácticas](#nuestra-arquitectura-una-fusión-de-mejores-prácticas)
  - [Arquitectura Modular por Dominios](#1-arquitectura-modular-por-dominios)
  - [Atomic Design Adaptado](#2-atomic-design-adaptado)
  - [Separación SCF (Script-Component-File)](#3-separación-scf-script-component-file)
  - [Estructura Flat Inteligente](#4-estructura-flat-inteligente)
  - [Core y Shared Centralizados](#5-core-y-shared-centralizados)
- [Beneficios Estratégicos](#beneficios-estratégicos)
- [Objetivo Principal](#objetivo-principal)

### [Sección 2: Principios de la Arquitectura Modular](#sección-2-principios-de-la-arquitectura-modular)
- [Encapsulación y Cohesión](#21-encapsulación-y-cohesión)
- [El Módulo `shared` (Centralización de recursos compartidos)](#22-el-módulo-shared-centralización-de-recursos-compartidos)
- [Dependencias y la API Pública (`index.ts`)](#23-dependencias-y-la-api-pública-indexts)

### [Sección 3: Estructura Plana Inteligente](#sección-3-estructura-plana-inteligente)
- [Organización de Componentes](#31-organización-de-componentes)
- [Organización de Composables](#32-organización-de-composables)
- [Reglas de Nomenclatura](#33-reglas-de-nomenclatura)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Estructura General del Proyecto (`src`)](#estructura-general-del-proyecto-src)
- [Beneficios de la Estructura Plana Inteligente](#34-beneficios-de-la-estructura-plana-inteligente)

### [Sección 4: Gestión de Estado Local Complejo](#sección-4-gestión-de-estado-local-complejo-patrón-provideinject)

### [Sección 5: Convenciones de Nomenclatura de Archivos](#sección-5-convenciones-de-nomenclatura-de-archivos)
- [Reglas Específicas de Nomenclatura](#reglas-específicas-de-nomenclatura)

### [Sección 7: Gestión de la Capa de API](#sección-7-gestión-de-la-capa-de-api)
- [Instancia Global de Axios (`core/api`)](#71-instancia-global-de-axios-coreapi)
- [Patrón Either para Manejo de Errores (`core/either`)](#72-patrón-either-para-manejo-de-errores-coreeither)
- [Servicios por Módulo (`modules/.../services`)](#73-servicios-por-módulo-modulesservices)
- [Ventajas de esta Arquitectura](#74-ventajas-de-esta-arquitectura)

### [Sección 8: Gestión de Estilos (CSS)](#sección-8-gestión-de-estilos-css)
- [Jerarquía de Estilos](#81-jerarquía-de-estilos)
- [Estructura de Archivos de Estilos](#82-estructura-de-archivos-de-estilos)
- [Convenciones de Nomenclatura](#83-convenciones-de-nomenclatura)
- [Reglas de Importación](#84-reglas-de-importación)
- [Ejemplo de Implementación](#85-ejemplo-de-implementación)
- [Ventajas de esta Arquitectura](#86-ventajas-de-esta-arquitectura)

### [Sección 9: Gestión de Dependencias Externas](#sección-9-gestión-de-dependencias-externas)
- [Librerías Reutilizables (Patrón `shared`)](#91-librerías-reutilizables-patrón-shared)
- [Plugins y Estilos Globales (Patrón `core`)](#92-plugins-y-estilos-globales-patrón-core)

### [Sección 10: Testing](#sección-10-testing)
- [Filosofía de Testing](#101-filosofía-de-testing)
- [Estructura de Testing](#102-estructura-de-testing)
- [Tipos de Pruebas](#103-tipos-de-pruebas)
- [Convenciones de Nomenclatura](#104-convenciones-de-nomenclatura)
- [Principios de Testing](#105-principios-de-testing)
- [Configuración Global](#106-configuración-global)

---

## Sección 1: Visión General

En el desarrollo de aplicaciones frontend modernas, la complejidad crece exponencialmente con el tamaño del proyecto. Nos enfrentamos a desafíos como código disperso, dependencias complejas, dificultades de testing y una curva de aprendizaje elevada para nuevos desarrolladores. Para superar estos obstáculos y construir una plataforma escalable y mantenible, hemos adoptado una **arquitectura híbrida moderna** que combina los mejores principios de múltiples enfoques.

### Nuestra Arquitectura: Una Fusión de Mejores Prácticas

Nuestra arquitectura es el resultado de años de experiencia y evolución, combinando:

#### **1. Arquitectura Modular por Dominios**
Cada funcionalidad de negocio se encapsula en su propio módulo independiente. Esto permite que diferentes equipos trabajen en paralelo sin conflictos, acelera el desarrollo y facilita el mantenimiento.

#### **2. Atomic Design Adaptado**
Hemos adaptado los principios de Atomic Design con una nomenclatura más intuitiva:
- **Components** → Átomos: Lógica básica y componentes simples
- **Sections** → Organismos: Unificación de múltiples componentes
- **Views** → Templates: Organización de varias secciones
- **Pages** → Páginas: Las páginas reales de la aplicación

#### **3. Separación SCF (Script-Component-File)**
Para mejorar la testabilidad y mantenibilidad, cada componente se divide en tres archivos:
- **`index.vue`**: Template y estructura
- **`use[Component].ts`**: Lógica reactiva y composables
- **`[component].styles.scss`**: Estilos específicos

#### **4. Estructura Flat Inteligente**
Evitamos anidamientos excesivos que complican la navegación. Todos los archivos de un mismo tipo (pages, sections, components, views, types, stores, services, errors) se mantienen al mismo nivel dentro del módulo.

#### **5. Core y Shared Centralizados**
- **`core/`**: Lógica estructural global (router, API, plugins)
- **`shared/`**: Módulos y componentes reutilizables entre dominios

#### **Beneficios Estratégicos**

La arquitectura híbrida implementada en este proyecto aporta ventajas técnicas clave, alineadas con las mejores prácticas y las reglas arquitectónicas definidas:

- **Mantenibilidad**: Los cambios y errores se aíslan dentro de sus respectivos módulos, facilitando la corrección y evolución del sistema.
- **Escalabilidad**: Las nuevas funcionalidades se desarrollan como módulos independientes, permitiendo el crecimiento del proyecto sin afectar otras áreas.
- **Testabilidad**: La separación SCF simplifica la creación de pruebas unitarias y de integración, mejorando la calidad del software.
- **Colaboración**: La estructura modular permite que varios equipos trabajen en paralelo sin generar conflictos ni dependencias innecesarias.
- **Predictibilidad**: Una estructura consistente y estandarizada reduce la curva de aprendizaje y facilita la incorporación de nuevos desarrolladores.
- **Rendimiento**: La modularidad favorece la implementación de lazy loading y otras optimizaciones, mejorando la eficiencia de la aplicación.

#### **Objetivo Principal**

Transformar nuestra base de código en un **sistema de módulos cohesivos e independientes** que acelere la entrega de valor, reduzca costos de mantenimiento y construya una plataforma escalable que soporte el crecimiento del negocio a largo plazo.

## **Sección 2: Principios de la Arquitectura Modular**

Adoptar una arquitectura modular es una decisión estratégica que impacta directamente en la salud y evolución del proyecto. Este enfoque aporta beneficios clave para el desarrollo:

- **Mantenibilidad:** Al encapsular la lógica de negocio en módulos, los errores y cambios quedan aislados. Así, corregir un bug en el módulo de `exchange` no pone en riesgo el de `authentication`.
- **Escalabilidad y crecimiento:** Las nuevas funcionalidades se implementan como módulos independientes y aislados, permitiendo que equipos distintos trabajen en paralelo sin conflictos y acelerando la entrega de valor.
- **Predictibilidad:** Al seguir todos los módulos la misma estructura y reglas, cualquier desarrollador puede orientarse rápidamente en un módulo desconocido, reduciendo la curva de aprendizaje y aumentando la velocidad de desarrollo.

### 2.1. Encapsulación y Cohesión

Cada módulo debe ser una unidad de software independiente y cohesiva, responsable de un único dominio de negocio.

- **Todo dentro de su módulo:** Componentes, stores, tipos, servicios, errores y rutas deben residir dentro del módulo al que pertenecen.
- **Minimizar dependencias:** Un módulo solo debe depender de `shared` para reutilizar módulos o utilidades compartidas, o de forma muy controlada, de otros módulos a través de su API Pública (`index.ts`).
- **Alta cohesión interna, bajo acoplamiento externo:** Los elementos dentro de un módulo deben estar fuertemente relacionados. Las conexiones entre módulos deben ser mínimas y explícitas.

### 2.2. El Módulo `shared` (Centralización de recursos compartidos)

El módulo `shared` es el espacio donde se centralizan los recursos, componentes y utilidades que son **reutilizables entre varios features** o dominios de negocio, pero que **no pertenecen a ninguno en particular**. Su objetivo es evitar duplicidad y promover la reutilización efectiva en toda la aplicación.

- **¿Qué va en `shared`?**
    - Componentes de UI genéricos que no están en la librería de UI del Design System y se usan en 3 o más módulos.
    - Funciones utils universales (por ejemplo, `formatDate`, `formatCurrency`).
    - Tipos e interfaces genéricos.
    - Stores de Pinia para el estado global de la aplicación (por ejemplo, `notificationsStore`).
- **Regla de oro:** Si tienes dudas, mantenlo dentro del módulo específico. Solo trasládalo a `shared` cuando la reutilización en un tercer módulo sea evidente.

### 2.3. Dependencias y la API Pública (`index.ts`)

Para mantener el orden y un bajo acoplamiento, la comunicación entre módulos debe seguir una regla estricta: **un módulo NO debe importar archivos internos de otro módulo**.

Toda importación debe hacerse a través del archivo `index.ts` del módulo de destino. Este archivo funciona como la **"API Pública"** o fachada del módulo: define explícitamente qué funciones, componentes o tipos se exponen al resto de la aplicación. Todo lo que no se exporte en este archivo se considera privado y no debe ser accesible desde fuera del módulo.

## **Sección 3: Estructura Plana Inteligente**

Para evitar el anidamiento excesivo que genera desorden y problemas conflictivos, adoptamos una estructura plana pero inteligente. Cada módulo mantiene sus carpetas principales (`components/`, `pages/`, `composables/`, `utils/`, etc.) al mismo nivel, evitando subcarpetas innecesarias.

### **3.1. Organización de Componentes**

**Estructura de Archivos por Componente (SCF Pattern):**
Cuando se crea un componente, todos sus archivos relacionados se mantienen juntos para preservar la cohesión:

```
components/
├── AnimeListItem/
│   ├── index.vue
│   ├── useAnimeListItem.ts
│   └── animeListItem.styles.scss
├── SearchButtonClear/
│   ├── index.vue
│   ├── useSearchButtonClear.ts
│   └── searchButtonClear.styles.scss
```
**Nomenclatura y estructura del Componentes:**
- **Regla**: Los nombres deben comenzar con las palabras de nivel más alto y terminar con modificadores descriptivos
- **Patrón**: `[Componente]`  ||  `[Componente][Contexto]`  ||  `[Componente][Contexto][Modificador]`
- **Ejemplos**: `AnimeListItem/`, `SearchButtonClear/`, `SettingsCheckboxLaunchOnStartup/`

- **`index.vue`**: Capa de Presentación (`.vue`) su única responsabilidad es mostrar la interfaz y capturar las interacciones del usuario. No contiene lógica de negocio compleja. No se debe hacer cálculos en el template
- **`use[Component].ts`**: Capa de Lógica y Estado (`use[contexto].ts`) Cada componente que necesite tener lógica lo debe separar en un composable con el prefijo use y con el nombre del componente.vue. Su responsabilidad es manejar el estado reactivo, la lógica de negocio y orquestar las llamadas a los servicios.
- **`[component].styles.scss`**: Exclusivamente los estilos específicos del componente
- Aunque `props` y `emits` sus tipos de datos están definidos en los types. La instancia debe esta en el archivos.vue
- Si un componente necesita exportar su información se debe usar `defineExpose`

### **3.2. Organización de Composables**

Los composables se organizan en la carpeta `composables/` del módulo con nomenclatura específica:

**Composables Específicos de Componente:**
El composable principal del componente (`use[Component].ts`) se mantiene en la misma carpeta que el componente. Sin embargo, cuando se requiere separar lógica adicional en composables específicos, se debe seguir el siguiente patrón:
- **Patrón**: `use[Componente][Funcionalidad].ts`
- **Ejemplo**: `useAnimeListItemFavorite.ts` (para funcionalidad de favoritos del componente AnimeListItem)

**Composables Globales del Módulo:**
- **Patrón**: `use[Funcionalidad].ts`
- **Ejemplo**: `useAnimeFilter.ts` (para filtrado general de anime en todo el módulo)

### **3.3. Reglas de Nomenclatura**

**Componentes Relacionados:**
- **Agrupación por contexto**: Componentes que trabajan juntos deben tener nombres relacionados
- **Ejemplo**: `TodoList.vue`, `TodoListItem.vue`, `TodoListItemButton.vue`

**Orden de Palabras:**
- **Incorrecto**: `ClearSearchButton.vue`, `ExcludeFromSearchInput.vue`
- **Correcto**: `SearchButtonClear.vue`, `SearchInputExclude.vue`

**Para Otros Tipos de Archivos:**
- **Tipos e Interfaces**: Pueden agruparse en un mismo archivo cuando comparten el mismo contexto o dominio (ej. `user.types.ts` puede contener `User`, `UserProfile`, `UserPreferences`)
- **Utilidades**: Funciones relacionadas pueden coexistir en un archivo cuando pertenecen al mismo contexto (ej. `date.utils.ts` puede contener `formatDate`, `parseDate`, `isValidDate`)
- **Constantes**: Valores relacionados pueden agruparse por dominio (ej. `auth.constants.ts` puede contener `VALIDATION_RULES`). Se recomienda usar `objetos as const` en lugar de `enum` porque los enums generan código adicional en el bundle final, no permiten tree-shaking efectivo y pueden causar problemas de tipado. Los objetos `as const` proporcionan mejor tree-shaking, tipado más preciso y menor tamaño de bundle:

```typescript
// Recomendado: objeto as const
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
} as const

// No recomendado: enum
enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}
```

### Estructura de Carpetas

Cada módulo de negocio debe adherirse rigurosamente a la siguiente estructura:

```
modules/
└── [nombre-modulo]/
    ├── index.ts
    ├── components/
    ├── composables/
    ├── constants/
    ├── data/
    ├── documentation/
    ├── READMEmd
    ├── errors/
    ├── utils/
    ├── router/
    ├── services/
    ├── store/
    ├── types/
    ├── views/
    └── tests/

```

- **`index.ts`**: La única API Pública del módulo.
- **`components/`, `views/`, `pages/`, `sections/`**: Contienen carpetas de componentes reutilizables, cada una con su archivo `.vue`, composable y estilos (patrón SCF).
- **`composables/`**: Contiene los hooks (`use-`) globales del modulo.
- **`constants/`**: Para valores primitivos y constantes. Se recomienda el uso de `objetos as const` en lugar de `enum` de TypeScript para mejor tree-shaking y tipado más preciso.
- **`documentation/`**: Carpeta opcional que se crea solo cuando la información del README.md es muy extensa y necesita ser separada en archivos Markdown (`.md`) específicos para explicar lógica compleja del módulo.
- **`README.md`** Documentación base del modulo.
- **`errors/`**: Contiene objetos que definen los posibles errores del dominio.
- **`utils/`**: Funciones puras (sin estado).
- **`router/`**: Define las rutas del módulo, separadas en `private.routes.ts` y `public.routes.ts`.
- **`services/`**: Servicios del modulo.
- **`store/`**: El store de Pinia para el estado del módulo.
- **`types/`**: Contiene **todas** las definiciones `interface` y `type` de TypeScript del módulo
- **`tests/`**: Pruebas unitarias para los archivos del módulo.

**Regla de Oro**: Un archivo debe contener elementos que están conceptualmente relacionados y que cambian por las mismas razones. La separación excesiva en archivos individuales puede crear fragmentación innecesaria.

### Estructura General del Proyecto (`src`)

Esta sección proporciona una vista de alto nivel de los directorios principales dentro de `src`, reflejando la estructura actual del proyecto.

```
src/
├── core/
│   ├── api/
│   │   ├── index.ts
│   │   ├── instance.ts
│   │   ├── interceptors.request.ts
│   │   └── interceptors.response.ts
│   ├── either/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   └── router/
│       ├── guards.ts
│       └── index.ts
├── modules/
│   ├── anime/
│   ├── auth/
│   └── [otros-módulos]/
├── shared/
│   ├── common/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── utils/
│   │   └── types/
│   └── layout/
│       └── components/
├── main.ts
├── App.vue
├── style.css
├── styles/
└── types/
```

- **`core/`**: Es el núcleo de la aplicación, responsable de la **orquestación y configuración global**.
    - `api/`: Contiene la configuración de la instancia global de Axios, interceptores y patrones de manejo de errores.
    - `either/`: Implementa el patrón Either para el manejo robusto de errores en las operaciones asíncronas.
    - `router/`: Contiene la configuración principal de Vue Router y guardias de navegación.
- **`modules/`**: Aquí reside toda la lógica de negocio, organizada por dominio. Cada módulo es independiente y contiene su propia estructura completa (components, pages, services, stores, etc.).
- **`shared/`**: Centraliza recursos, componentes y utilidades reutilizables entre módulos.
    - `common/`: Componentes de UI genéricos, composables universales y utilidades compartidas.
    - `layout/`: Componentes estructurales de la aplicación como headers, footers y layouts base.
- **`main.ts`**: Punto de entrada que monta la aplicación Vue y configura plugins globales.
- **`App.vue`**: El componente raíz que contiene `<router-view>` y la estructura base de la aplicación.
- **`styles/`**: Estilos globales y configuración de Element Plus.
- **`types/`**: Tipos TypeScript globales de la aplicación.

#### **3.4. Beneficios de la Estructura Plana Inteligente**

- **Navegación Simplificada**: Fácil localización de archivos sin navegar por múltiples niveles
- **Cohesión Mantenida**: Archivos relacionados permanecen juntos
- **Escalabilidad**: Nuevos componentes se integran sin afectar la estructura existente
- **Predictibilidad**: Nomenclatura consistente facilita la búsqueda y comprensión
- **Mantenibilidad**: Cambios y refactorizaciones se realizan con mayor facilidad

## Sección 4: Gestión de Estado Local Complejo (Patrón `provide`/`inject`)

Cuando se requiere compartir estado entre un componente padre y sus descendientes (por ejemplo, en formularios complejos o flujos de pasos), se debe emplear el patrón `provide`/`inject` de Vue. Toda la lógica para gestionar este estado compartido **debe** estar encapsulada en un único Composable, facilitando su testeo y reutilización.


## **Sección 5: Convenciones de Nomenclatura de Archivos**

Las siguientes convenciones se aplican a los **nombres de los archivos** para garantizar la consistencia y facilitar la navegación en el proyecto.

| **Tipo de Archivo** | **Ubicación** | **Patrón de Nomenclatura** | **Ejemplo** |
| --- | --- | --- | --- |
| **Pages** | `/pages` | `PascalCase.vue` | `AnimeList.vue`, `AnimeDetail.vue` |
| **Views** | `/views` | `PascalCase.vue` | `RegisterFormStep.vue`, `RegisterSuccessStep.vue` |
| **Components** | `/components` | `PascalCase.vue` | `AnimeCard.vue`, `AnimeGrid.vue` |
| **Sections** | `/sections` | `PascalCase.vue` | `RegisterBasic.vue`, `RegisterContact.vue` |
| **Tags en Template** | N/A | `<PascalCase />` | `<AnimeCard />`, `<RegisterForm />` |
| **Composables** | `/composables` | `use[Contexto].ts` | `useAnimeList.ts`, `useRegisterForm.ts` |
| **Composables de Componente** | `/components/[Component]/` | `use[Component].ts` | `useAnimeCard.ts`, `useAnimeGrid.ts` |
| **Store** | `/stores` | `[contexto].store.ts` | `anime.store.ts`, `auth.store.ts` |
| **Services** | `/services` | `[contexto].services.ts` | `anime.services.ts`, `auth.services.ts` |
| **Tipos (incl. Props)** | `/types` | `[contexto].types.ts` | `anime.types.ts`, `auth.types.ts` |
| **Utils** | `/utils` | `[contexto].utils.ts` | `format.ts`, `logger.ts` |
| **Errors** | `/errors` | `[contexto].errors.ts` | `anime.errors.ts`, `auth.errors.ts` |
| **Constants** | `/constants` | `[contexto].constants.ts` | `countries.ts`, `forms.ts` |
| **Archivos de Rutas** | `/routes` | `[contexto].routes.ts`, `[contexto].guards.ts` | `anime.private.routes.ts`, `anime.public.routes.ts`, `anime.guards.ts` |
| **Core API** | `core/api/` | `[nombre].instance.ts`, `[tipo].interceptor.ts` | `instance.ts`, `interceptors.request.ts` |
| **Core Either** | `core/either/` | `[nombre].ts` | `index.ts`, `types.ts`, `utils.ts` |
| **Pruebas** | `/test` | `[archivo-a-probar].spec.ts` | `useAnimeList.spec.ts`, `AnimeCard.spec.ts` |
| **Factories** | `/test/factories` | `[contexto].factory.ts` | `anime.factory.ts`, `store.factory.ts` |
| **Documentación** | `/` | `README.md` | `README.md` (en cada módulo) |
| **Carpetas** | N/A | `camelCase` | `animeCard`, `registerForm` |

#### **Reglas Específicas de Nomenclatura**

**Componentes y Views:**
- Usar `PascalCase` para todos los archivos `.vue`
- Los nombres deben ser descriptivos y específicos del contexto
- Para componentes base compartidos, usar prefijo `Base` (ej. `BaseCard.vue`)

**Composables:**
- Siempre usar prefijo `use`
- Para composables específicos de componente: `use[Component].ts`
- Para composables de módulo: `use[Funcionalidad].ts`
- Para composables compartidos: `useBase[Nombre].ts`

**Archivos de Configuración:**
- Usar `camelCase` para todos los archivos de configuración (ej. `vite.config.ts`, `tsconfig.json`)
- Usar `camelCase` para archivos específicos de módulo

**Estructura de Carpetas de Componentes:**
```
components/
├── AnimeCard/
│   ├── index.vue
│   ├── useAnimeCard.ts
│   └── animeCard.styles.scss
```

## **Sección 7: Gestión de la Capa de API**

### 7.1. Instancia Global de Axios (`core/api`)

La configuración global de Axios **debe residir** en `core/api/`. Esta carpeta es responsable de crear y configurar la instancia única que se utilizará en toda la aplicación.

**Estructura de `core/api/`:**
```
core/api/
├── index.ts              # Exportaciones públicas de la API
├── instance.ts           # Configuración de la instancia de Axios
├── interceptors.request.ts  # Interceptores de peticiones
└── interceptors.response.ts # Interceptores de respuestas
```

**Características principales:**
- **Instancia única**: Se crea una sola instancia de Axios con configuración centralizada
- **Interceptores globales**: Manejo automático de headers, tokens y errores comunes
- **Base URL configurada**: URL base de la API configurada en la instancia
- **Tipado fuerte**: Exportación de tipos TypeScript para el cliente HTTP

### 7.2. Patrón Either para Manejo de Errores (`core/either`)

Para garantizar un manejo robusto y predecible de errores, todos los servicios utilizan el **patrón Either** implementado en `core/either/`.

**Beneficios del patrón Either:**
- **Manejo explícito de errores**: Cada operación retorna `Either<Error, Success>`
- **Type safety**: TypeScript garantiza que los errores se manejen correctamente
- **Composabilidad**: Las operaciones se pueden encadenar de forma segura
- **Testabilidad**: Fácil testing de casos de éxito y error

**Funciones principales:**
- `executeRequest()`: Envuelve peticiones HTTP con el patrón Either
- `left()` / `right()`: Creadores de resultados de error y éxito
- `handleSuccessResponse()` / `handleErrorResponse()`: Helpers para manejo de respuestas

### 7.3. Servicios por Módulo (`modules/.../services`)

Los servicios dentro de cada módulo **no deben** crear su propia instancia de Axios. En su lugar, deben:

1. **Importar la instancia global**: `import { ApiInstance as http } from '@/core/api'`
2. **Usar el patrón Either**: `import { executeRequest } from '@/core/either'`
3. **Implementar métodos tipados**: Cada método debe retornar `Promise<ApiResult<T>>`

**Ejemplo de implementación:**
```typescript
import { ApiInstance as http } from '@/core/api'
import { executeRequest } from '@/core/either'
import type { ApiResult } from '@/core/either'

export const animeApi = {
  getAnimeList(params: AnimeSearchParams = {}): Promise<ApiResult<PaginatedResponse<Anime>>> {
    return executeRequest(() => 
      http.get<PaginatedResponse<Anime>>('/anime', { params })
    )
  }
}
```

### 7.4. Ventajas de esta Arquitectura

- **Consistencia**: Todos los servicios siguen el mismo patrón de manejo de errores
- **Mantenibilidad**: Cambios en la configuración de API se aplican globalmente
- **Testabilidad**: El patrón Either facilita el testing de casos de error
- **Type Safety**: TypeScript garantiza que los errores se manejen correctamente
- **Reutilización**: La instancia y utilidades se comparten entre todos los módulos

## **Sección 8: Gestión de Estilos (CSS)**

Para mantener los estilos organizados y evitar conflictos, se sigue una jerarquía de 5 niveles, de lo más específico a lo más global, basada en la estructura actual del proyecto.

### **8.1. Jerarquía de Estilos**

1. **Clases de Tailwind en el Template:** El método principal y preferido para aplicar estilos es usar las **clases de utilidad de Tailwind directamente en el template** del componente (`.vue`).

2. **Estilos Específicos de Componente (`[component].styles.scss`):** Cada componente puede tener su propio archivo de estilos SCSS que se importa directamente en el componente.
   ```vue
   <template>
     <!-- Template del componente -->
   </template>
   
   <script setup lang="ts">
   // Lógica del componente
   </script>
   
   <style lang="scss" scoped>
   @import './[component].styles.scss';
   </style>
   ```

3. **Abstracción con `<style scoped>` y `@apply`:** Si un conjunto de clases de Tailwind se repite **múltiples veces dentro del mismo componente**, se puede crear una clase semántica usando `@apply` dentro del archivo `.styles.scss` del componente.

4. **Estilos de Librerías de UI (`src/styles/`):** Configuración y personalización de librerías de UI como Element Plus.
   ```
   src/styles/
   ├── element/
   │   └── index.scss    # Configuración de Element Plus
   ```

5. **Estilos Fundamentales y Globales (`src/core/styles/`):** Variables CSS globales, configuración de fuentes, estilos base y variables de tema que afectan toda la aplicación. Estos estilos son parte del núcleo de la aplicación y se importan una única vez en `main.ts`.

### **8.2. Estructura de Archivos de Estilos**

**Por Componente (SCF Pattern):**
```
components/
├── AnimeCard/
│   ├── index.vue
│   ├── useAnimeCard.ts
│   └── animeCard.styles.scss    # Estilos específicos del componente
```

**Estilos Globales:**
```
src/
├── core/
│   └── styles/
│       ├── global.css           # Variables CSS globales y estilos base
│       └── element/
│           └── index.scss       # Configuración de Element Plus
└── shared/
    └── common/
        └── styles/
            └── [shared].scss    # Estilos compartidos entre módulos
```

### **8.3. Convenciones de Nomenclatura**

- **Archivos de estilos de componente**: `[component].styles.scss`
- **Variables CSS globales**: Definidas en `:root` en `src/core/styles/global.css`
- **Clases semánticas**: Usar `@apply` para agrupar clases de Tailwind

### **8.4. Reglas de Importación**

- **Estilos de componente**: Importar directamente en el componente con `@import './[component].styles.scss'`
- **Estilos globales**: Importar en `main.ts` o `App.vue`
- **Estilos de librería**: Importar en `main.ts` o en archivos específicos de configuración

### **8.5. Ejemplo de Implementación**

```scss
// animeCard.styles.scss
.anime-card {
  @apply bg-white rounded-lg shadow-md p-4 transition-all duration-200;
  
  &:hover {
    @apply shadow-lg transform -translate-y-1;
  }
  
  .anime-title {
    @apply text-lg font-semibold text-gray-800 mb-2;
  }
  
  .anime-description {
    @apply text-sm text-gray-600 line-clamp-3;
  }
}
```

### **8.6. Ventajas de esta Arquitectura**

- **Modularidad**: Cada componente tiene sus estilos encapsulados
- **Mantenibilidad**: Cambios en estilos se aíslan al componente específico
- **Reutilización**: Patrones de diseño se pueden compartir entre componentes
- **Performance**: Solo se cargan los estilos necesarios para cada componente
- **Consistencia**: Variables CSS globales garantizan coherencia visual

## **Sección 9: Gestión de Dependencias Externas**

### 9.1. Librerías Reutilizables (Patrón `shared`)

Si una librería necesita ser configurada (ej. `dayjs`, `lodash`, `date-fns`), esta configuración debe centralizarse en un helper dentro de `shared/common/utils/`. Cualquier módulo deberá importarla desde la API Pública de `shared/common` (`@/shared/common`).

**Ejemplo de estructura:**
```
shared/
└── common/
    ├── utils/
    │   ├── date.utils.ts        # Configuración de dayjs/date-fns
    │   ├── format.utils.ts      # Configuración de lodash
    │   └── validation.utils.ts  # Configuración de yup/zod
    └── index.ts                 # API Pública de shared/common
```

**Razones para usar `shared/`:**
- Las librerías externas son recursos reutilizables entre módulos
- No pertenecen al núcleo de la aplicación (router, API, etc.)
- Siguen el principio de centralización de recursos compartidos
- Facilitan la reutilización y mantenimiento

### 9.2. Plugins y Estilos Globales (Patrón `core`)

Si una librería requiere ser registrada globalmente (`app.use()`), esta inicialización debe ocurrir en el núcleo de la aplicación, dentro de `core/plugins/`, y ser llamada desde `main.ts`.

## **Sección 10: Testing**

### **10.1. Filosofía de Testing**

Nuestro enfoque se basa en **"Write tests. Not too many. Mostly integration."** siguiendo las mejores prácticas de Kent C. Dodds y la guía oficial de Vue:

- **Pruebas unitarias** para lógica de negocio compleja
- **Pruebas de integración ligera** para composables y stores  
- **Pruebas de comportamiento observable** para interacciones de usuario
- **Evitar** pruebas unitarias excesivas de servicios simples
- **Evitar** pruebas de detalles de implementación

### **10.2. Estructura de Testing**

**Pruebas por Módulo (`modules/[module]/test/`):**
```
modules/[module]/test/
├── setup.ts                      # Configuración específica del módulo
├── README.md                     # Documentación de testing del módulo
├── components/                   # Pruebas de componentes Vue
│   └── [Component]/
│       ├── index.spec.ts         # Pruebas del template del componente
│       └── use[Component].spec.ts # Pruebas del composable
├── pages/                        # Pruebas de páginas
│   └── [Page]/
│       └── use[Page].spec.ts
├── stores/                       # Pruebas de stores Pinia
│   └── [contexto].store.spec.ts
├── services/                     # Pruebas de servicios
│   └── [contexto].services.spec.ts
├── factories/                    # Factories para datos de prueba
│   └── [contexto].factory.ts
└── utils/                        # Utilidades para testing
    └── test-utils.ts
```

### **10.3. Tipos de Pruebas**

**Pruebas de Componentes:**
- **Enfoque**: Testing de comportamiento observable e interacciones de usuario
- **Herramientas**: `@testing-library/vue`, `@testing-library/user-event`
- **Patrón**: AAA (Arrange, Act, Assert)

**Pruebas de Composables:**
- **Enfoque**: Testing de lógica reactiva y manejo de estado
- **Herramientas**: `vitest`, `@vue/test-utils`
- **Patrón**: Testing con lifecycle de Vue

**Pruebas de Stores:**
- **Enfoque**: Testing de gestión de estado y acciones
- **Herramientas**: `@pinia/testing`, `createTestingPinia`
- **Patrón**: Testing de estado antes y después de acciones

**Pruebas de Servicios:**
- **Enfoque**: Testing de integración con APIs y manejo de errores
- **Herramientas**: `vitest`, mocks de Axios
- **Patrón**: Testing del patrón Either

### **10.4. Convenciones de Nomenclatura**

- **Archivos de prueba**: `[archivo-a-probar].spec.ts`
- **Factories**: `[contexto].factory.ts`
- **Utilidades**: `test-utils.ts`
- **Setup**: `setup.ts` (configuración específica del módulo)

### **10.5. Principios de Testing**

1. **Test Behavior, Not Implementation** - Probar comportamiento observable, no detalles internos
2. **Factory Pattern** - Usar factories para datos consistentes y reutilizables
3. **Black Box Testing** - Enfocarse en inputs/outputs, no en cómo se logran
4. **AAA Pattern** - Arrange, Act, Assert para estructura clara

### **10.6. Configuración Global**

**Archivo de configuración global (`test/setup.ts`):**
- Configuración de Vitest
- Mocks globales (Vue Router, Element Plus)
- Utilidades compartidas entre todos los tests

**Archivo de configuración por módulo (`modules/[module]/test/setup.ts`):**
- Configuración específica del módulo
- Mocks específicos del dominio
- Factories y utilidades del módulo