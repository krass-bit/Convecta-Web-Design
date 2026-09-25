import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Propiedades", href: "#propiedades" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Testimonios", href: "#testimonios" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-border shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-20">

        {/* Left: Logo + Nav Links together */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="relative group shrink-0">
            <img
              src="/logo-alta-si.png"
              alt="Alta Soluciones Inmobiliarias"
              className="h-20 w-auto object-contain group-hover:opacity-85 transition-opacity opacity-[1]"
              style={{ filter: "brightness(1.4) contrast(1.1) drop-shadow(0 2px 8px rgba(14,165,233,0.3))" }}
            />
          </a>

          <div className="h-8 w-px bg-border/50"></div>

          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isScrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" asChild>
            <a href="#contacto">Contáctanos</a>
          </Button>
        </div>

        {/* Mobile: Logo + hamburger */}
        <a href="#inicio" className="md:hidden z-50 relative">
          <img
            src="/logo-alta-si.png"
            alt="Alta Soluciones Inmobiliarias"
            className="h-12 w-auto object-contain"
            style={{ filter: "brightness(1.4) contrast(1.1)" }}
          />
        </a>

        <button
          className="md:hidden z-50 relative p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 md:hidden transition-all duration-300 flex flex-col justify-center items-center ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center gap-8 w-full px-6">
            <img
              src="/logo-alta-si.png"
              alt="Alta Soluciones Inmobiliarias"
              className="h-20 w-auto object-contain mb-4"
              style={{ filter: "brightness(1.4) contrast(1.1)" }}
            />
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="w-full h-px bg-border my-2" />
            <div className="flex flex-col items-center gap-4 w-full">
              <a href="tel:+56223456789" className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+56 2 2345 6789</span>
              </a>
              <a href="mailto:contacto@alta-si.cl" className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contacto@alta-si.cl</span>
              </a>
            </div>
            <Button className="w-full mt-2" asChild onClick={() => setMobileMenuOpen(false)}>
              <a href="#contacto">Agendar Asesoría</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
