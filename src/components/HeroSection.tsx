import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail, Phone } from "lucide-react";
import heroBackground from "@/assets/bgr.jpg";

const HeroSection = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-hero md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn">
            Hi, I'm <span className="hero-text">Akash Yadav</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fadeIn stagger-delay-1">
            Software Developer specializing in
          </p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeIn stagger-delay-2">
            <span className="skill-badge">Web Development</span>
            <span className="skill-badge">Software Development</span>
            <span className="skill-badge">Gen AI Development</span>
            <span className="skill-badge">ML Engineering</span>
            <span className="skill-badge">Data Science</span>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeIn stagger-delay-3">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-white border-0 hover:shadow-primary transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-muted-foreground animate-fadeIn stagger-delay-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+919022445161" className="hover:text-primary transition-colors">
                +91 9022445161
              </a>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:akashyadav181198@gmail.com" className="hover:text-primary transition-colors">
                akashyadav181198@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToServices}
            className="p-2 rounded-full border border-primary/30 hover:bg-primary/10 transition-all duration-300"
            aria-label="Scroll to services"
          >
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;