# Terra Harvest — Frontend

Next.js 14 (App Router) · TypeScript · Tailwind CSS · React Hook Form + Zod · Redux Toolkit
· Axios · react-icons · custom alert/notification system · dark mode

## Stack summary

| Concern | Tool |
|---|---|
| Framework | Next.js 14, App Router, TypeScript |
| Forms & validation | React Hook Form + Zod resolvers |
| Global state | Redux Toolkit (`cart`, `auth`, `ui`, `alert`, `theme` slices), cart persisted via `redux-persist` |
| HTTP | Axios, with an interceptor that attaches the Firebase ID token and normalizes error messages |
| Auth | Firebase Authentication (client SDK) |
| Icons | `react-icons` (`fa`, `fi` sets) |
| Notifications | Custom-built alert/toast system (no `window.alert`, no third-party toast lib) |
| Theme | Class-based dark mode (`darkMode: 'class'` in Tailwind), toggle in the navbar, persisted to `localStorage` |

## Dark mode — how it works

- **`tailwind.config.ts`**: `darkMode: 'class'`. All components use `dark:` variants alongside their light-mode classes, plus `earth-950` / `organic-950` shades were added to the palette for dark surfaces.
- **`store/slices/themeSlice.ts`**: holds `mode: 'light' | 'dark'` in Redux.
- **`hooks/useTheme.ts`**:
  - `useThemeListener()` — mounted once in `app/providers.tsx`. On first load, reads `localStorage`, falls back to the OS's `prefers-color-scheme`, applies the `dark` class to `<html>`, and syncs Redux. It also listens for OS theme changes (only applied if the user hasn't made an explicit choice).
  - `useTheme()` — the hook you call from any component: `const { theme, toggle } = useTheme()`.
- **`components/theme/ThemeToggle.tsx`** — an animated sun/moon switch, rendered in the navbar.
- **`app/layout.tsx`** — has a small inline `<script>` in `<head>` that runs *before* React hydrates, applying the saved theme class immediately. This avoids a flash of the wrong theme on page load.

## Custom alert/notification system

- **`store/slices/alertSlice.ts`** — a queue of alerts (`success | error | warning | info`), each with id/message/optional title/auto-dismiss duration. Capped at 4 visible at once, never persisted (alerts don't survive a refresh).
- **`hooks/useAlert.ts`** — call from anywhere: `alert.success('Added to cart!')`, `alert.error('Something went wrong', { title: 'Checkout failed' })`.
- **`components/alert/AlertToast.tsx`** — a single toast with icon, message, a shrinking progress bar (pauses on hover), and a manual close button.
- **`components/alert/AlertContainer.tsx`** — mounted once in `app/providers.tsx`, stacks toasts top-right.

Used throughout: cart add/remove, login/register (success + mapped Firebase error messages), checkout success/failure, contact form, and order-fetch failures.

## Project structure

```
frontend/
├── app/
│   ├── page.tsx                  Home
│   ├── products/                  Listing + [id] detail
│   ├── cart/ checkout/ checkout/success/
│   ├── login/ register/ orders/
│   ├── about/ contact/
│   ├── layout.tsx                  Root layout (theme init script, Navbar/Footer/CartDrawer)
│   ├── providers.tsx                 Redux Provider + PersistGate + auth/theme listeners + AlertContainer
│   └── not-found.tsx
├── components/
│   ├── alert/       AlertToast, AlertContainer
│   ├── theme/        ThemeToggle
│   ├── ui/            Button, Input, Badge (all with dark: variants)
│   ├── layout/          Navbar, Footer
│   ├── product/           ProductCard, ProductGrid, AddToCartSection
│   └── cart/                CartDrawer
├── store/
│   ├── index.ts               configureStore + redux-persist (cart only)
│   ├── hooks.ts                 useAppDispatch / useAppSelector
│   └── slices/
│       ├── cartSlice.ts
│       ├── authSlice.ts
│       ├── uiSlice.ts
│       ├── alertSlice.ts
│       └── themeSlice.ts
├── hooks/
│   ├── useAuth.ts        Firebase auth listener → syncs user to backend, populates authSlice
│   ├── useAlert.ts         success/error/warning/info helpers
│   └── useTheme.ts           useThemeListener (init) + useTheme (toggle)
├── lib/
│   ├── api.ts               Axios instance with auth + error interceptors
│   ├── firebase.ts            Firebase client init
│   ├── stripe.ts                Stripe.js loader
│   ├── utils.ts                   cn(), formatPrice(), getFirebaseErrorMessage()
│   └── validations/                 Zod schemas: auth, checkout, contact
└── types/index.ts           Shared TS types (Product, CartItem, Order, AlertItem, ...)
```

## Setup

```bash
cp .env.local.example .env.local   # fill in NEXT_PUBLIC_API_URL, Firebase config, Stripe publishable key
npm install
npm run dev                          # http://localhost:3000
```

Expects a backend exposing:
- `GET /api/products`, `GET /api/products/featured`, `GET /api/products/:slug`
- `POST /api/users/sync`
- `POST /api/stripe/create-checkout-session`
- `GET /api/orders/my-orders`
