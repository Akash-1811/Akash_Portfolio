import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import RecentWorks from "@/components/RecentWorks"; // 👈 Import new component
import WorkExperience from "@/components/WorkExperience";
import BeyondCodeSection from "@/components/BeyondCodeSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import GameModal from "@/components/GameModal";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO />
      <Navigation />
      <div id="home">
        <HeroSection />
      </div>
      <AboutSection />
      <BeyondCodeSection />
      <ServicesSection />
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="workexp">
        <WorkExperience />
      </div>

      {/* 👇 Added Recent Works Section */}
      <div id="recent-works">
        <RecentWorks />
      </div>

      <TestimonialsSection />
      <div id="contact">
        <ContactSection />
      </div>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Game Modal */}
      <GameModal />
    </main>
  );
};

export default Index;
