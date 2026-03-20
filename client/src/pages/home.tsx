import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import RoutesSection from "@/components/routes-section";
import BuggySection from "@/components/buggy-section";
import TrochaVipSection from "@/components/trocha-vip-section";
import ExtrasSection from "@/components/extras-section";
import BookingSection from "@/components/booking-section";
import FaqSection from "@/components/faq-section";
import GallerySection from "@/components/gallery-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <>
      {/* Notification Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        <i className="fas fa-exclamation-triangle mr-2"></i>
        TEMPORADA ALTA - Reservas limitadas por día - Agenda con anticipación
      </div>

      <Navigation />
      <HeroSection />
      <RoutesSection />
      <BuggySection />
      <TrochaVipSection />
      <ExtrasSection />
      <BookingSection />
      <FaqSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
