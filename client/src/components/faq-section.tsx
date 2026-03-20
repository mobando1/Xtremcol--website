import { useState } from 'react';
import { whatsappLink } from '@/data/constants';
import { useScrollAnimate } from '@/hooks/use-scroll-animate';

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
  const sectionRef = useScrollAnimate();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Preguntas Frecuentes <i className="fas fa-question-circle text-secondary ml-2"></i>
          </h2>
          <p className="text-xl text-muted-foreground">
            Todo lo que necesitas saber antes de tu aventura
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 mb-12">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="motorsport-card rounded-lg overflow-hidden scroll-animate">
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors duration-200">
                <span className="font-semibold text-lg pr-4">{item.question}</span>
                <i className={`fas fa-chevron-down text-secondary transition-transform duration-300 flex-shrink-0 ${
                  openId === item.id ? 'rotate-180' : ''
                }`}></i>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openId === item.id ? '200px' : '0',
                  opacity: openId === item.id ? 1 : 0,
                }}>
                <p className="px-5 pb-5 text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            ¿Tienes otra pregunta?
          </p>
          <a
            href={whatsappLink("Hola! Tengo una pregunta sobre las aventuras extremas")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-yellow-400 text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
            <i className="fab fa-whatsapp mr-2"></i>
            Pregunta por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
