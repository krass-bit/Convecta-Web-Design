# Integración con Convecta Prop360

La web pública nunca llama directamente a Convecta. El flujo es:

1. El navegador solicita `GET /api/properties`.
2. El servidor Express lee `CONVECTA_SUBSCRIPTION_KEY` desde los secretos de Replit.
3. El servidor consulta el endpoint público configurado en `CONVECTA_API_URL` usando `Ocp-Apim-Subscription-Key`.
4. La respuesta se normaliza al contrato interno `PropertiesResponse`.
5. El navegador recibe solamente datos públicos validados.

## Configuración

| Variable | Uso | Valor por defecto |
| --- | --- | --- |
| `CONVECTA_SUBSCRIPTION_KEY` | Secreto de autenticación | Sin valor |
| `CONVECTA_API_URL` | Endpoint real de propiedades | Endpoint público de Convecta Prop360 |
| `CONVECTA_SYNC_INTERVAL_MINUTES` | Intervalo de sincronización de caché | `5` |
| `CONVECTA_MAX_SYNC_PAGES` | Máximo de páginas en cada sincronización | `20` |

La clave no debe escribirse en `.env`, Git, logs, respuestas HTTP ni código del frontend.

## Caché y paginación

- La primera página determina cuántas páginas públicas existen.
- Se descargan páginas en paralelo hasta el límite configurado.
- El caché se sirve durante un minuto y se revalida en segundo plano mientras tenga menos de quince minutos.
- El proceso de sincronización automática comienza al iniciar el servidor y usa cinco minutos por defecto.
- Cada request externo tiene un timeout de quince segundos.
- `GET /api/properties` admite `page`, `pageSize`, `searchTerm` y `lastUpdateDate`.

## Normalización y seguridad

El adaptador tolera respuestas planas y respuestas anidadas bajo `data`, `result`, `response` o `payload`. La normalización ocurre exclusivamente en el backend para evitar acoplar el frontend al contrato externo.

Las imágenes y enlaces de detalle se entregan únicamente si tienen una URL absoluta `http` o `https` válida. No se inventa un enlace de detalle cuando Convecta no lo entrega.