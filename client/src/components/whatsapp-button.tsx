import { whatsappLink } from '@/data/constants';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="floating-whatsapp">
      <a
        href={whatsappLink()}
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-xl glow-red hover-glow"
        data-testid="whatsapp-float-btn">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}
