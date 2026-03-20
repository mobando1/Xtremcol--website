import { useState } from "react";
import { Button } from "@/components/ui/button";
import { contentMap } from "@/assets/contentMap";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={contentMap.whatsappLogo.src} 
              alt={contentMap.whatsappLogo.alt}
              className="h-10 w-auto cursor-pointer"
              onClick={() => scrollToSection('hero')} 
              data-testid="logo"
              loading="eager"
            />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('rutas')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-rutas">
              Rutas
            </button>
            <button
              onClick={() => scrollToSection('trocha-vip')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-trocha-vip">
              Trocha VIP
            </button>
            <button 
              onClick={() => scrollToSection('extras')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-extras">
              Extras
            </button>
            <button 
              onClick={() => scrollToSection('reservar')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-reservar">
              Cómo Reservar
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-faq">
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('galeria')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-galeria">
              Galería
            </button>
            <button 
              onClick={() => scrollToSection('contacto')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-contacto">
              Contacto
            </button>
          </div>

          {/* Primary CTA */}
          <a 
            href="https://wa.me/573212566270" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary hover:bg-accent text-primary-foreground px-6 py-2 rounded-md font-semibold hover-glow transition-all duration-300"
            data-testid="nav-whatsapp-cta">
            Reserva por WhatsApp
          </a>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-btn">
            <i className="fas fa-bars text-xl"></i>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('rutas')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-rutas">
                Rutas
              </button>
              <button
                onClick={() => scrollToSection('trocha-vip')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-trocha-vip">
                Trocha VIP
              </button>
              <button 
                onClick={() => scrollToSection('extras')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-extras">
                Extras
              </button>
              <button 
                onClick={() => scrollToSection('reservar')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-reservar">
                Cómo Reservar
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-faq">
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('galeria')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-galeria">
                Galería
              </button>
              <button 
                onClick={() => scrollToSection('contacto')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-contacto">
                Contacto
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
