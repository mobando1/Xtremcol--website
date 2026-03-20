import { useScrollAnimate } from '@/hooks/use-scroll-animate';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Carolina M.',
    route: 'Ruta Alto de Totumal',
    rating: 5,
    text: 'Increíble experiencia. El guía super profesional y las vistas desde el mirador son impresionantes. Volvemos seguro.',
  },
  {
    id: 'testimonial-2',
    name: 'Andrés & Laura',
    route: 'Trocha VIP Medio Día',
    rating: 5,
    text: 'Lo mejor que hemos hecho en mucho tiempo. La adrenalina del Can-Am X3 es otra cosa. El almuerzo típico al final fue el toque perfecto.',
  },
  {
    id: 'testimonial-3',
    name: 'Santiago R.',
    route: 'Ruta Pozo Encantado',
    rating: 5,
    text: 'Primera vez en cuatrimoto y fue espectacular. La ruta hasta el pozo es hermosa y el baño al final es lo mejor. 100% recomendado.',
  },
  {
    id: 'testimonial-4',
    name: 'Familia Gómez',
    route: 'Ruta Agua Clara',
    rating: 5,
    text: 'Fuimos con los hijos adolescentes y la pasamos increíble. Todo muy seguro, cascos, seguro médico, guía atento. Volveremos por la Trocha VIP.',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <i key={i} className="fas fa-star text-secondary text-sm"></i>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useScrollAnimate();
  return (
    <section className="py-16 md:py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lo que dicen nuestros aventureros <i className="fas fa-star text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground">
            +500 aventureros han vivido la experiencia XTREMCOL
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="motorsport-card rounded-lg p-6 scroll-animate flex flex-col"
            >
              <StarRating rating={t.rating} />
              <p className="text-muted-foreground mt-4 mb-6 flex-1 text-sm leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-secondary">{t.route}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
