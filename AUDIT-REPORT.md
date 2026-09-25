# Informe de auditoría

## Alcance

Se revisó la versión original entregada en `Alta-Web-Design.zip` y se continuó sobre la estructura del workspace manteniendo React, Vite, TypeScript y Express.

## Hallazgos corregidos

- Se formalizó el contrato OpenAPI de propiedades y se regeneraron los hooks React Query y esquemas Zod.
- Se añadió `GET /api/properties` al router existente junto con validación de query y respuesta.
- Se preservó `GET /api/healthz`.
- Se movió toda la integración Convecta al backend.
- Se configuraron endpoint, intervalo y máximo de páginas mediante variables de entorno.
- Se añadió timeout, caché, stale-while-revalidate, sincronización automática y deduplicación de refreshes concurrentes.
- Se reforzó la normalización para respuestas planas y anidadas.
- Se validan URLs de imágenes y enlaces oficiales; no se generan enlaces de detalle.
- Se completó el modo demo controlado con seis propiedades ficticias.
- Se implementaron estados de carga, error, lista vacía y actualización manual.
- Se mejoraron búsqueda, SEO, responsive, contacto y feedback del formulario.
- Se eliminó la ejecución de cambios destructivos o migraciones de base de datos del post-merge.
- Se agregaron `.env.example`, documentación de Convecta y publicación.

## Seguridad

`CONVECTA_SUBSCRIPTION_KEY` se lee exclusivamente desde el secreto de Replit. No existe un valor real en el repositorio, los assets, la interfaz ni los logs intencionales del servidor.

## Estado

La aplicación queda preparada para revisión visual y publicación. El catálogo real depende de que la clave de Convecta y el endpoint configurado sigan habilitados por el proveedor.