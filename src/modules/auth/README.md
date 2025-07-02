# Módulo Auth

Este módulo implementa el sistema de autenticación de la aplicación, incluyendo login, registro, gestión de estado de usuario y protección de rutas.

## Estructura

```
src/modules/auth/
├── composables/        # Lógica de autenticación
│   ├── useLogin.ts     # Lógica de inicio de sesión
│   └── useRegister.ts  # Lógica de registro
├── pages/              # Páginas de autenticación
│   ├── Login.vue       # Página de inicio de sesión
│   └── Register.vue    # Página de registro
├── routes/             # Configuración de rutas
│   ├── index.ts        # Exports de rutas
│   └── public.ts       # Rutas públicas de auth
├── stores/             # Stores de Pinia
│   └── authStore.ts    # Store de autenticación
├── styles/             # Estilos del módulo
│   ├── Login.styles.scss
│   └── Register.styles.scss
├── types/              # Tipos TypeScript específicos
│   ├── Auth.types.ts   # Tipos principales de auth
│   ├── Login.types.ts  # Tipos de login
│   ├── Register.types.ts # Tipos de registro
│   └── index.ts        # Exports de tipos
├── index.ts            # Exports del módulo
└── README.md           # Esta documentación
```

## Características

### 🔐 Funcionalidades Principales
- **Login**: Inicio de sesión con validación
- **Registro**: Creación de cuenta con validación
- **Gestión de Estado**: Persistencia de sesión
- **Protección de Rutas**: Guards de navegación
- **Logout**: Cierre de sesión seguro

### 🏗️ Arquitectura
- **Store Pinia**: Gestión centralizada del estado de usuario
- **Composables**: Lógica reutilizable de autenticación
- **Route Guards**: Protección automática de rutas
- **TypeScript**: Tipado completo y seguro

### 🎨 UI/UX
- **Element Plus**: Formularios y componentes UI
- **Validación**: Reglas de validación en tiempo real
- **Feedback**: Mensajes de error y éxito
- **Responsive**: Diseño adaptable

## Uso

### Importar Páginas
```vue
<template>
  <Login />
  <Register />
</template>

<script setup>
import Login from '@modules/auth/pages/Login.vue'
import Register from '@modules/auth/pages/Register.vue'
</script>
```

### Usar Composables
```typescript
import { useLogin } from '@modules/auth/composables/useLogin'
import { useRegister } from '@modules/auth/composables/useRegister'

const { loginForm, handleLogin, isLoading } = useLogin()
const { registerForm, handleRegister, rules } = useRegister()
```

### Usar Store
```typescript
import { useAuthStore } from '@modules/auth/stores/authStore'

const authStore = useAuthStore()

// Verificar autenticación
if (authStore.isAuthenticated) {
  // Usuario autenticado
}

// Login
const success = await authStore.login(credentials)

// Logout
authStore.logout()
```

## Configuración de Rutas

### Rutas Públicas
```typescript
// Rutas que requieren NO estar autenticado
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@modules/auth/pages/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@modules/auth/pages/Register.vue'),
    meta: { requiresGuest: true }
  }
]
```

### Protección de Rutas
```typescript
// En router/guards.ts
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }
  
  // Ruta requiere ser invitado
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'AnimeList' })
    return
  }
  
  next()
})
```

## Validación de Formularios

### Login
```typescript
const rules = {
  username: [
    { required: true, message: 'Por favor ingresa tu usuario', trigger: 'blur' },
    { min: 3, message: 'El usuario debe tener al menos 3 caracteres', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Por favor ingresa tu contraseña', trigger: 'blur' },
    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' }
  ]
}
```

### Registro
```typescript
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('Por favor confirma tu contraseña'))
  } else if (value !== registerForm.password) {
    callback(new Error('Las contraseñas no coinciden'))
  } else {
    callback()
  }
}
```

## Estado de Usuario

### Estructura del Usuario
```typescript
interface User {
  id: string
  username: string
  email: string
  avatar: string
}
```

### Persistencia
- **localStorage**: Almacenamiento local de sesión
- **Auto-login**: Restauración automática al recargar
- **Logout**: Limpieza completa de datos

## Testing

El módulo incluye:
- **Composables Testeables**: Lógica aislada y mockeable
- **Store Testeable**: Estado predecible
- **Validación**: Reglas de validación verificables
- **Guards**: Protección de rutas testeable

## Dependencias

### Internas
- `@shared/utils` - Utilidades globales
- `@shared/types` - Tipos compartidos

### Externas
- **Vue 3** - Framework base
- **Pinia** - Gestión de estado
- **Vue Router** - Enrutamiento
- **Element Plus** - Componentes UI
- **Element Plus Icons** - Iconos

## Seguridad

### Consideraciones
- **Validación Cliente**: Validación en tiempo real
- **Validación Servidor**: Validación en backend (cuando esté disponible)
- **Persistencia Segura**: Almacenamiento local seguro
- **Logout Automático**: Limpieza de datos al cerrar sesión

### Demo Credenciales
Para propósitos de demostración:
- **Usuario**: `demo`
- **Contraseña**: `demo123` 