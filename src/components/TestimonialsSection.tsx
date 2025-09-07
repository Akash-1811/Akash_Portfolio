import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import ShantanuImg from "@/assets/Shantanu_Deshmukh.jpg";
import SonyImage from "@/assets/sony.jpg";
import vitusImage from "@/assets/vitus.jpg";
import mervinImage from "@/assets/mervin.jpg";
import harshalImage from "@/assets/mervin.jpg";
import vivekImage from "@/assets/Vivek.jpg";
import defaultImage from "@/assets/default.jpg";
import defaultImageFem from "@/assets/defaultImageFem.jpg";






const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Shantanu Deshmukh",
      role: "Founder @American Skyline Quality Standards (ASQS).",
      image: ShantanuImg,
      content: "Akash delivered an exceptional web application that is modern, clean, responsive, and easy to navigate. It perfectly reflects the brand with a professional design and smooth performance, exceeding our expectations. His expertise and attention to detail made the entire process seamless and professional.",
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
      name: "Vivek Umrao",
      role: "Founder@, @Aadhaar Capital",
      image: vivekImage,
      content: "Akash helped me build a website for my finance and wealth management company, Aadhaar Capital. The design is excellent, with features like live market updates, an SIP calculator, and more. Just amazing!, keep up  the good work..",
      rating: 5
    },
    {
      name: "Mervin Agera",
      role: "Founder @Digilligent",
      image: mervinImage,
      content: "Akash has a strong knack for turning complex data into clear, actionable insights. His analytical mindset and the way he presents information visually made it much easier for us to make important decisions. We genuinely value his contribution.",
      rating: 5
    },
    {
      name: "Harshal Adarkar",
      role: "Founder & Director, @ShellCode It Services",
      image: defaultImage,
      content: "Working with Akash has been a game-changer for us. The custom software he built didn’t just streamline our workflow—it made day-to-day tasks so much easier. He really listened to our needs, came up with smart solutions, and delivered more than we expected. Truly grateful for his expertise and dedication.",
      rating: 5
    },
    ,
    
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
    <section id="testimonials" className="py-16 bg-background">
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