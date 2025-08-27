import { Progress } from "@/components/ui/progress";
import { 
  Code2, 
  Database, 
  Palette, 
  Cloud, 
  Bot,
  BarChart3
} from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Backend Development", 
      skills: [
        { name: "Django, Flask, Fast APIs", level: 88 },
        { name: "Python", level: 92 },
        { name: "Rest APIs", level: 85 },
        { name: "SQL", level: 80 },
        { name: "MongoDB", level: 82 }
      ]
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML/CSS", level: 98 },
      ]
    },
    
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI & Machine Learning",
      skills: [
        { name: "Supervised & Unsupervised Learning", level: 85 },
        { name: "NLP, Computer Vision, Tenserflow, Scikit-learn", level: 90 },
        { name: "n8n Workflow Automation tool", level: 87 },
        { name: "LangChain", level: 88 },
        { name: "Gen AI, Agentic AI", level: 88 },


      ]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data Science",
      skills: [
        { name: "Pandas, Numpy", level: 90 },
        { name: "Statistics", level: 88 },
        { name: "Matplotlib/Seaborn", level: 85 },
        { name: "Jupyter", level: 92 },
        { name: "SQL", level: 88 }
      ]
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", level: 80 },
        { name: "AWS", level: 78 },
        { name: "Git/GitHub", level: 95 },
        { name: "Linux", level: 82 },
        { name: "CI/CD", level: 75 }
      ]
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Design & UX",
      skills: [
        { name: "Figma", level: 80 },
        { name: "UI/UX Design", level: 85 },
        { name: "Responsive Design", level: 92 },
        { name: "Adobe Creative", level: 75 }
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            Technical <span className="hero-text">Expertise</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive skill set across the full technology stack, 
            from frontend development to AI implementation.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 hover:shadow-elegant transition-all duration-300 hover:scale-105"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-card-foreground">
                        {skill.name}
                      </span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "20+", label: "Projects Completed" },
            { number: "4+", label: "Years Experience" },
            { number: "15+", label: "Happy Clients" },
            { number: "10+", label: "Technologies Mastered" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold hero-text mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;