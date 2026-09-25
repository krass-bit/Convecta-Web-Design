import { motion } from "framer-motion";
import { Key, Home, Building2, Calculator, TrendingUp, Scale } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Key className="w-8 h-8" />,
      title: "Compra de Propiedades",
      description: "Te ayudamos a encontrar la propiedad de tus sueños con asesoría integral desde la búsqueda hasta la firma."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Venta de Propiedades",
      description: "Maximizamos el valor de tu propiedad con estrategias de marketing avanzadas y alcance a la audiencia correcta."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Arriendo",
      description: "Gestión completa de arriendos residenciales y comerciales. Evaluamos arrendatarios y administramos el contrato."
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Tasación",
      description: "Valoración profesional y precisa de tu inmueble basada en análisis de mercado en tiempo real y variables locales."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Inversión Inmobiliaria",
      description: "Asesoría experta para crear o expandir tu portafolio de inversión con propiedades de alta rentabilidad y plusvalía."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Asesoría Legal",
      description: "Acompañamiento jurídico en todo el proceso. Revisión de títulos, redacción de escrituras y trámites notariales."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <section id="servicios" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block"
          >
            Soluciones Integrales
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Nuestros Servicios
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Ofrecemos un ecosistema completo de soluciones inmobiliarias, respaldado por expertos que garantizan un proceso seguro, transparente y eficiente.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="glass-card p-8 rounded-2xl group flex flex-col items-start text-left h-full"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
