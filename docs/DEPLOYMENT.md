# Publicación

## Variables

Configura `CONVECTA_SUBSCRIPTION_KEY` como secreto de Replit. No la pegues en el código ni en un archivo `.env`.

Puedes ajustar estas variables no sensibles:

```text
CONVECTA_API_URL=https://api-cnvct.azure-api.net/web/v1/properties
CONVECTA_SYNC_INTERVAL_MINUTES=5
CONVECTA_MAX_SYNC_PAGES=20
VITE_DEMO_PROPERTIES=false
```

`VITE_DEMO_PROPERTIES=true` es solo para revisar visualmente la interfaz con seis propiedades ficticias. Debe permanecer en `false` en producción.

## Comprobaciones previas

```bash
pnpm run typecheck
PORT=21232 BASE_PATH=/ pnpm run build
```

En el entorno de ejecución, el backend atiende el prefijo `/api` y el frontend se sirve en `/`. El endpoint de salud es:

```text
/api/healthz
```

El script de post-merge solo instala dependencias; no crea tablas ni ejecuta migraciones porque el catálogo público no usa base de datos.