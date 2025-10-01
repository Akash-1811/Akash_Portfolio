import ReceptionistaImage from "@/assets/projects/Receptionista.jpeg";
import ReceptionistaImage2 from "@/assets/projects/Receptionista2.png";
import ReceptionistaImage3 from "@/assets/projects/Receptionista3.png";
import ReceptionistaImage4 from "@/assets/projects/Receptionista4.png";
import ReceptionistaImage5 from "@/assets/projects/Receptionista5.png";
import ReceptionistaImage6 from "@/assets/projects/Receptionista6.png";
import ReceptionistaImage7 from "@/assets/projects/Receptionista7.jpeg";

import ASQSImage from "@/assets/projects/ASQS.jpeg";
import ASQSImage2 from "@/assets/projects/ASQS2.png";
import ASQSImage3 from "@/assets/projects/ASQS3.png";
import ASQSImage4 from "@/assets/projects/ASQS4.png";

import SpeakBookImage from "@/assets/projects/SpeakBook.png";
import SpeakBookImage2 from "@/assets/projects/Speekbook2.png";
import SpeakBookImage3 from "@/assets/projects/Speekbook3.png";


import aadharCapital from "@/assets/projects/aadahar_home.jpeg";
import aadharCapital2 from "@/assets/projects/aaadhar_market.jpeg";
import aadharCapital3 from "@/assets/projects/aadhar_sip.jpeg";
import aadharCapital4 from "@/assets/projects/aadhar_news.jpeg";
import aadharCapital5 from "@/assets/projects/aadhar_financila_plan.jpeg";


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";

const recentProjects = [
  {
    title: "Receptionista",
    description:
      "Receptionista is an AI-powered receptionist system that automates call handling, client interactions, and call routing. It integrates OpenAI, ElevenLabs, Twillio and Telnyx to provide natural voice conversations with real-time responses. Built with Django, React, PostgreSQL, Celery, Redis, it offers scalability, analytics, and 24/7 intelligent reception services.",
    techStack: ["React", "Django", "Python", "Docker", "Open AI", "Gemini"],
    images: [
      ReceptionistaImage,
      ReceptionistaImage2,
      ReceptionistaImage3,
      ReceptionistaImage4,
      ReceptionistaImage5,
      ReceptionistaImage6,
      ReceptionistaImage7,
    ],
    link: "", // even if empty, View Project will show
  },
  {
    title: "Aadhaar Capital",
    description:
      "Aadhaar Capital is a financial services platform that simplifies wealth management with intelligent automation and personalized recommendations. It offers smart investment strategies, insurance planning, retirement solutions, real-time market insights, and risk assessment tools—delivering a seamless experience for individuals, families, and advisors.",
    techStack: ["React", "Fast Api", "MongoDB", "AI/ML", "FinTech APIs", "Analytics"],
    images: [aadharCapital,aadharCapital2,aadharCapital3,aadharCapital4,aadharCapital5], // Using placeholder image for now
    link: "https://www.aadhaarcapital.com/",
  },
  {
    title: "SpeakBook",
    description:
      "A powerful real-time transcription platform that converts speech into accurate text while distinguishing between speakers. It provides live transcript visualization, easy file uploads, session tracking, and seamless API connectivity—making it ideal for meetings, interviews, lectures, and collaborative work.",
    techStack: ["Django", "DeepGram", "React", "WebSockets", "TTS", "STT"],
    images: [SpeakBookImage, SpeakBookImage2, SpeakBookImage3],
    link: "",
  },
  {
    title: "American Skyline Quality Standards",
    description:
      "Developed a comprehensive web application aligned with American Quality Certification Standards, featuring an advanced analytics dashboard, client and partner management modules, and standards compliance management.",
    techStack: ["Django", "AWS", "WebSockets", "TensorFlow"],
    images: [ASQSImage, ASQSImage4, ASQSImage2, ASQSImage3],
    link: "https://www.asqscertification.com/",
  },
  ,
];

const ProjectImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  if (images.length === 1) {
    return (
      <div className="relative group">
        <img src={images[0]} alt={title} className="rounded-t-2xl w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" />
        <button
          className="absolute top-3 right-3 px-3 py-1 bg-black/60 rounded text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition"
          onClick={() => window.open(images[0], "_blank")}
          title="Open full image in new tab"
        >
          Open Image
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative">
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="rounded-t-2xl w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  className="absolute top-3 right-3 px-3 py-1 bg-black/60 rounded text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition"
                  onClick={() => window.open(image, "_blank")}
                  title="Open full image in new tab"
                >
                  Open Image
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 bg-black/60 border-none text-white hover:bg-black/80" />
            <CarouselNext className="right-2 bg-black/60 border-none text-white hover:bg-black/80" />
          </>
        )}
      </Carousel>
    </div>
  );
};

const RecentProjects = () => (
  <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div className="container relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3 animate-fade-in">
          Recent <span className="hero-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">Projects</span>
        </h2>
        <div className="section-divider mb-4 animate-fade-in delay-200" />
        <p className="text-muted-foreground mb-8 text-lg animate-fade-in delay-300">
          Highlighted projects demonstrating expertise, problem-solving, and versatility across different technologies.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProjects.map((proj, i) => (
          <div
            key={i}
            className="bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 hover:scale-105 flex flex-col group relative overflow-hidden animate-fade-in"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

            <div className="relative z-10 flex flex-col h-full">
              <ProjectImageCarousel images={proj.images} title={proj.title} />
              <div className="flex-1 p-4 flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-card-foreground group-hover:text-primary transition-colors duration-300">{proj.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{proj.description}</p>
                <div className="mt-auto">
                  <a
                    href={proj.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-fit px-3 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default RecentProjects;
