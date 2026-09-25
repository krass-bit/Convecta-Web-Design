import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div>
              <img
                src="/logo-alta-si.png"
                alt="Alta Soluciones Inmobiliarias"
                className="h-24 w-auto object-contain opacity-[1]"
                style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2)) brightness(1.35) contrast(1.1)" }}
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformando el mercado inmobiliario en Chile a través de un servicio premium, tecnología de punta y asesoría experta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Enlaces Rápidos</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors text-sm">Inicio</a></li>
              <li><a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors text-sm">Servicios</a></li>
              <li><a href="#propiedades" className="text-muted-foreground hover:text-primary transition-colors text-sm">Propiedades Destacadas</a></li>
              <li><a href="#nosotros" className="text-muted-foreground hover:text-primary transition-colors text-sm">Sobre Nosotros</a></li>
              <li><a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Servicios</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors text-sm">Compra de Propiedades</a></li>
              <li><a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors text-sm">Venta de Propiedades</a></li>
              <li><a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors text-sm">Arriendo</a></li>
              <li><a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors text-sm">Tasación</a></li>
              <li><a href="#servicios" className="text-muted-foreground hover:text-primary transition-colors text-sm">Inversión Inmobiliaria</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contacto</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Av. Providencia 2360,<br />Providencia, Santiago, Chile</span>
              </li>
              <li className="flex gap-3 text-muted-foreground text-sm items-center">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+56 2 2345 6789</span>
              </li>
              <li className="flex gap-3 text-muted-foreground text-sm items-center">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contacto@alta-si.cl</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Alta Soluciones Inmobiliarias. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-primary transition-colors">Políticas de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
