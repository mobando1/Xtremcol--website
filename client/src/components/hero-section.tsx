import { contentMap } from '../assets/contentMap';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Background Image */}
      <img 
        src={contentMap.heroImage.src}
        alt={contentMap.heroImage.alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        data-testid="hero-background-image"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide animate-fade-in" data-testid="hero-title">
          <span className="block">VIVE LA</span>
          <span className="gradient-text block">ADRENALINA</span>
          <span className="block text-3xl md:text-4xl mt-2">EN GUADUAS</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground animate-fade-in" data-testid="hero-subtitle">
          Aventura extrema en cuatrimotos y buggies Can-Am. Guaduas, Cundinamarca.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
          <a 
            href="https://wa.me/573212566270" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-lg text-lg font-bold glow-red hover-glow transition-all duration-300 flex items-center justify-center"
            data-testid="hero-whatsapp-btn">
            <img 
              src={contentMap.whatsappLogo.src} 
              alt={contentMap.whatsappLogo.alt}
              className="w-6 h-6 mr-2"
              loading="lazy"
            />
            Reserva por WhatsApp
          </a>
          <button 
            onClick={() => scrollToSection('rutas')}
            className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
            data-testid="hero-routes-btn">
            Ver Rutas
          </button>
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm animate-slide-up" data-testid="trust-badges">
          <div className="flex items-center bg-muted/50 px-4 py-2 rounded-full" data-testid="badge-guia">
            <i className="fas fa-user-tie text-secondary mr-2"></i>
            Guía profesional
          </div>
          <div className="flex items-center bg-muted/50 px-4 py-2 rounded-full" data-testid="badge-seguro">
            <i className="fas fa-shield-alt text-secondary mr-2"></i>
            Seguro médico incluido
          </div>
          <div className="flex items-center bg-muted/50 px-4 py-2 rounded-full" data-testid="badge-vehiculos">
            <i className="fas fa-car text-secondary mr-2"></i>
            Vehículos Can-Am
          </div>
        </div>
      </div>
    </section>
  );
}
