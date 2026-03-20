import { whatsappLink } from '@/data/constants';

const quickLinks = [
  { name: 'Rutas', href: '#rutas' },
  { name: 'Buggy Can-Am', href: '#buggy' },
  { name: 'Trocha VIP', href: '#trocha-vip' },
  { name: 'Extras', href: '#extras' },
  { name: 'Cómo Reservar', href: '#reservar' }
];

const infoLinks = [
  { name: 'FAQ', href: '#faq' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Contacto', href: '#contacto' }
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2" data-testid="footer-brand">
            <h3 className="text-2xl font-bold gradient-text tracking-wider mb-4">XTREMCOL</h3>
            <p className="text-muted-foreground mb-4">
              Aventura extrema en cuatrimotos y buggies Can-Am en Guaduas, Cundinamarca. 
              Guías profesionales y seguro médico incluido.
            </p>
            <div className="flex space-x-4" data-testid="footer-social">
              <a 
                href={whatsappLink()}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors duration-300"
                data-testid="footer-whatsapp">
                <i className="fab fa-whatsapp text-2xl"></i>
              </a>
              <a
                href="https://instagram.com/xtremcol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition-colors duration-300"
                data-testid="footer-instagram">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://instagram.com/guaduasmagica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 transition-colors duration-300"
                data-testid="footer-instagram-guaduas">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div data-testid="footer-quick-links">
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-primary transition-colors duration-300"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Información */}
          <div data-testid="footer-info-links">
            <h4 className="text-lg font-bold mb-4">Información</h4>
            <ul className="space-y-2 text-muted-foreground">
              {infoLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-primary transition-colors duration-300"
                    data-testid={`footer-info-${link.name.toLowerCase()}`}>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Aviso de responsabilidad */}
        <div className="border-t border-border pt-8">
          <div className="motorsport-card rounded-lg p-4 mb-6" data-testid="footer-disclaimer">
            <p className="text-sm text-muted-foreground text-center">
              <i className="fas fa-exclamation-triangle text-secondary mr-2"></i>
              <strong>Aviso de Responsabilidad:</strong> Las actividades de turismo de aventura implican riesgos inherentes. 
              Los participantes lo hacen bajo su propia responsabilidad. Contamos con seguros y guías certificados 
              para minimizar los riesgos. Seguimiento estricto de protocolos de seguridad.
            </p>
          </div>
          
          <div className="text-center text-sm text-muted-foreground" data-testid="footer-copyright">
            <p>&copy; {new Date().getFullYear()} XTREMCOL. Todos los derechos reservados. | Turismo de aventura en Guaduas, Cundinamarca</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
