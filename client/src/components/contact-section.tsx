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
            <div className="bg-muted/30 h-96 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-map text-secondary text-6xl mb-4"></i>
                <p className="text-muted-foreground">Mapa de Google embebido</p>
                <p className="text-sm text-muted-foreground">Guaduas, Cundinamarca, Colombia</p>
              </div>
            </div>
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
                href="https://wa.me/573212566270" 
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
