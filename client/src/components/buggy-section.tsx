const buggyRoutes = [
  {
    id: 'buggy-agua-clara',
    name: 'Agua Clara',
    duration: '1h - Parada mirador (10 min)',
    xdsPrice: '$400.000',
    x3Price: '$500.000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Buggy en mirador Agua Clara',
    xdsMessage: 'Hola! Quiero reservar Agua Clara Buggy XDS',
    x3Message: 'Hola! Quiero reservar Agua Clara Buggy X3'
  },
  {
    id: 'buggy-salto-versalles',
    name: 'Salto Versalles',
    duration: '1h 30m - Parada cascada (30 min)',
    xdsPrice: '$550.000',
    x3Price: '$650.000',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Buggy Salto Versalles con cascada',
    xdsMessage: 'Hola! Quiero reservar Salto Versalles Buggy XDS',
    x3Message: 'Hola! Quiero reservar Salto Versalles Buggy X3'
  },
  {
    id: 'buggy-alto-totumal',
    name: 'Alto de Totumal',
    duration: '1h 30m - 2 miradores (15 min c/u)',
    xdsPrice: '$550.000',
    x3Price: '$650.000',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    alt: 'Buggy Alto de Totumal en montaña',
    xdsMessage: 'Hola! Quiero reservar Alto de Totumal Buggy XDS',
    x3Message: 'Hola! Quiero reservar Alto de Totumal Buggy X3'
  }
];

export default function BuggySection() {
  return (
    <section id="buggy" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="buggy-title">
            Rutas en Buggy Can-Am <i className="fas fa-car text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground mb-6" data-testid="buggy-subtitle">
            Maverick XDS y X3: potencia y control
          </p>
          
          {/* Mini Comparator */}
          <div className="max-w-4xl mx-auto motorsport-card rounded-lg p-6 mb-12" data-testid="buggy-comparator">
            <h3 className="text-2xl font-bold mb-6 text-center">XDS vs X3 - Elige tu Bestia</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4">Característica</th>
                    <th className="py-3 px-4 text-center">XDS</th>
                    <th className="py-3 px-4 text-center">X3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">Potencia</td>
                    <td className="py-3 px-4 text-center">⭐⭐⭐</td>
                    <td className="py-3 px-4 text-center text-secondary">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">Suspensión</td>
                    <td className="py-3 px-4 text-center">⭐⭐⭐⭐</td>
                    <td className="py-3 px-4 text-center text-secondary">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">Feeling</td>
                    <td className="py-3 px-4 text-center">Cómodo</td>
                    <td className="py-3 px-4 text-center text-secondary">Extremo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4 p-4 bg-secondary/10 rounded-lg">
              <p className="text-secondary font-semibold" data-testid="buggy-recommendation">
                💡 Si quieres más empuje, el X3 es tu bestia
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buggyRoutes.map((route) => (
            <div 
              key={route.id}
              className="motorsport-card rounded-lg overflow-hidden hover-glow transition-all duration-300 animate-fade-in"
              data-testid={`buggy-card-${route.id}`}>
              <img 
                src={route.image}
                alt={route.alt}
                className="w-full h-48 object-cover" 
                data-testid={`buggy-image-${route.id}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" data-testid={`buggy-name-${route.id}`}>
                  {route.name}
                </h3>
                <div className="flex items-center mb-4 text-secondary" data-testid={`buggy-duration-${route.id}`}>
                  <i className="far fa-clock mr-2"></i>
                  <span>{route.duration}</span>
                </div>
                <div className="mb-4 space-y-2" data-testid={`buggy-prices-${route.id}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">XDS Pareja:</span>
                    <span className="font-bold text-primary">{route.xdsPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">X3 Pareja:</span>
                    <span className="font-bold text-secondary">{route.x3Price}</span>
                  </div>
                </div>
                <div className="mb-6" data-testid={`buggy-includes-${route.id}`}>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Guía profesional</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Gafas incluidas</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Seguro médico</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <a 
                    href={`https://wa.me/573212566270?text=${encodeURIComponent(route.xdsMessage)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-primary hover:bg-accent text-primary-foreground py-2 px-4 rounded-md font-semibold text-center block text-sm transition-colors duration-300"
                    data-testid={`buggy-xds-btn-${route.id}`}>
                    Reservar XDS
                  </a>
                  <a 
                    href={`https://wa.me/573212566270?text=${encodeURIComponent(route.x3Message)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-secondary hover:bg-yellow-400 text-secondary-foreground py-2 px-4 rounded-md font-semibold text-center block text-sm transition-colors duration-300"
                    data-testid={`buggy-x3-btn-${route.id}`}>
                    Reservar X3
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
