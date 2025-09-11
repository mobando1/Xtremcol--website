import { useState } from "react";

const galleryItems = [
  {
    id: 'agua-clara-1',
    category: 'cuatrimoto',
    route: 'agua-clara',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Cuatrimoto Agua Clara vista río Magdalena'
  },
  {
    id: 'buggy-agua-clara-1',
    category: 'buggy',
    route: 'agua-clara',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Buggy Can-Am mirador Agua Clara'
  },
  {
    id: 'salto-versalles-1',
    category: 'cuatrimoto',
    route: 'salto',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Cuatrimoto Salto Versalles cascada'
  },
  {
    id: 'buggy-salto-1',
    category: 'buggy',
    route: 'salto',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Buggy ruta Salto Versalles'
  },
  {
    id: 'totumal-1',
    category: 'cuatrimoto',
    route: 'totumal',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Vista panorámica Alto de Totumal'
  },
  {
    id: 'buggy-totumal-1',
    category: 'buggy',
    route: 'totumal',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Buggy filo montaña Totumal'
  },
  {
    id: 'pozo-encantado-1',
    category: 'cuatrimoto',
    route: 'pozo',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Sendero Pozo Encantado'
  },
  {
    id: 'trocha-1',
    category: 'trocha',
    route: 'trocha',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Terreno pedregoso Trocha VIP'
  },
  {
    id: 'trocha-2',
    category: 'trocha',
    route: 'trocha',
    type: 'foto',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Grupo Trocha VIP día completo'
  },
  {
    id: 'video-1',
    category: 'video',
    route: 'video',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Video POV aventura extrema'
  },
  {
    id: 'video-2',
    category: 'video',
    route: 'video',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Video aéreo rutas Guaduas'
  },
  {
    id: 'video-3',
    category: 'video',
    route: 'video',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    alt: 'Video aventura grupal'
  }
];

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'cuatrimoto', label: 'Cuatrimoto' },
  { id: 'buggy', label: 'Can-Am' },
  { id: 'trocha', label: 'Trocha VIP' },
  { id: 'video', label: 'Videos' }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="galeria" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="gallery-title">
            Galería <i className="fas fa-images text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="gallery-subtitle">
            Descubre todas nuestras aventuras
          </p>
        </div>
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-testid="gallery-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-primary hover:text-primary-foreground'
              }`}
              data-testid={`filter-${filter.id}`}>
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12" data-testid="gallery-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="relative animate-fade-in"
              data-testid={`gallery-item-${item.id}`}>
              <img 
                src={item.image}
                alt={item.alt}
                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer" 
                data-testid={`gallery-image-${item.id}`}
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <i className="fas fa-play text-white text-3xl"></i>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="https://wa.me/573212566270?text=Hola! Me gustó la galería. Quiero reservar una aventura"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-lg font-semibold glow-red hover-glow transition-all duration-300"
            data-testid="gallery-whatsapp-btn">
            <i className="fab fa-whatsapp mr-2"></i>
            ¿Te gustó? Reserva por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
