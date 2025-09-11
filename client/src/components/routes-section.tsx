import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';

type Route = {
  id: string;
  name: string;
  displayName: string;
  vehicleType: string;
  duration: string;
  couplePrice: string;
  individualPrice: string;
  description: string;
  includes: string[];
};

// Route images mapping
const routeImages: Record<string, { image: string; alt: string }> = {
  agua_clara: {
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Agua Clara con vista al Río Magdalena'
  },
  salto_versalles: {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Salto Versalles con cascada'
  },
  alto_totumal: {
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Alto de Totumal con vista panorámica'
  },
  pozo_encantado: {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Pozo Encantado sendero natural'
  }
};

export default function RoutesSection() {
  const [, navigate] = useLocation();
  
  // Fetch routes from API
  const { data: allRoutes = [], isLoading } = useQuery({
    queryKey: ['/api/routes'],
    queryFn: async () => {
      const response = await fetch('/api/routes');
      if (!response.ok) throw new Error('Failed to fetch routes');
      return response.json();
    }
  });

  // Filter only cuatrimoto routes for this section
  const routes = allRoutes.filter((route: Route) => route.vehicleType === 'cuatrimoto');

  const handleBookRoute = (routeId: string) => {
    // Navigate to booking section with preselected route
    navigate(`/?vehicle=cuatrimoto&routeId=${routeId}#reservar`);
  };

  if (isLoading) {
    return (
      <section id="rutas" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-xl text-muted-foreground">Cargando rutas...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rutas" className="py-20 bg-muted/20">
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
          {routes.map((route: Route) => {
            const imageData = routeImages[route.name] || routeImages.agua_clara;
            const formattedCouplePrice = route.couplePrice ? `$${parseInt(route.couplePrice).toLocaleString()}` : 'N/A';
            const formattedIndividualPrice = route.individualPrice ? `$${parseInt(route.individualPrice).toLocaleString()}` : 'N/A';
            
            return (
              <div 
                key={route.id}
                className="motorsport-card rounded-lg overflow-hidden hover-glow transition-all duration-300 animate-fade-in"
                data-testid={`route-card-${route.name}`}>
                <img 
                  src={imageData.image}
                  alt={imageData.alt}
                  className="w-full h-48 object-cover" 
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
                    onClick={() => handleBookRoute(route.id)}
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
