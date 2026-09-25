# Alta Soluciones Inmobiliarias

Sitio público inmobiliario para consultar propiedades de arriendo publicadas en Convecta Prop360 y contactar al equipo de Alta.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API seguro y caché de Convecta
- `pnpm --filter @workspace/alta-si run dev` — frontend Vite
- `pnpm run typecheck` — comprobación completa de TypeScript
- `pnpm run build` — typecheck + build
- `pnpm --filter @workspace/api-spec run codegen` — regenerar hooks React Query y esquemas Zod
- `PORT=21232 BASE_PATH=/ pnpm run build` — build reproducible del frontend

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/alta-si/` — landing page React + Vite, recursos visuales y modo demo.
- `artifacts/api-server/src/routes/properties.ts` — proxy, normalización, caché y sincronización Convecta.
- `lib/api-spec/openapi.yaml` — contrato fuente de `/api/healthz` y `/api/properties`.
- `lib/api-client-react/` y `lib/api-zod/` — salidas generadas del contrato.
- `docs/CONVECTA.md` — integración, variables y límites de seguridad.
- `docs/DEPLOYMENT.md` — publicación y comprobaciones.

## Architecture decisions

- Convecta solo se consulta desde Express; el navegador nunca recibe la clave de suscripción.
- El caché vive en memoria porque el listado público no necesita base de datos ni migraciones.
- La respuesta externa se normaliza a un contrato pequeño y estable antes de llegar a React.
- El modo demo se activa solo desde `VITE_DEMO_PROPERTIES=true` y no se habilita por defecto.

## Product

Landing responsive con navegación, hero, servicios, catálogo de propiedades de arriendo, búsqueda, estados de carga/error/vacío, actualización manual, información de empresa, testimonios, contacto y footer.

## User preferences

- Las claves, contraseñas y habilitaciones de Convecta deben permanecer fuera del chat, del repositorio y del frontend.

## Gotchas

- No ejecutar migraciones de base de datos para esta funcionalidad: el catálogo público se sirve desde Convecta y caché en memoria.
- Después de modificar `lib/api-spec/openapi.yaml`, ejecutar codegen antes de usar hooks o esquemas nuevos.
- Mantener `VITE_DEMO_PROPERTIES=false` en producción.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
