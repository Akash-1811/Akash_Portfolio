import ReceptionistaImage from "@/assets/projects/Receptionista.jpeg";
import ASQSImage from "@/assets/projects/ASQS.jpeg";
import SpeakBookImage from "@/assets/projects/SpeakBook.png";

const recentProjects = [
  {
    title: "Receptionista",
    description: "Receptionista is an AI-powered receptionist system that automates call handling, client interactions, and call routing. It integrates OpenAI, ElevenLabs, Twillio and Telnyx to provide natural voice conversations with real-time responses. Built with Django, React, PostgreSQL, Celery, Redis, it offers scalability, analytics, and 24/7 intelligent reception services.",
    techStack: ["React", "Django", "Python", "Docker", "Open AI", "Gemini"],
    image: ReceptionistaImage,
    link: "",
  },
  {
    title: "SpeakBook",
    description: "SpeakBook is a Django-based real-time speech-to-text transcription tool with Deepgram integration, featuring speaker diarization, live transcript display, file uploads, session management, and REST/WebSocket APIs for seamless integration.",
    techStack: ["Django", "DeepGram", "React", "WebSockets", "TTS", "STT"],
    image: SpeakBookImage,
    link: "https://yourdemo.com/audio-transcription",
  },
  {
    title: "American Skyline Quality Standards",
    description: "Developed a comprehensive web application aligned with American Quality Certification Standards, featuring an advanced analytics dashboard, client and partner management modules, and standards compliance management.",
    techStack: ["Django", "AWS", "WebSockets", "TensorFlow"],
    image: ASQSImage,
    link: "https://asqs-client.onrender.com/",
  },
];

const RecentProjects = () => (
  <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">
          Recent <span className="hero-text">Projects</span>
        </h2>
        <div className="section-divider mb-4" />
        <p className="text-muted-foreground mb-8 text-lg">
          Highlighted professional and personal projects demonstrating expertise, problem-solving, and tech stack versatility.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recentProjects.map((proj, i) => (
          <div
            key={i}
            className="bg-card/70 rounded-2xl border border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
          >
            <div className="relative group">
              <img
                src={proj.image}
                alt={proj.title}
                className="rounded-t-2xl w-full h-48 object-cover"
              />
              {/* Button to open image in new tab */}
              <button
                className="absolute top-3 right-3 px-3 py-1 bg-black/60 rounded text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition"
                onClick={() => window.open(proj.image, "_blank")}
                title="Open full image in new tab"
              >
                Open Image
              </button>
            </div>
            <div className="flex-1 p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-card-foreground">{proj.title}</h3>
              <p className="text-base text-muted-foreground mb-6">{proj.description}</p>
              {proj.link ? (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-fit px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition"
                >
                  View Project
                </a>
              ) : (
                <span className="mt-auto w-fit px-4 py-2 rounded-lg bg-zinc-700 text-muted-foreground font-semibold shadow cursor-not-allowed">
                  Private Project
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default RecentProjects;
