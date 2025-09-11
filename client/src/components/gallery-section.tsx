import { useState } from "react";
import { contentMap } from '@/assets/contentMap';

// Using real XTREMCOL photos from contentMap
const galleryItems = contentMap.gallery.map(item => ({
  id: item.id,
  category: item.category,
  route: item.route,
  type: item.type,
  image: item.src,
  alt: item.alt
}));

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'cuatrimoto', label: 'Cuatrimoto' },
  { id: 'buggy', label: 'Can-Am' },
  { id: 'trocha', label: 'Trocha VIP' },
  { id: 'video', label: 'Videos' }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);
  
  // Show only first 6 items initially for faster loading
  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);
  const hasMoreItems = filteredItems.length > 6;

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8" data-testid="gallery-grid">
          {displayedItems.map((item) => (
            <div 
              key={item.id}
              className="relative animate-fade-in"
              data-testid={`gallery-item-${item.id}`}>
              <img 
                src={item.image}
                alt={item.alt}
                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer" 
                loading="lazy"
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
        
        {/* Ver más button for progressive loading */}
        {!showAll && hasMoreItems && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAll(true)}
              className="bg-muted hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              data-testid="gallery-load-more-btn"
            >
              <i className="fas fa-images mr-2"></i>
              Ver más fotos ({filteredItems.length - 6} restantes)
            </button>
          </div>
        )}
        
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
