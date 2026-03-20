import { contentMap } from '../assets/contentMap';
import { whatsappLink } from '@/data/constants';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <img
        src={contentMap.heroImage.src}
        alt={contentMap.heroImage.alt}
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in uppercase">
          <span className="block">Vive la</span>
          <span className="gradient-text block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Adrenalina</span>
          <span className="block text-xl sm:text-2xl md:text-3xl mt-3 font-semibold tracking-widest text-muted-foreground">en Guaduas, Cundinamarca</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80 animate-fade-in">
          Cuatrimotos y buggies Can-Am por los paisajes más espectaculares del país.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-lg text-lg font-bold glow-red hover-glow transition-all duration-300">
            <i className="fab fa-whatsapp mr-2"></i>
            Reserva Ahora
          </a>
          <button
            onClick={() => scrollToSection('rutas')}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300">
            Ver Rutas
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm animate-slide-up">
          <div className="flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <i className="fas fa-user-tie text-secondary mr-2"></i>
            Guía profesional
          </div>
          <div className="flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <i className="fas fa-shield-alt text-secondary mr-2"></i>
            Seguro médico
          </div>
          <div className="flex items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <i className="fas fa-car text-secondary mr-2"></i>
            Vehículos Can-Am
          </div>
        </div>
      </div>
    </section>
  );
}
