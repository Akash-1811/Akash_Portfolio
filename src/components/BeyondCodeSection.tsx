import { Card } from "@/components/ui/card";
import {
  Camera,
  Plane,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

// Import images
import mountainImage from "../assets/mountains.jpg";
import cricketImage from "../assets/crickett.jpg";
import travelImage from "../assets/nightsky.jpg";
import trav1 from "../assets/trav1.jpeg";
import trav2 from "@/assets/trav2.jpeg";
import trav3 from "@/assets/trav6.mp4";
import trav4 from "@/assets/trav7.mp4";
import trav5 from "@/assets/trav3.jpeg";
import trav6 from "@/assets/trav5.jpeg";
import trav7 from "@/assets/trav4.jpeg";
import trav8 from "@/assets/trav8.jpeg";

const BeyondCodeSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hobbies = [
    {
      title: "Escape to the Mountains",
      description: "Finding peace in nature's grandeur and chasing breathtaking sunrises.",
      gradient: "from-blue-500 to-purple-600",
      image: mountainImage
    },
    {
      title: "Cricket Enthusiast",
      description: "Weekend matches and competitive spirit that teaches teamwork.",
      gradient: "from-green-500 to-blue-500",
      image: cricketImage
    },
    {
      title: "Capturing Journeys",
      description: "Capturing cultures and landscapes that tell stories beyond words.",
      gradient: "from-orange-500 to-red-500",
      image: travelImage
    }
  ];

  // Image/video gallery
  const travelImages = [
    { src: trav1, alt: "Mountain Adventure 1", location: "Maharashtra India" },
    { src: trav2, alt: "Mountain Adventure 2", location: "Bir HimachalPradesh" },
    { src: trav3, alt: "Mountain Adventure 3", location: "Bir HimachalPradesh" },
    { src: trav4, alt: "Mountain Adventure 4", location: "Grahan Village HimachalPradesh" },
    { src: trav5, alt: "Beach Adventure", location: "Kasol HimachalPradesh" },
    { src: trav6, alt: "City Exploration", location: "Sissu HimachalPradesh" },
    { src: trav7, alt: "Desert Safari", location: "Rohtang Pass HimachalPradesh" },
    { src: trav8, alt: "Desert Safari", location: "Sahyadri Ranges Maharashtra" },
  ];

  const nextImage = () => {
    setCurrentImageIndex(prev => Math.min(prev + 4, travelImages.length - 4));
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => Math.max(prev - 4, 0));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            Beyond <span className="hero-text">Code</span>
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            When I'm not coding, you'll find me exploring mountains or playing cricket.
          </p>
        </div>
        {/* Hobbies Grid with Video Backgrounds */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {hobbies.map((hobby, index) => (
            <Card
              key={index}
              className="relative overflow-hidden card-hover border border-border/50 p-8 text-center h-52 group cursor-pointer"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-gray-900">
                <img
                  src={hobby.image}
                  alt={hobby.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                  style={{ filter: 'brightness(0.7)' }}
                  onError={(e) => {
                    console.error(`Failed to load image for ${hobby.title}:`, hobby.image);
                    console.error('Image source:', e.currentTarget.src);
                  }}
                  onLoad={() => console.log(`Successfully loaded image for ${hobby.title}`)}
                />
                {/* Overlay for text contrast */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-center items-center text-white">
                <h3 className="text-xl font-bold mb-4 drop-shadow-lg">
                  {hobby.title}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed drop-shadow-md max-w-xs">
                  {hobby.description}
                </p>
              </div>
              {/* Hover shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </Card>
          ))}
        </div>
        {/* Inspirational Quote */}
        <div className="text-center mb-8">
          <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
  "Travel heals my heart. Cricket trains my mind. One gives me peace, the other gives me strategy. Together, they make me code better."
  <footer className="mt-2 text-right font-semibold text-gray-600">– Akash Yadav</footer>
</blockquote>

        </div>
        {/* Travel Gallery with Slider */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Plane className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Travel Memories</h3>
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm">
              Adventures that inspire creativity and broaden perspective
            </p>
          </div>
          {/* Image Grid with Navigation */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {travelImages.slice(currentImageIndex, currentImageIndex + 4).map((image, idx) => (
                <div
                  key={currentImageIndex + idx}
                  className="relative group overflow-hidden rounded-lg aspect-[4/3]"
                >
                  {image.src.endsWith(".mp4") ? (
                    <video
                      src={image.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      <span className="font-medium truncate">{image.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevImage}
                disabled={currentImageIndex === 0}
                className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted/70 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
                aria-label="Previous images"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Previous</span>
              </button>
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(travelImages.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index * 4)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      Math.floor(currentImageIndex / 4) === index
                        ? 'bg-primary'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextImage}
                disabled={currentImageIndex + 4 >= travelImages.length}
                className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted/70 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
                aria-label="Next images"
              >
                <span className="text-sm">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
          </div>
          {/* Add More Photos Placeholder */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-muted-foreground text-xs">
              <Camera className="h-3 w-3" />
              <span>More adventures coming soon...</span>
              <Heart className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondCodeSection;
