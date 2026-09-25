import { Router, type IRouter } from "express";
import {
  GetPropertiesQueryParams,
  GetPropertiesResponse,
} from "@workspace/api-zod";
import type { PropertiesResponse, Property } from "@workspace/api-zod";

const router: IRouter = Router();

const DEFAULT_CONVECTA_API_URL =
  "https://api-cnvct.azure-api.net/web/v1/properties";
const DEFAULT_PAGE_SIZE = 100;
const CACHE_TTL_MS = 60 * 1000;
const MAX_STALE_CACHE_MS = 15 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 15_000;

type JsonRecord = Record<string, unknown>;
type SyncLogger = {
  info: (object: object, message: string) => void;
  error: (object: object, message: string) => void;
};

type PropertyCache = {
  data: PropertiesResponse;
  syncedAt: number;
};

let propertyCache: PropertyCache | null = null;
let propertySyncPromise: Promise<PropertiesResponse> | null = null;
let propertySyncInterval: NodeJS.Timeout | null = null;

function configuredNumber(
  name: string,
  fallback: number,
  minimum: number,
): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value >= minimum ? value : fallback;
}

function convectaApiUrl(): string {
  return process.env.CONVECTA_API_URL?.trim() || DEFAULT_CONVECTA_API_URL;
}

function syncIntervalMs(): number {
  return configuredNumber("CONVECTA_SYNC_INTERVAL_MINUTES", 5, 0.1) * 60_000;
}

function maxSyncPages(): number {
  return Math.min(
    Math.round(configuredNumber("CONVECTA_MAX_SYNC_PAGES", 20, 1)),
    100,
  );
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function firstValue(...values: unknown[]): unknown {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function stringValue(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return null;
}

function urlValue(value: unknown): string | null {
  const candidate = stringValue(value);
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function numberValue(value: unknown, fallback = 0): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  if (typeof value === "string") {
    const normalized = value.trim().replace(/\s/g, "");
    const localized = /^\d{1,3}(\.\d{3})+(,\d+)?$/.test(normalized)
      ? normalized.replace(/\./g, "").replace(",", ".")
      : normalized.replace(",", ".");
    const match = localized.match(/-?\d+(?:\.\d+)?/);
    const number = match ? Number(match[0]) : Number.NaN;
    return Number.isFinite(number) ? number : fallback;
  }

  const record = asRecord(value);
  const nestedValue = firstValue(
    record.value,
    record.amount,
    record.surface,
    record.m2,
    record.sqm,
  );
  if (nestedValue !== undefined) {
    return numberValue(nestedValue, fallback);
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function firstPositiveValue(...values: unknown[]): unknown {
  return (
    values.find((value) => numberValue(value, Number.NaN) > 0) ??
    firstValue(...values)
  );
}

function booleanValue(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    return ["true", "1", "yes", "si"].includes(value.toLowerCase());
  }
  return false;
}

function inferPropertyType(title: string | null): string {
  const normalizedTitle = title?.toLocaleLowerCase("es-CL") ?? "";
  const knownTypes = [
    ["departamento", "Departamento"],
    ["casa", "Casa"],
    ["oficina", "Oficina"],
    ["local", "Local"],
    ["bodega", "Bodega"],
    ["terreno", "Terreno"],
    ["parcela", "Parcela"],
    ["sitio", "Sitio"],
    ["estacionamiento", "Estacionamiento"],
    ["pieza", "Pieza"],
  ] as const;

  return knownTypes.find(([name]) => normalizedTitle.includes(name))?.[1] ?? "Propiedad";
}

function findImageUrl(
  ...values: unknown[]
): string | null {
  const imageKeys = ["image", "imageUrl", "photo", "photoUrl", "url", "src"];
  const seen = new WeakSet<object>();

  const visit = (value: unknown, depth: number): string | null => {
    if (depth > 6) return null;

    const direct = urlValue(value);
    if (direct) return direct;

    if (Array.isArray(value)) {
      for (const entry of value) {
        const nested = visit(entry, depth + 1);
        if (nested) return nested;
      }
      return null;
    }

    const record = asRecord(value);
    if (Object.keys(record).length === 0) return null;
    if (seen.has(record)) return null;
    seen.add(record);

    for (const key of imageKeys) {
      const candidate = visit(record[key], depth + 1);
      if (candidate) return candidate;
    }
    return null;
  };

  for (const value of values) {
    const imageUrl = visit(value, 0);
    if (imageUrl) return imageUrl;
  }
  return null;
}

function formatPrice(
  formatted: unknown,
  amount: unknown,
  currency: JsonRecord,
): string {
  const formattedValue = stringValue(formatted);
  if (formattedValue) return formattedValue;

  const numericAmount = numberValue(amount, Number.NaN);
  if (!Number.isFinite(numericAmount)) return "Consultar precio";

  const currencyLabel =
    stringValue(firstValue(currency.symbol, currency.name, currency.code)) ?? "";
  return `${currencyLabel ? `${currencyLabel} ` : ""}${numericAmount.toLocaleString(
    "es-CL",
  )}`;
}

function getPropertySearchText(property: Property): string {
  return [
    property.id,
    property.title,
    property.type,
    property.operation,
    property.price,
    property.location,
  ]
    .join(" ")
    .toLocaleLowerCase("es-CL");
}

function mapProperty(item: unknown, index: number): Property {
  const raw = asRecord(item);
  const propertyData = asRecord(raw.propertyData);
  const characteristics = asRecord(raw.characteristics);
  const propertyType = asRecord(raw.propertyType);
  const currencyRent = asRecord(raw.currencyRent);

  const title = stringValue(
    firstValue(
      raw.propertyTitle,
      raw.title,
      propertyData.title,
      propertyData.name,
      raw.name,
    ),
  );
  const type =
    stringValue(
      firstValue(
        propertyType.name,
        propertyType.description,
        raw.propertyType,
        raw.type,
      ),
    ) ?? inferPropertyType(title);
  const borough = stringValue(
    firstValue(
      raw.borough,
      raw.boroughName,
      raw.commune,
      raw.comuna,
      propertyData.borough,
      propertyData.commune,
      title?.match(/\ben\s+(.+)$/i)?.[1],
    ),
  );
  const street = stringValue(firstValue(raw.street, propertyData.street));
  const number = stringValue(firstValue(raw.number, propertyData.number));
  const location =
    [street, number].filter(Boolean).join(" ") ||
    borough ||
    "Ubicación por confirmar";
  const displayTitle = title ?? `${type}${borough ? ` en ${borough}` : ""}`;
  const id =
    stringValue(firstValue(raw.idProperty, raw.idExternal, index + 1)) ??
    String(index + 1);

  return {
    id,
    title: displayTitle,
    type,
    operation: booleanValue(raw.seasonalRental)
      ? "Arriendo temporal"
      : booleanValue(raw.rent)
        ? "Arriendo"
        : "Propiedad",
    price: formatPrice(
      raw.priceRentFormatted,
      raw.priceRent,
      currencyRent,
    ),
    location,
    beds: Math.max(
      0,
      Math.round(
        numberValue(
          firstValue(
            characteristics.bedrooms,
            characteristics.bedroom,
            raw.bedrooms,
          ),
        ),
      ),
    ),
    baths: Math.max(
      0,
      Math.round(
        numberValue(
          firstValue(
            characteristics.bathrooms,
            characteristics.bathroom,
            raw.bathrooms,
          ),
        ),
      ),
    ),
    area: Math.max(
      0,
      numberValue(
        firstPositiveValue(
          characteristics.usefulSurface,
          characteristics.utildSurface,
          characteristics.builtSurface,
          characteristics.buildedSurface,
          characteristics.totalSurface,
          raw.usefulSurface,
          raw.totalSurface,
        ),
      ),
    ),
    image: findImageUrl(
      raw.image,
      raw.imageUrl,
      raw.images,
      raw.photos,
      raw.firstImageUrl,
      raw.firstImage,
      raw.propertyMedia,
      propertyData.image,
      propertyData.images,
      propertyData.photos,
    ),
    featured: booleanValue(raw.featured),
    detailUrl: urlValue(
      firstValue(raw.webAddress, propertyData.webAddress),
    ),
  };
}

function getPayloadRecord(payload: JsonRecord): JsonRecord {
  return asRecord(
    firstValue(payload.data, payload.result, payload.response, payload.payload),
  );
}

function getPayloadItems(payload: JsonRecord): unknown[] {
  const nested = getPayloadRecord(payload);
  const candidates = [
    payload.items,
    payload.properties,
    payload.results,
    nested.items,
    nested.properties,
    nested.results,
  ];
  return candidates.find(Array.isArray) ?? [];
}

function getPayloadNumber(
  payload: JsonRecord,
  nested: JsonRecord,
  ...keys: string[]
): number {
  return numberValue(
    firstValue(...keys.flatMap((key) => [payload[key], nested[key]])),
    0,
  );
}

async function fetchConvectaPage(
  subscriptionKey: string,
  page: number,
  pageSize: number,
  logger?: SyncLogger,
): Promise<PropertiesResponse> {
  const searchParams = new URLSearchParams({
    PageNumber: String(page),
    PageSize: String(pageSize),
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${convectaApiUrl()}?${searchParams.toString()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": subscriptionKey,
        },
        body: JSON.stringify({
          rent: true,
          sale: false,
          seasonalRental: false,
          onWeb: true,
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(`Convecta returned HTTP ${response.status}`);
    }

    const payload = asRecord(await response.json());
    const nestedPayload = getPayloadRecord(payload);
    const rawItems = getPayloadItems(payload);

    return GetPropertiesResponse.parse({
      items: rawItems.map(mapProperty),
      totalPages: Math.max(
        0,
        Math.round(getPayloadNumber(payload, nestedPayload, "totalPages")),
      ),
      totalRecords: Math.max(
        0,
        Math.round(getPayloadNumber(payload, nestedPayload, "totalRecords")),
      ),
      pageNumber: Math.max(
        1,
        Math.round(
          getPayloadNumber(payload, nestedPayload, "pageNumber") || page,
        ),
      ),
      pageSize: Math.max(
        1,
        Math.round(
          getPayloadNumber(payload, nestedPayload, "pageSize") || pageSize,
        ),
      ),
      source: "convecta",
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function refreshPropertyCache(
  logger: SyncLogger,
  subscriptionKey: string,
): Promise<PropertiesResponse> {
  if (propertySyncPromise) return propertySyncPromise;

  propertySyncPromise = (async () => {
    const firstPage = await fetchConvectaPage(
      subscriptionKey,
      1,
      DEFAULT_PAGE_SIZE,
      logger,
    );
    const pagesToFetch = Math.min(
      Math.max(1, firstPage.totalPages),
      maxSyncPages(),
    );
    const remainingPages =
      pagesToFetch > 1
        ? await Promise.all(
            Array.from({ length: pagesToFetch - 1 }, (_, index) =>
              fetchConvectaPage(subscriptionKey, index + 2, DEFAULT_PAGE_SIZE),
            ),
          )
        : [];
    const items = [firstPage, ...remainingPages].flatMap((page) => page.items);
    const data: PropertiesResponse = {
      items,
      totalPages: Math.ceil(items.length / DEFAULT_PAGE_SIZE),
      totalRecords: firstPage.totalRecords || items.length,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      source: "convecta",
    };

    propertyCache = { data, syncedAt: Date.now() };
    logger.info(
      { totalRecords: data.totalRecords },
      "Convecta property cache refreshed",
    );
    return data;
  })()
    .catch((error) => {
      logger.error(
        { err: error instanceof Error ? error.message : "unknown error" },
        "Convecta property cache refresh failed",
      );
      throw error;
    })
    .finally(() => {
      propertySyncPromise = null;
    });

  return propertySyncPromise;
}

async function getPropertySnapshot(
  logger: SyncLogger,
  subscriptionKey: string,
  forceFresh: boolean,
): Promise<PropertiesResponse> {
  const cacheAge = propertyCache ? Date.now() - propertyCache.syncedAt : Infinity;

  if (!forceFresh && propertyCache && cacheAge <= CACHE_TTL_MS) {
    return propertyCache.data;
  }

  if (!forceFresh && propertyCache && cacheAge <= MAX_STALE_CACHE_MS) {
    void refreshPropertyCache(logger, subscriptionKey).catch(() => undefined);
    return propertyCache.data;
  }

  return refreshPropertyCache(logger, subscriptionKey);
}

export function startPropertiesSync(logger: SyncLogger): void {
  if (propertySyncInterval) return;

  const sync = () => {
    const subscriptionKey = process.env.CONVECTA_SUBSCRIPTION_KEY;
    if (!subscriptionKey) {
      logger.error(
        {},
        "Convecta subscription key is not configured for background sync",
      );
      return;
    }

    void refreshPropertyCache(logger, subscriptionKey).catch(() => undefined);
  };

  sync();
  propertySyncInterval = setInterval(sync, syncIntervalMs());
  propertySyncInterval.unref();
}

router.get("/properties", async (req, res): Promise<void> => {
  const queryInput = {
    ...req.query,
    lastUpdateDate: req.query.lastUpdateDate
      ? new Date(String(req.query.lastUpdateDate))
      : undefined,
  };
  const parsedQuery = GetPropertiesQueryParams.safeParse(queryInput);
  if (!parsedQuery.success) {
    res.status(400).json({ error: "Los parámetros de propiedades no son válidos." });
    return;
  }

  const subscriptionKey = process.env.CONVECTA_SUBSCRIPTION_KEY;
  if (!subscriptionKey) {
    req.log.error({}, "Convecta subscription key is not configured");
    res.status(502).json({ error: "La conexión con Convecta no está configurada." });
    return;
  }

  const query = parsedQuery.data;

  try {
    const snapshot = await getPropertySnapshot(
      req.log,
      subscriptionKey,
      Boolean(query.lastUpdateDate),
    );
    const searchTerm = query.searchTerm?.trim().toLocaleLowerCase("es-CL");
    const filteredItems = searchTerm
      ? snapshot.items.filter((property) =>
          getPropertySearchText(property).includes(searchTerm),
        )
      : snapshot.items;
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;
    const totalPages = Math.ceil(filteredItems.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const data: PropertiesResponse = {
      items: filteredItems.slice(startIndex, startIndex + pageSize),
      totalPages,
      totalRecords: filteredItems.length,
      pageNumber: page,
      pageSize,
      source: "convecta",
    };

    res.set(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=300",
    );
    res.json(GetPropertiesResponse.parse(data));
  } catch (error) {
    req.log.error(
      { err: error instanceof Error ? error.message : "unknown error" },
      "Convecta property snapshot could not be served",
    );
    res.status(502).json({ error: "No fue posible conectar con Convecta." });
  }
});

export default router;