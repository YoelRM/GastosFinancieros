# Frontend Angular - archivos clave (Sistema de Gestión Financiera)

Estos son solo los archivos de aplicación, sin el boilerplate que genera
`ng new`. Ya se compilaron y probaron con `ng build` sin errores.

## Cómo usarlos

1. Crea el proyecto base (una sola vez):
   ```bash
   npx @angular/cli@18 new frontend --routing --style=css --ssr=false
   cd frontend
   ```
2. Copia el contenido de `src/` de este paquete dentro de `src/` del
   proyecto generado, reemplazando `app.component.ts`, `app.config.ts`,
   `app.routes.ts` y agregando las carpetas `core/`, `shared/`, `features/`.
3. `npm start` — con el backend corriendo en `http://localhost:8000`
   (ver `finanzas_backend.zip`), el dashboard carga datos reales.

## Qué contiene

- `core/models/finanzas.model.ts` — interfaces TS que reflejan los schemas
  Pydantic del backend (Dashboard, Pago, Tarjeta, Obligacion...).
- `core/services/finanzas.service.ts` — HttpClient hacia `/api/dashboard`,
  `/api/pagos/{id}`, `/api/tarjetas`, `/api/obligaciones`.
- `shared/components/toggle-switch/` — el switch "Ya se pagó" reutilizable.
- `features/dashboard/` — vista principal (equivalente a tu Excel):
  ingreso semanal/mensual, pagos fijos con toggle, suscripciones, barras de
  límite de tarjetas, resumen de deuda, gasto variable.
- `features/obligaciones/` — tabla de catálogo de fijos y suscripciones.
- `features/creditos/` — vista dedicada de tarjetas con barra de uso y
  disponible.
- `app.routes.ts` / `app.config.ts` / `app.component.ts` — ruteo standalone
  (Angular 17+) entre las 3 vistas, con nav simple.
- `environments/environment.ts` — URL del backend (`localhost:8000` en dev).

## Nota técnica

Usé **componentes standalone** (el default de Angular 17/18) en vez de
`NgModule` + `app-routing.module.ts` como sugiere textualmente el PDF de
arquitectura — es la forma moderna recomendada por el equipo de Angular y
requiere menos boilerplate. Si prefieres el patrón clásico con
`AppModule`/`AppRoutingModule`, dímelo y lo reescribo así; funcionalmente
es equivalente.

## Toggle "Ya se pagó" → recálculo de efectivo (flujo 4.2)

`DashboardComponent.onTogglePago()` hace update optimista, llama a
`PUT /api/pagos/{id}`, y vuelve a pedir `/api/dashboard` para traer el
`efectivo_dia_hoy` ya recalculado por el backend — igual que en el flujo
descrito en tu documento.
