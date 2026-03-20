import { whatsappLink } from '@/data/constants';

const contactInfo = [
  {
    id: 'whatsapp',
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp',
    description: '+57 321 256 6270',
    bgColor: 'primary',
    textColor: 'primary-foreground'
  },
  {
    id: 'instagram',
    icon: 'fab fa-instagram',
    title: 'Instagram',
    description: '@xtremcol / @guaduasmagica',
    bgColor: 'secondary',
    textColor: 'secondary-foreground'
  },
  {
    id: 'location',
    icon: 'fas fa-map-marker-alt',
    title: 'Ubicación',
    description: 'Guaduas, Cundinamarca',
    bgColor: 'primary',
    textColor: 'primary-foreground'
  },
  {
    id: 'schedule',
    icon: 'fas fa-calendar-alt',
    title: 'Horarios',
    description: 'Fines de semana y festivos',
    subdescription: 'Cupos limitados',
    bgColor: 'secondary',
    textColor: 'secondary-foreground'
  }
];

export default function ContactSection() {
  return (
    <section id="contacto" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="contact-title">
            Ubicación y Contacto <i className="fas fa-map-marker-alt text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="contact-subtitle">
            Nos vemos en Guaduas, Cundinamarca
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <div className="motorsport-card rounded-lg overflow-hidden animate-fade-in" data-testid="map-container">
            <iframe
              title="Ubicación XTREMCOL - Guaduas, Cundinamarca"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63547.97!2d-74.6!3d5.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4078a2b8e0c2c5%3A0x5b5c5e5f6a7b8c9d!2sGuaduas%2C+Cundinamarca!5e0!3m2!1ses!2sco!4v1"
              className="w-full h-96 border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up">
            <div className="motorsport-card rounded-lg p-8" data-testid="contact-info-card">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.id} className="flex items-center" data-testid={`contact-info-${info.id}`}>
                    <div className={`bg-${info.bgColor} text-${info.textColor} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                      <i className={`${info.icon} text-xl`}></i>
                    </div>
                    <div>
                      <div className="font-semibold">{info.title}</div>
                      <div className="text-muted-foreground">{info.description}</div>
                      {info.subdescription && (
                        <div className="text-xs text-muted-foreground">{info.subdescription}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <a 
                href={whatsappLink()}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold glow-red hover-glow transition-all duration-300"
                data-testid="contact-whatsapp-btn">
                <i className="fab fa-whatsapp mr-2"></i>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
