import { motion } from "framer-motion";
import { CheckCircle, Users, Home, Award, MapPin } from "lucide-react";

const stats = [
  { icon: Award, value: "+15", label: "Años de experiencia", suffix: "" },
  { icon: Home, value: "+1.200", label: "Propiedades vendidas", suffix: "" },
  { icon: Users, value: "+3.500", label: "Clientes satisfechos", suffix: "" },
  { icon: MapPin, value: "8", label: "Ciudades de cobertura", suffix: "" },
];

const values = [
  "Transparencia y honestidad en cada transacción",
  "Asesoría personalizada sin presiones comerciales",
  "Tecnología avanzada para mejores resultados",
  "Red de profesionales certificados a tu disposición",
  "Acompañamiento desde el primer contacto hasta la entrega",
  "Conocimiento profundo del mercado local chileno",
];

export function About() {
  return (
    <section id="nosotros" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block">
              Quienes Somos
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Mas de 15 años transformando el mercado inmobiliario</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">Alta Soluciónes Inmobiliarias nace de la convicción de que cada chileno merece encontrar su propiedad ideal con el respaldo de expertos que realmente entienden el mercado local.</p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Desde nuestros inicios, hemos combinado tecnologia de punta con un servicio cercano y humano para ofrecer una experiencia inmobiliaria unica. Nuestro equipo de profesionales certificados trabaja incansablemente para que cada transaccion sea exitosa, segura y transparente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=700&q=80"
                alt="Equipo Alta Soluciones Inmobiliarias"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-6 max-w-xs shadow-2xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg">Premio Excelencia</div>
                  <div className="text-muted-foreground text-sm">Asociacion Gremial Inmobiliaria</div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs">Reconocidos como una de las mejores inmobiliarias de Chile por 5 anos consecutivos.</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 text-center group"
              data-testid={`card-stat-${index}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm font-medium leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
