import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Catalina Morales",
    role: "Compradora de Vivienda",
    location: "Las Condes",
    quote:
      "El equipo de Alta Soluciones fue fundamental para que encontrara mi casa ideal. Su conocimiento del mercado y su dedicacion personal son incomparables. En solo 3 semanas cerramos el mejor negocio de mi vida.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b9e8?w=100&h=100&fit=crop&crop=face&q=80",
  },
  {
    id: 2,
    name: "Rodrigo Fuentes",
    role: "Inversionista Inmobiliario",
    location: "Providencia",
    quote:
      "He trabajado con varias inmobiliarias a lo largo de los anos, pero Alta Soluciones se destaca por su transparencia y profesionalismo. Su asesoría en inversiones me ha generado retornos superiores al mercado.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&q=80",
  },
  {
    id: 3,
    name: "Patricia Vargas",
    role: "Vendedora de Propiedad",
    location: "Vitacura",
    quote:
      "Vendi mi departamento un 12% por sobre el precio de mercado gracias a la estrategia de marketing que diseño su equipo. Todo el proceso fue rapido, limpio y sin sorpresas. Los recomiendo sin dudarlo.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&q=80",
  },
  {
    id: 4,
    name: "Andres Pereira",
    role: "Empresario",
    location: "Santiago Centro",
    quote:
      "Alta Soluciones nos ayudo a encontrar la oficina perfecta para nuestra empresa. Su portafolio de propiedades comerciales es impresionante y la atencion fue de primer nivel en cada etapa.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&q=80",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block"
          >
            Experiencias Reales
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Mas de 3.500 familias y empresas han confiado en nosotros para las decisiones mas importantes de su vida.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, type: "spring", stiffness: 280, damping: 24 }}
              className="glass-card rounded-2xl p-8 flex flex-col gap-6 relative group"
              data-testid={`card-testimonial-${t.id}`}
            >
              <Quote className="w-8 h-8 text-primary/30 absolute top-6 right-6" />

              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-foreground/90 leading-relaxed text-base italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                  data-testid={`img-avatar-${t.id}`}
                />
                <div>
                  <div className="font-bold text-foreground" data-testid={`text-name-${t.id}`}>{t.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {t.role} &bull; {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
