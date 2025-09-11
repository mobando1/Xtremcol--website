import { contentMap } from '@/assets/contentMap';

export default function ExtrasSection() {
  return (
    <section id="extras" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="extras-title">
            Extras <i className="fas fa-video text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="extras-subtitle">
            Revive tu aventura como una película
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="motorsport-card rounded-lg overflow-hidden hover-glow transition-all duration-300 animate-fade-in" data-testid="video-extras-card">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={contentMap.extrasPoster.src}
                  alt={contentMap.extrasPoster.alt}
                  className="w-full h-64 md:h-full object-cover" 
                  loading="lazy"
                  data-testid="video-sample-image"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-3xl font-bold mb-4" data-testid="video-title">Video Profesional</h3>
                <p className="text-muted-foreground mb-6" data-testid="video-description">
                  Cámara profesional montada, edición completa, entrega digital
                </p>
                
                <div className="space-y-4 mb-8" data-testid="video-pricing">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-semibold">Precio Online</div>
                      <div className="text-sm text-muted-foreground">Reserva por WhatsApp</div>
                    </div>
                    <div className="text-2xl font-bold text-primary" data-testid="online-price">$50.000</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-semibold">En Punto Físico</div>
                      <div className="text-sm text-muted-foreground">Compra el día del tour</div>
                    </div>
                    <div className="text-2xl font-bold text-muted-foreground" data-testid="physical-price">$70.000</div>
                  </div>
                </div>

                <div className="mb-6 space-y-2" data-testid="video-includes">
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Cámara profesional montada</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Edición profesional</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check text-secondary mr-2"></i>
                    <span className="text-sm">Entrega digital</span>
                  </div>
                </div>

                <a 
                  href="https://wa.me/573212566270?text=Hola! Quiero agregar video profesional a mi reserva"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-secondary hover:bg-yellow-400 text-secondary-foreground py-3 px-4 rounded-md font-semibold text-center flex items-center justify-center transition-colors duration-300"
                  data-testid="video-book-btn">
                  <img 
                    src={contentMap.whatsappLogo.src} 
                    alt={contentMap.whatsappLogo.alt}
                    className="w-5 h-5 mr-2"
                    loading="lazy"
                  />
                  ¡Ahorra $20.000! Reserva Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
