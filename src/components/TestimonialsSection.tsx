import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import ShantanuImg from "@/assets/Shantanu_Deshmukh.jpg";
import SonyImage from "@/assets/sony.jpg";
import vitusImage from "@/assets/vitus.jpg";



const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Shantanu Deshmukh",
      role: "Founder @American Skyline Quality Standards (ASQS).",
      image: ShantanuImg,
      content: "Akash delivered an exceptional web application that exceeded our expectations. His expertise in React and attention to detail made the entire process smooth and professional.",
      rating: 5
    },
    {
      name: "Sony Yadav",
      role: "Founder @Techezer",
      image: SonyImage,
      content: "Outstanding work! Aksah delivered high-quality results with impressive speed and accuracy. Their professionalism, attention to detail, and excellent communication made the process smooth and efficient. Highly recommend for anyone looking for reliable and skilled support. Will definitely hire again for future projects. Great job",
      rating: 5
    },
    {
      name: "Vitus Rodrigo",
      role: "Founder-CEO @TheHubCode",
      image: vitusImage, 
      content: "I had a web software for my work that was outdated, relatively slow, and offered a poor user experience. Then, I contacted Akash to redesign the product, and the result exceeded my expectations. He not only revamped the software but also added several additional features that I hadn’t requested, which significantly enhanced the overall user experience.",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "CTO, DataFlow Systems",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "The custom software solution Akash built for us streamlined our entire workflow. His technical skills and problem-solving approach are truly impressive.",
      rating: 5
    },
    {
      name: "Lisa Wang",
      role: "Marketing Director, GrowthCo",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      content: "Akash's generative AI chatbot revolutionized our customer service. The implementation was flawless and the results have been phenomenal for our business.",
      rating: 5
    },
    {
      name: "James Miller",
      role: "Operations Manager, ScaleTech",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content: "The data science insights Akash provided helped us make critical business decisions. His analytical approach and visualization skills are top-notch.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            Client <span className="hero-text">Testimonials</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients say about 
            working with me and the results we've achieved together.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 card-hover bg-card/80 backdrop-blur-sm border border-border/50 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="h-8 w-8 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                "{testimonial.content}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-card-foreground text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to join these satisfied clients?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-primary text-white px-8 py-3 rounded-lg hover:shadow-primary transition-all duration-300 hover:scale-105 font-medium"
          >
            Start Your Project Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;