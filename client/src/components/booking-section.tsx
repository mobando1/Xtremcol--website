const bookingSteps = [
  {
    number: 1,
    title: 'Elige Vehículo',
    description: 'Cuatrimoto o buggy Can-Am',
    color: 'primary'
  },
  {
    number: 2,
    title: 'Solo o en Pareja',
    description: 'Indica si vas solo o acompañado',
    color: 'primary'
  },
  {
    number: 3,
    title: 'Selecciona Ruta',
    description: 'Agua Clara, Versalles, Totumal o Pozo',
    color: 'primary'
  },
  {
    number: 4,
    title: 'Añade Video',
    description: 'Opcional: video profesional',
    color: 'secondary'
  },
  {
    number: 5,
    title: 'Fecha y Hora',
    description: 'Escoge tu día de aventura',
    color: 'primary'
  },
  {
    number: 6,
    title: 'Confirmación',
    description: 'WhatsApp + anticipo',
    color: 'primary'
  }
];

const deposits = [
  {
    type: 'Cuatrimoto',
    amount: '$100.000',
    icon: 'fas fa-motorcycle'
  },
  {
    type: 'Can-Am',
    amount: '$200.000',
    icon: 'fas fa-car'
  }
];

export default function BookingSection() {
  return (
    <section id="reservar" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="booking-title">
            Cómo Reservar <i className="fas fa-calendar-alt text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="booking-subtitle">
            6 pasos simples para tu aventura extrema
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {bookingSteps.map((step) => (
              <div key={step.number} className="text-center animate-fade-in" data-testid={`booking-step-${step.number}`}>
                <div className={`bg-${step.color} text-${step.color}-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2" data-testid={`step-title-${step.number}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`step-description-${step.number}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="motorsport-card rounded-lg p-8 animate-slide-up">
            <h3 className="text-2xl font-bold mb-6 text-center" data-testid="deposits-title">
              Anticipos Estándar
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {deposits.map((deposit) => (
                <div key={deposit.type} className="text-center p-6 bg-muted/30 rounded-lg" data-testid={`deposit-${deposit.type.toLowerCase()}`}>
                  <i className={`${deposit.icon} text-secondary text-3xl mb-4`}></i>
                  <h4 className="text-xl font-bold mb-2">{deposit.type}</h4>
                  <div className="text-2xl font-bold text-primary">{deposit.amount}</div>
                </div>
              ))}
            </div>
            
            <div className="text-center p-4 bg-secondary/10 rounded-lg mb-8" data-testid="booking-warning">
              <p className="text-secondary font-semibold">⚠️ Las reservas por día son limitadas</p>
            </div>
            
            <div className="text-center">
              <a 
                href="https://wa.me/573212566270?text=Hola! Quiero hacer una reserva para una aventura extrema"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-lg text-xl font-bold glow-red hover-glow transition-all duration-300"
                data-testid="final-booking-btn">
                <i className="fab fa-whatsapp mr-2"></i>
                Reservar Ahora por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
