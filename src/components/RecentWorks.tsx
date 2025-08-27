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
    title: "SpeakBook",
    description:
      "SpeakBook is a Django-based real-time speech-to-text transcription tool with Deepgram integration, featuring speaker diarization, live transcript display, file uploads, session management, and REST/WebSocket APIs for seamless integration.",
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
    link: "https://asqs-client.onrender.com/",
  },
];

const ProjectImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  if (images.length === 1) {
    return (
      <div className="relative group">
        <img src={images[0]} alt={title} className="rounded-t-2xl w-full h-48 object-cover" />
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
                  className="rounded-t-2xl w-full h-48 object-cover"
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
  <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">
          Recent <span className="hero-text">Projects</span>
        </h2>
        <div className="section-divider mb-4" />
        <p className="text-muted-foreground mb-8 text-lg">
          Highlighted projects demonstrating expertise, problem-solving, and versatility across different technologies.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recentProjects.map((proj, i) => (
          <div
            key={i}
            className="bg-card/70 rounded-2xl border border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
          >
            <ProjectImageCarousel images={proj.images} title={proj.title} />
            <div className="flex-1 p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-card-foreground">{proj.title}</h3>
              <p className="text-base text-muted-foreground mb-6">{proj.description}</p>
              <a
                href={proj.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-fit px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default RecentProjects;
