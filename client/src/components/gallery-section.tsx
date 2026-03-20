import { useState, useEffect } from "react";
import { contentMap } from '@/assets/contentMap';
import { whatsappLink } from '@/data/constants';
import { useScrollAnimate } from '@/hooks/use-scroll-animate';

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
  const sectionRef = useScrollAnimate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ image: string; alt: string } | null>(null);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);
  const hasMoreItems = filteredItems.length > 6;

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxImage]);

  return (
    <>
      <section id="galeria" className="py-16 md:py-20 bg-muted/20" style={{ contentVisibility: 'auto' }} ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Galería <i className="fas fa-images text-secondary ml-2"></i>
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubre todas nuestras aventuras
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => { setActiveFilter(filter.id); setShowAll(false); }}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-primary/20 text-muted-foreground'
                }`}>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="relative scroll-animate cursor-pointer group"
                onClick={() => item.type !== 'video' && setLightboxImage({ image: item.image, alt: item.alt })}>
                <div className="overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <i className="fas fa-play text-white text-3xl"></i>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showAll && hasMoreItems && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAll(true)}
                className="bg-muted hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                <i className="fas fa-images mr-2"></i>
                Ver más fotos ({filteredItems.length - 6} restantes)
              </button>
            </div>
          )}

          <div className="text-center">
            <a
              href={whatsappLink("Hola! Me gustó la galería. Quiero reservar una aventura")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-lg font-semibold glow-red hover-glow transition-all duration-300">
              <i className="fab fa-whatsapp mr-2"></i>
              ¿Te gustó? Reserva por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}>
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl transition-colors"
            onClick={() => setLightboxImage(null)}>
            <i className="fas fa-times"></i>
          </button>
          <img
            src={lightboxImage.image}
            alt={lightboxImage.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
