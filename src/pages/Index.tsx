import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import RecentWorks from "@/components/RecentWorks"; // 👈 Import new component
import WorkExperience from "@/components/WorkExperience";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div id="home">
        <HeroSection />
      </div>
      <AboutSection />
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
      <ContactSection />
    </main>
  );
};

export default Index;
