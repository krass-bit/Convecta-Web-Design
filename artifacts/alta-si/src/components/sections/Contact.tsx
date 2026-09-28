import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: "Telefono",
    value: "+56938627229",
    href: "tel:+56938627229",
  },
  {
    icon: Mail,
    label: "Correo Electronico",
    value: "contacto@alta-si.cl",
    href: "mailto:contacto@alta-si.cl",
  },
  {
    icon: MapPin,
    label: "Direccion",
    value: "San Sebastián 2957, Las Condes, Santiago",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Horario de Atencion",
    value: "Lun-Vie 9:00-18:00 / Sab 10:00-14:00",
    href: null,
  },
];

export function Contact() {
  const [isSent, setIsSent] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    void data;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSent(true);
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/3"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-3 block"
          >
            Trabajemos Juntos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Contactanos hoy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Nuestro equipo de expertos esta listo para asesorarte. Sin compromisos, sin presiones.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-foreground font-medium hover:text-primary transition-colors text-sm"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium text-sm">{info.value}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Siguenos
              </div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-sm font-medium"
                  data-testid="link-facebook"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-sm font-medium"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-sm font-medium"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Enviar Mensaje</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Juan Garcia"
                    {...register("name", { required: true })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    data-testid="input-name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">Correo Electronico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@email.com"
                    {...register("email", { required: true })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Telefono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+56 9 xxxx xxxx"
                    {...register("phone")}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    data-testid="input-phone"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="type" className="text-sm font-medium">Tipo de Consulta</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-border/50" data-testid="select-query-type">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compra">Compra de Propiedad</SelectItem>
                      <SelectItem value="venta">Venta de Propiedad</SelectItem>
                      <SelectItem value="arriendo">Arriendo</SelectItem>
                      <SelectItem value="tasacion">Tasacion</SelectItem>
                      <SelectItem value="inversion">Inversion Inmobiliaria</SelectItem>
                      <SelectItem value="legal">Asesoria Legal</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-sm font-medium">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={5}
                  {...register("message", { required: true })}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full font-semibold"
                disabled={isSubmitting}
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>

              {isSent && (
                <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-center text-sm text-emerald-200" role="status">
                  Gracias por escribirnos. Nuestro equipo te responderá dentro de 24 horas hábiles.
                </p>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Al enviar este formulario aceptas nuestras{" "}
                <a href="#" className="text-primary hover:underline">Politicas de Privacidad</a>.
                Te responderemos en menos de 24 horas habiles.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
