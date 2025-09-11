const faqItems = [
  {
    id: 'edad-minima',
    question: '¿Cuál es la edad mínima?',
    answer: '16 años para cuatrimoto, 17 años para Can-Am.'
  },
  {
    id: 'sin-experiencia',
    question: '¿Puedo manejar sin experiencia?',
    answer: '¡Sí! Son automáticos y damos una mini-clase antes de partir.'
  },
  {
    id: 'que-ropa',
    question: '¿Qué ropa debo llevar?',
    answer: 'Ropa cómoda y ligera. Recomendamos pantalón por el calor del motor.'
  },
  {
    id: 'lluvia',
    question: '¿Y si llueve?',
    answer: 'Operamos con lluvia. Si no deseas, reprogramamos según disponibilidad.'
  },
  {
    id: 'acompañante',
    question: '¿Puedo llevar acompañante?',
    answer: '¡Claro! Tenemos precios individual y pareja para todas las rutas.'
  },
  {
    id: 'pagos',
    question: '¿Cómo son los pagos?',
    answer: 'Anticipo por transferencia para reservar, saldo el día de la aventura.'
  },
  {
    id: 'punto-encuentro',
    question: '¿Dónde nos encontramos?',
    answer: 'Guaduas, Cundinamarca. Te enviamos la ubicación exacta por WhatsApp.'
  },
  {
    id: 'seguridad',
    question: '¿Qué hay de la seguridad?',
    answer: 'Guías certificados, equipos revisados y seguro médico incluido en todos los tours.'
  }
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="faq-title">
            Preguntas Frecuentes <i className="fas fa-question-circle text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="faq-subtitle">
            Todo lo que necesitas saber antes de tu aventura
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {faqItems.map((item) => (
            <div 
              key={item.id}
              className="motorsport-card rounded-lg p-6 animate-fade-in"
              data-testid={`faq-item-${item.id}`}>
              <h3 className="text-xl font-bold mb-3 text-primary" data-testid={`faq-question-${item.id}`}>
                {item.question}
              </h3>
              <p className="text-muted-foreground" data-testid={`faq-answer-${item.id}`}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6" data-testid="faq-more-questions">
            ¿Tienes otra pregunta?
          </p>
          <a 
            href="https://wa.me/573212566270?text=Hola! Tengo una pregunta sobre las aventuras extremas"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-yellow-400 text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            data-testid="faq-whatsapp-btn">
            <i className="fab fa-whatsapp mr-2"></i>
            Pregunta por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
