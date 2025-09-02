import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Award, 
  Target,
  Users,
  Lightbulb
} from "lucide-react";
import aboutMeImage from "@/assets/profile.jpeg";

const AboutSection = () => {
  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "20+ Projects",
      description: "Successfully delivered across various domains"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Happy Clients",
      description: "Building lasting relationships through quality work"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "Always exploring cutting-edge technologies"
    }
  ];

  const values = [
    "Quality First",
    "Client-Centric",
    "Continuous Learning",
    "Innovation",
    "Reliability",
    "Transparency"
  ];

  return (
    <section id="about" className="py-16 bg-gradient-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            About <span className="hero-text">Me</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate Software developer with expertise in modern technologies, 
            dedicated to creating innovative solutions that drive business success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={aboutMeImage}
                alt="Akash Yadav - Professional Software Developer specializing in web development, AI/ML, and data science"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-accent opacity-20" />
            </div>
            
            {/* Floating Stats */}
            <Card className="absolute -bottom-6 -left-6 p-6 bg-card/90 backdrop-blur-sm border border-border/50 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground">4+ Years</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Hi, I'm Akash Yadav
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A dedicated software developer with 4+ years of experience in software development, 
                web development, and emerging technologies like AI/ML. I specialize in creating 
                scalable, efficient solutions that help businesses achieve their digital goals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey began with a passion for problem-solving through code, and has evolved 
                into expertise across full-stack development, generative AI, machine learning, 
                and data science. I believe in continuous learning and staying ahead of 
                technological trends.
              </p>
            </div>

            {/* Location & Contact Info */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Available for Remote & On-site Projects</span>
            </div>

            {/* Values */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-foreground">Core Values</h4>
              <div className="flex flex-wrap gap-2">
                {values.map((value, index) => (
                  <Badge 
                    key={index} 
                    className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <Card 
              key={index}
              className="p-6 text-center card-hover bg-card/80 backdrop-blur-sm border border-border/50"
            >
              <div className="mb-4 text-primary mx-auto w-fit p-3 bg-primary/10 rounded-full">
                {achievement.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2 text-card-foreground">
                {achievement.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {achievement.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;