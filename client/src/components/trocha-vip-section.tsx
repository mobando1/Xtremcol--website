import { contentMap } from '@/assets/contentMap';

const trochaOptions = [
  {
    id: 'trocha-1h',
    name: '1 Hora VIP',
    description: 'Guaduas – Lajitas – Guaduas',
    price: '$1.200.000',
    image: contentMap.trochaImages.hora_vip.src,
    alt: contentMap.trochaImages.hora_vip.alt,
    whatsappMessage: 'Hola! Quiero armar mi Trocha VIP de 1 hora',
    popular: false
  },
  {
    id: 'trocha-medio-dia',
    name: 'Medio Día VIP',
    description: 'Ruta extendida por La Magdalena – Útica – Guaduero',
    price: '$4.000.000',
    image: contentMap.trochaImages.medio_dia.src,
    alt: contentMap.trochaImages.medio_dia.alt,
    whatsappMessage: 'Hola! Quiero armar mi Trocha VIP de medio día',
    popular: true
  },
  {
    id: 'trocha-dia-completo',
    name: 'Día Completo VIP',
    description: 'Campeona – La Cabaña – Carbonera – Alto de la Rana',
    price: '$7.000.000',
    image: contentMap.trochaImages.dia_completo.src,
    alt: contentMap.trochaImages.dia_completo.alt,
    whatsappMessage: 'Hola! Quiero armar mi Trocha VIP de día completo',
    popular: false
  }
];

export default function TrochaVipSection() {
  return (
    <section id="trocha-vip" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="trocha-title">
            Trocha VIP en Can-Am <i className="fas fa-compass text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="trocha-subtitle">
            Para quienes lo quieren TODO: terrenos reales, vistas brutales, asistencia completa
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {trochaOptions.map((option) => (
            <div 
              key={option.id}
              className={`motorsport-card rounded-lg overflow-hidden hover-glow transition-all duration-300 relative animate-fade-in ${
                option.popular ? 'ring-2 ring-secondary' : ''
              }`}
              data-testid={`trocha-card-${option.id}`}>
              {option.popular && (
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold z-10" data-testid="trocha-popular-badge">
                  MÁS POPULAR
                </div>
              )}
              <img 
                src={option.image}
                alt={option.alt}
                className="w-full h-48 object-cover" 
                loading="lazy"
                data-testid={`trocha-image-${option.id}`}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" data-testid={`trocha-name-${option.id}`}>
                  {option.name}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`trocha-description-${option.id}`}>
                  {option.description}
                </p>
                <div className="text-3xl font-bold text-primary mb-6" data-testid={`trocha-price-${option.id}`}>
                  {option.price}
                </div>
                <div className="mb-6 space-y-2" data-testid={`trocha-includes-${option.id}`}>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Hidratación{option.id !== 'trocha-1h' ? ' + Almuerzo' : ' incluida'}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Asistencia mecánica</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Guía especializado</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Seguro médico</span>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/573212566270?text=${encodeURIComponent(option.whatsappMessage)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-primary hover:bg-accent text-primary-foreground py-3 px-4 rounded-md font-semibold text-center block transition-colors duration-300"
                  data-testid={`trocha-book-btn-${option.id}`}>
                  Armar Trocha VIP
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
