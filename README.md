# VitaWallet Frontend

Aplicación frontend para VitaWallet.

- **Producción:** [https://ch-vita-wallet-fe.vercel.app/](https://ch-vita-wallet-fe.vercel.app/)
- **Backend repo:** [https://github.com/reynaldoqs/ch_vita_wallet_api](https://github.com/reynaldoqs/ch_vita_wallet_api)

## 1. Setup

```bash
# Clonar el repositorio
git clone <repo-url>
cd vitawallet_fe

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend:
# VITE_API_URL=http://localhost:3000/api/v1

# Iniciar en desarrollo
pnpm dev

# Correr tests
pnpm test

# Build de producción
pnpm build
```

## 2. Decisiones técnicas

### Arquitectura modular con Atomic Design

El proyecto sigue una arquitectura modular basada en **features**, donde cada feature encapsula sus propios componentes, vistas y lógica. Los componentes se organizan siguiendo **Atomic Design**:

```
src/
├── components/          # Componentes compartidos
│   ├── atoms/           # Button, Input, Icon, Typography, Modal, etc.
│   └── molecules/       # FormField, GroupButton, Skeleton
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── organisms/   # LoginForm, SignUpForm
│   │   │   └── templates/   # AuthLayout
│   │   └── views/
│   └── dashboard/
│       ├── components/
│       │   ├── molecules/   # BalanceCard, PriceRows, TransactionRow, etc.
│       │   ├── organisms/   # ExchangeForm, PricesList, UserBalance, etc.
│       │   └── templates/   # DashboardLayout, HomeLayout, etc.
│       └── views/
├── services/            # RTK Query APIs (authService, walletService)
├── store/               # Redux store, slices y middlewares
├── types/               # Tipos y schemas Zod
└── utils/               # Utilidades compartidas
```

### Servicios y validación con Zod en `transformResponse`

Los servicios usan **RTK Query** para la comunicación con el backend. En cada endpoint se aplica un patrón de validación en `transformResponse` usando **Zod schemas**, lo que garantiza que la respuesta del backend cumple con el contrato esperado antes de llegar al estado de la app:

```ts
transformResponse: (response: unknown) => {
  const parsed = signUpResponseSchema.safeParse(response);
  if (!parsed.success) throw new Error(getZodErrorMessage(parsed.error));
  return parsed.data;
},
```

Si el backend devuelve un objeto inesperado, la app lo detecta de forma temprana y lanza un error controlado.

### Redux con middlewares custom

El store de Redux utiliza middlewares personalizados:

- **`rtkSessionPersist`**: Escucha acciones de `setToken` y `logout` para persistir/limpiar la sesión en `localStorage` automáticamente.
- **`rtkQueryErrorLogger`**: Intercepta errores de cualquier query/mutation rechazada y los notifica al usuario a través de `sileo`. Este middleware es el **punto ideal para integrar un servicio de error tracking** como DataDog, Sentry, etc., ya que centraliza todos los errores del backend en un solo lugar.

### Sileo para notificaciones y UX

Se usa [sileo](https://www.npmjs.com/package/sileo) como sistema de notificaciones para manejar errores, loading states y feedback al usuario de forma consistente en toda la aplicación.

### Stack principal

| Herramienta | Uso |
|---|---|
| React 19 + TypeScript | UI y tipado |
| Vite | Build tool |
| Redux Toolkit + RTK Query | Estado global y data fetching |
| Zod | Validación de respuestas del backend |
| React Router v7 | Routing |
| Tanstack Form | Manejo de formularios |
| Biome | Linting y formatting |
| Vitest + Testing Library | Testing |
| Sileo | Notificaciones (errores, loading, etc.) |

## 3. Qué quedó pendiente

- [ ] Completar cobertura de tests (unitarios y de integración)
- [ ] Responsive design (actualmente optimizado para desktop)
- [ ] Integrar servicio de error tracking (DataDog, Sentry) en el middleware `rtkQueryErrorLogger`
- [ ] Manejo de refresh token y expiración de sesión
- [ ] Agregar loading skeletons en más vistas
- [ ] CI/CD pipeline con checks de lint y tests
