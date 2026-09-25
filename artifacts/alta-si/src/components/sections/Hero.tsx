import { motion } from "framer-motion";
import { Search, MapPin, Building, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-santiago.jpg" 
          alt="Santiago de Chile skyline Costanera Center Andes" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06111f]/75 via-[#06111f]/55 to-[#06111f]/95"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary backdrop-blur-md text-xs font-semibold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Líderes en el mercado chileno
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Encuentra tu lugar <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              en el mundo
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mb-12 max-w-2xl text-lg font-light text-white/80 md:text-xl"
          >
            Asesoría experta, tecnología avanzada y un servicio premium para comprar, vender o arrendar tu propiedad ideal.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-3xl glass p-2 rounded-2xl md:rounded-full"
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex flex-1 items-center border-b border-white/15 px-4 py-3 text-white md:border-b-0 md:py-0">
                <Search className="mr-3 h-5 w-5 shrink-0 text-white/80" />
                <input
                  type="text"
                  placeholder="¿Qué estás buscando? (ej. Casa en Las Condes)"
                  className="w-full border-none bg-transparent text-white outline-none placeholder:text-white/60 focus:ring-0"
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-border/50 self-center"></div>
              <div className="relative flex flex-1 items-center border-b border-white/15 px-4 py-3 text-white md:border-b-0 md:py-0">
                <MapPin className="mr-3 h-5 w-5 shrink-0 text-white/80" />
                <select defaultValue="" className="w-full cursor-pointer appearance-none border-none bg-transparent text-white outline-none">
                  <option value="" disabled>Comuna / Región</option>
                  <option value="las-condes">Las Condes</option>
                  <option value="providencia">Providencia</option>
                  <option value="vitacura">Vitacura</option>
                  <option value="nunoa">Ñuñoa</option>
                  <option value="santiago">Santiago Centro</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 ml-auto h-4 w-4 shrink-0 text-white/70" />
              </div>
              <div className="hidden md:block w-px h-8 bg-border/50 self-center"></div>
              <div className="relative flex flex-1 items-center px-4 py-3 text-white md:py-0">
                <Building className="mr-3 h-5 w-5 shrink-0 text-white/80" />
                <select defaultValue="" className="w-full cursor-pointer appearance-none border-none bg-transparent text-white outline-none">
                  <option value="" disabled>Tipo de Propiedad</option>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="oficina">Oficina</option>
                  <option value="comercial">Comercial</option>
                  <option value="terreno">Terreno</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 ml-auto h-4 w-4 shrink-0 text-white/70" />
              </div>
              <Button
                type="button"
                size="lg"
                className="w-full md:w-auto rounded-xl md:rounded-full md:px-8 mt-2 md:mt-0 font-semibold h-12 md:h-14"
                onClick={() => document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" })}
              >
                Buscar
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 flex flex-col items-center gap-2 text-muted-foreground/60"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Explorar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
