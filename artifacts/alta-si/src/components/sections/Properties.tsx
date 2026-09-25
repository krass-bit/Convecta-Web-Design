import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bath,
  Bed,
  Building2,
  ExternalLink,
  MapPin,
  RefreshCw,
  Search,
  Square,
} from "lucide-react";
import {
  getGetPropertiesQueryKey,
  getHealthCheckQueryKey,
  useGetProperties,
  useHealthCheck,
  type Property,
} from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const demoProperties: Property[] = [
  {
    id: "demo-1",
    title: "Departamento luminoso en Providencia",
    type: "Departamento",
    operation: "Arriendo",
    price: "$850.000 / mes",
    location: "Providencia, Santiago",
    beds: 2,
    baths: 2,
    area: 78,
    image: "/prop-1.png",
    featured: true,
    detailUrl: null,
  },
  {
    id: "demo-2",
    title: "Casa familiar con jardín privado",
    type: "Casa",
    operation: "Arriendo",
    price: "$1.450.000 / mes",
    location: "Ñuñoa, Santiago",
    beds: 3,
    baths: 2,
    area: 142,
    image: "/prop-2.png",
    featured: true,
    detailUrl: null,
  },
  {
    id: "demo-3",
    title: "Penthouse con vista a la cordillera",
    type: "Departamento",
    operation: "Arriendo",
    price: "$2.100.000 / mes",
    location: "Las Condes, Santiago",
    beds: 3,
    baths: 3,
    area: 126,
    image: "/prop-3.png",
    featured: true,
    detailUrl: null,
  },
  {
    id: "demo-4",
    title: "Oficina lista para recibir a tu equipo",
    type: "Oficina",
    operation: "Arriendo",
    price: "$980.000 / mes",
    location: "Santiago Centro",
    beds: 0,
    baths: 1,
    area: 64,
    image: "/prop-4.png",
    featured: false,
    detailUrl: null,
  },
  {
    id: "demo-5",
    title: "Loft moderno a pasos del metro",
    type: "Departamento",
    operation: "Arriendo",
    price: "$690.000 / mes",
    location: "La Reina, Santiago",
    beds: 1,
    baths: 1,
    area: 51,
    image: "/prop-5.png",
    featured: false,
    detailUrl: null,
  },
  {
    id: "demo-6",
    title: "Casa amplia en barrio residencial",
    type: "Casa",
    operation: "Arriendo",
    price: "$1.780.000 / mes",
    location: "Vitacura, Santiago",
    beds: 4,
    baths: 3,
    area: 198,
    image: "/prop-6.png",
    featured: false,
    detailUrl: null,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 24 },
  },
};

function normalizedSearch(value: string) {
  return value.trim().toLocaleLowerCase("es-CL");
}

export function Properties() {
  const demoMode = import.meta.env.VITE_DEMO_PROPERTIES === "true";
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const propertyParams = {
    page: 1,
    pageSize: 100,
    ...(searchTerm ? { searchTerm } : {}),
  };
  const health = useHealthCheck({
    query: {
      enabled: !demoMode,
      staleTime: 300_000,
      queryKey: getHealthCheckQueryKey(),
    },
  });
  const propertiesQuery = useGetProperties(propertyParams, {
    query: {
      enabled: !demoMode,
      queryKey: getGetPropertiesQueryKey(propertyParams),
      staleTime: 60_000,
      refetchOnMount: true,
    },
  });

  const demoResults = useMemo(() => {
    const term = normalizedSearch(searchTerm);
    if (!term) return demoProperties;
    return demoProperties.filter((property) =>
      [
        property.title,
        property.type,
        property.operation,
        property.location,
      ]
        .join(" ")
        .toLocaleLowerCase("es-CL")
        .includes(term),
    );
  }, [searchTerm]);

  const properties = demoMode
    ? demoResults
    : propertiesQuery.data?.items ?? [];
  const isLoading = demoMode ? false : propertiesQuery.isLoading;
  const isError = demoMode ? false : propertiesQuery.isError;
  const isFetching = demoMode ? false : propertiesQuery.isFetching;

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(normalizedSearch(searchInput));
  };

  return (
    <section id="propiedades" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 block text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Portafolio selecto
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-3xl font-bold md:text-5xl"
          >
            Propiedades destacadas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Encuentra tu próximo lugar para vivir o trabajar, con información
            actualizada y el respaldo de nuestro equipo.
          </motion.p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground/80">
            <span>
              {demoMode
                ? `${properties.length} propiedades de demostración`
                : `${propertiesQuery.data?.totalRecords ?? 0} propiedades disponibles`}
            </span>
            {!demoMode && (
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    health.isSuccess ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                {health.isSuccess ? "Conectado a Convecta" : "Sincronizando catálogo"}
              </span>
            )}
            {demoMode && (
              <Badge variant="outline" className="border-primary/30 text-primary">
                Modo demo
              </Badge>
            )}
          </div>
        </div>

        <form
          onSubmit={search}
          className="mx-auto mb-10 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border/60 bg-card/60 p-2 backdrop-blur sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Busca por comuna, tipo o nombre"
              aria-label="Buscar propiedades"
              className="h-12 border-0 bg-transparent pl-11 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" className="h-12 rounded-xl px-7">
            Buscar
          </Button>
        </form>

        {isLoading && (
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            aria-label="Cargando propiedades"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="glass-card animate-pulse overflow-hidden rounded-2xl"
              >
                <div className="h-52 bg-muted/40" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-muted/50" />
                  <div className="h-4 w-1/2 rounded bg-muted/40" />
                  <div className="h-4 w-full rounded bg-muted/30" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="glass-card mx-auto max-w-xl rounded-2xl p-8 text-center">
            <p className="mb-2 font-semibold text-foreground">
              No pudimos cargar las propiedades de Convecta.
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              La conexión no está disponible en este momento. Puedes volver a
              intentarlo.
            </p>
            <Button
              variant="outline"
              onClick={() => propertiesQuery.refetch()}
              className="border-primary/30 hover:bg-primary/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
          </div>
        )}

        {!isLoading && !isError && properties.length === 0 && (
          <div className="glass-card mx-auto max-w-xl rounded-2xl p-8 text-center">
            <Building2 className="mx-auto mb-4 h-10 w-10 text-primary" />
            <p className="mb-2 font-semibold text-foreground">
              No encontramos propiedades para tu búsqueda.
            </p>
            <p className="text-sm text-muted-foreground">
              Prueba con otra comuna, tipo de propiedad o palabra clave.
            </p>
          </div>
        )}

        {!isLoading && !isError && properties.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        )}

        {!demoMode && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 px-10 hover:bg-primary/10"
              onClick={() => propertiesQuery.refetch()}
              disabled={isFetching}
              data-testid="button-refresh-properties"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Actualizando..." : "Actualizar listado"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: Property }) {
  const content = (
    <>
      <div className="relative h-52 overflow-hidden">
        {property.image ? (
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/70 via-card to-background">
            <Building2 className="h-12 w-12 text-primary/60" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="border-0 bg-primary text-xs font-semibold text-primary-foreground">
            {property.operation}
          </Badge>
          {property.featured && (
            <Badge className="border-0 bg-amber-500/90 text-xs font-semibold text-white">
              Destacado
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xl font-bold text-white drop-shadow-lg">
            {property.price}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {property.title}
          </h3>
          <Badge variant="outline" className="shrink-0 border-border/50 text-xs">
            {property.type}
          </Badge>
        </div>
        <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span>{property.location}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/50 pt-4 text-sm text-muted-foreground">
          {property.beds > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-primary" />
              <span>{property.beds} Dorm.</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-primary" />
            <span>
              {property.baths} {property.baths === 1 ? "Baño" : "Baños"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-primary" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      variants={item}
      className="glass-card group overflow-hidden rounded-2xl"
    >
      {property.detailUrl ? (
        <a
          href={property.detailUrl}
          target="_blank"
          rel="noreferrer"
          className="block"
          aria-label={`Ver ${property.title}`}
        >
          {content}
          <span className="sr-only">
            <ExternalLink />
          </span>
        </a>
      ) : (
        content
      )}
    </motion.article>
  );
}