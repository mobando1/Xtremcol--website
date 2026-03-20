import { contentMap } from '@/assets/contentMap';
import { staticRoutes } from '@/data/routes';
import { whatsappLink } from '@/data/constants';
import { useScrollAnimate } from '@/hooks/use-scroll-animate';

// Route images mapping - now using real XTREMCOL photos
const routeImages: Record<string, { image: string; alt: string }> = {
  agua_clara: {
    image: contentMap.routeImages.agua_clara.src,
    alt: contentMap.routeImages.agua_clara.alt
  },
  salto_versalles: {
    image: contentMap.routeImages.salto_versalles.src,
    alt: contentMap.routeImages.salto_versalles.alt
  },
  alto_totumal: {
    image: contentMap.routeImages.alto_totumal.src,
    alt: contentMap.routeImages.alto_totumal.alt
  },
  pozo_encantado: {
    image: contentMap.routeImages.pozo_encantado.src,
    alt: contentMap.routeImages.pozo_encantado.alt
  }
};

export default function RoutesSection() {
  const sectionRef = useScrollAnimate();
  const routes = staticRoutes;

  const handleBookRoute = (routeName: string) => {
    // Open WhatsApp with route info
    const message = `Hola! Quiero reservar la ruta ${routeName}. ¿Tienen disponibilidad?`;
    window.open(whatsappLink(message), '_blank');
  };

  return (
    <section id="rutas" className="py-16 md:py-20 bg-muted/20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="routes-title">
            Rutas en Cuatrimotos <i className="fas fa-motorcycle text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="routes-subtitle">
            Explora los paisajes más espectaculares de Guaduas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {routes.map((route) => {
            const imageData = routeImages[route.name] || routeImages.agua_clara;
            const formattedCouplePrice = route.couplePrice ? `$${parseInt(route.couplePrice).toLocaleString()}` : 'N/A';
            const formattedIndividualPrice = route.individualPrice ? `$${parseInt(route.individualPrice).toLocaleString()}` : 'N/A';
            
            return (
              <div 
                key={route.id}
                className="motorsport-card rounded-lg overflow-hidden hover-glow scroll-animate"
                data-testid={`route-card-${route.name}`}>
                <img 
                  src={imageData.image}
                  alt={imageData.alt}
                  className="w-full h-48 object-cover" 
                  loading="lazy"
                  decoding="async"
                  data-testid={`route-image-${route.name}`}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" data-testid={`route-name-${route.name}`}>
                    {route.displayName}
                  </h3>
                  <div className="flex items-center mb-4 text-secondary" data-testid={`route-duration-${route.name}`}>
                    <i className="far fa-clock mr-2"></i>
                    <span>{route.duration}</span>
                  </div>
                  <div className="mb-4" data-testid={`route-prices-${route.name}`}>
                    <div className="text-lg font-bold text-primary">{formattedCouplePrice} pareja</div>
                    <div className="text-muted-foreground">{formattedIndividualPrice} individual</div>
                  </div>
                  <div className="mb-6" data-testid={`route-includes-${route.name}`}>
                    {route.includes.map((item, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <i className="fas fa-check text-secondary mr-2"></i>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleBookRoute(route.displayName)}
                    className="w-full bg-primary hover:bg-accent text-primary-foreground py-3 px-4 rounded-md font-semibold text-center transition-colors duration-300"
                    data-testid={`route-book-btn-${route.name}`}>
                    Reservar esta ruta
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
