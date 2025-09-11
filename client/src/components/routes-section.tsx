const routes = [
  {
    id: 'agua-clara',
    name: 'Ruta Agua Clara',
    duration: '1 hora',
    couplePrice: '$200.000',
    individualPrice: '$170.000',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Agua Clara con vista al Río Magdalena',
    whatsappMessage: 'Hola! Quiero reservar la Ruta Agua Clara en cuatrimoto'
  },
  {
    id: 'salto-versalles',
    name: 'Ruta Salto Versalles',
    duration: '1h 30m',
    couplePrice: '$240.000',
    individualPrice: '$200.000',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Salto Versalles con cascada',
    whatsappMessage: 'Hola! Quiero reservar la Ruta Salto Versalles en cuatrimoto'
  },
  {
    id: 'alto-totumal',
    name: 'Ruta Alto de Totumal',
    duration: '2 horas',
    couplePrice: '$300.000',
    individualPrice: '$260.000',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Alto de Totumal con vista panorámica',
    whatsappMessage: 'Hola! Quiero reservar la Ruta Alto de Totumal en cuatrimoto'
  },
  {
    id: 'pozo-encantado',
    name: 'Ruta Pozo Encantado',
    duration: '2h 30m',
    couplePrice: '$340.000',
    individualPrice: '$290.000',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Ruta Pozo Encantado sendero natural',
    whatsappMessage: 'Hola! Quiero reservar la Ruta Pozo Encantado en cuatrimoto'
  }
];

export default function RoutesSection() {
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
          {routes.map((route) => (
            <div 
              key={route.id}
              className="motorsport-card rounded-lg overflow-hidden hover-glow transition-all duration-300 animate-fade-in"
              data-testid={`route-card-${route.id}`}>
              <img 
                src={route.image}
                alt={route.alt}
                className="w-full h-48 object-cover" 
                data-testid={`route-image-${route.id}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" data-testid={`route-name-${route.id}`}>
                  {route.name}
                </h3>
                <div className="flex items-center mb-4 text-secondary" data-testid={`route-duration-${route.id}`}>
                  <i className="far fa-clock mr-2"></i>
                  <span>{route.duration}</span>
                </div>
                <div className="mb-4" data-testid={`route-prices-${route.id}`}>
                  <div className="text-lg font-bold text-primary">{route.couplePrice} pareja</div>
                  <div className="text-muted-foreground">{route.individualPrice} individual</div>
                </div>
                <div className="mb-6" data-testid={`route-includes-${route.id}`}>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Guía profesional</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Casco incluido</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Seguro médico</span>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/573212566270?text=${encodeURIComponent(route.whatsappMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary hover:bg-accent text-primary-foreground py-3 px-4 rounded-md font-semibold text-center block transition-colors duration-300"
                  data-testid={`route-book-btn-${route.id}`}>
                  Reservar esta ruta
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
