import { Card } from "@/components/ui/card";
import { 
  Code, 
  Smartphone, 
  Brain, 
  Database, 
  Globe, 
  Zap 
} from "lucide-react";
import servicesBackground from "@/assets/services-bg.jpg";
import softwareDevImage from "@/assets/software-dev.jpg";
import webDevImage from "@/assets/web-dev.jpg";
import aiMlImage from "@/assets/ai-ml.jpg";
import dataScienceImage from "@/assets/data-science.jpg";
import desktopAppImage from "@/assets/desktop_appl.jpg";
import genAiImage from "@/assets/gen_ai.jpg";
import mlImage from "@/assets/ml.jpeg";




const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Software Development",
      description: "Custom software solutions built with modern technologies and best practices for scalable, maintainable applications.",
      technologies: ["Python", "Django", "REST APIs" ,"React", "SQL"],
      image: softwareDevImage
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Development", 
      description: "Responsive, high-performance websites and Desktop Applications with modern UI/UX design and optimal user experience.",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"],
      image: webDevImage
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Desktop Applications",
      description: "Full-stack Desktop Applications with robust backend APIs, database design, and seamless frontend integration.",
      technologies: ["Python", "Django", "SQL", "REST APIs"],
      image: desktopAppImage
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Gen AI Development",
      description: "Cutting-edge generative AI solutions, chatbots, and AI-powered applications using latest AI/ML frameworks.",
      technologies: ["OpenAI", "LangChain", "TensorFlow", "Agentic AI", "n8n Workflow Automation",""],
      image: genAiImage
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "ML Engineering",
      description: "Machine learning model development, deployment, and optimization for production-ready AI systems.",
      technologies: ["Scikit-learn", "Pandas, NumPy", "Supervised & Unsupervised Learning", "MLOps" , ""],
      image: mlImage
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Science",
      description: "Data analysis, visualization, and insights extraction to drive data-driven decision making and business growth.",
      technologies: ["Data Analysis", "Matplotlib, Seaborn", "Time Series & Forecasting", "NLP", "Feature Engineering"],
      image: dataScienceImage
    }
  ];

  return (
    <section 
      id="services" 
      className="py-24 relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${servicesBackground})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/90" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            My <span className="hero-text">Services</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs, 
            from concept to deployment and beyond.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="overflow-hidden card-hover bg-card/80 backdrop-blur-sm border border-border/50"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} - Professional software development service by Akash Yadav`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                <div className="absolute top-4 left-4 p-2 bg-primary/20 backdrop-blur-sm rounded-lg text-primary">
                  {service.icon}
                </div>
              </div>

              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to bring your project to life?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-primary text-white px-8 py-3 rounded-lg hover:shadow-primary transition-all duration-300 hover:scale-105 font-medium"
          >
            Let's Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;