import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Building2, 
  TrendingUp,
  Code,
  Database,
  Bot,
  BarChart3
} from "lucide-react";

const WorkExperience = () => {
  const experiences = [
    {
      
        company: (
          <a
            href="https://www.gebbs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Gebbs Healthcare Solutions
          </a>
        ),
        position: "Software Engineer - Data Science",
        duration: "May 2024 – July 2025",
        location: "Mumbai India",
        type: "Full-time",
        icon: <BarChart3 className="h-6 w-6" />,


      achievements: [
        "Developed an advanced ML auditing tool using supervised learning to significantly enhance accuracy of medical coding audits",
        "Utilized Scikit-learn for anomaly detection, classification, and error prediction",
        "Conducted feature engineering to preprocess large datasets for improved model performance",
        "Created visualizations with Matplotlib/Seaborn for real-time insights to drive coding accuracy and compliance",
        "Built scalable Django application with ORM for medical coding, achieving 95% QA KPI and 1.8% efficiency gain",
        "Automated critical ops tasks with Automation bots, reducing workload by 15%",
        "Leveraged Pandas and NumPy for data analysis to optimize processes and reporting reducing handling time by 25%",
        "Supported SQL data operations including migrations and backup risk management"
      ],
      technologies: [
        "Python", "Scikit-learn", "Logistic Regression", "Pandas", "NumPy", 
        "Matplotlib", "Seaborn", "Django", "DRF", "MSSQL", "IIS"
      ],
      highlights: [
        { metric: "95%", label: "QA KPI Achievement" },
        { metric: "25%", label: "Handling Time Reduction" },
        { metric: "15%", label: "Workload Reduction" }
      ]
    },
    {
      company: (
          <a 
            href="https://yourdigitallift.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            YourDigitallift Gym Software's
          </a>
        ),
        position: "Software Developer",
        duration: "Jan 2022 - May 2024",
        location: "Mumbai, India",
        type: "Full-time",
        icon: <Code className="h-6 w-6" />,
        achievements: [
          "Led Development phases from research to implementation, with a focus on analysing and developing new features, making the software more efficient and effective",
          "Utilized Git, Docker, Django ORM, and RESTful APIs, enhancing version control, containerization, and API integration",
          "Streamlined deployment and reduced system downtime through improved development practices",
          "Applied PyTest for automated testing, resulting in a 20% decrease in bug resolution time and improving code quality across projects"
        ]
,
      technologies: [
        "Python", "Django", "Rest API", "DRF", "SQL", "GIT", 
        "Docker", "GitHub", "Pandas", "PyTest"
      ],
      highlights: [
        { metric: "20%", label: "Bug Resolution Time Reduction" },
        { metric: "100%", label: "Test Coverage Improvement" },
        { metric: "30%", label: "Deployment Efficiency" }
      ]
    }
  ];

  return (
    <section id="workexp" className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            Work <span className="hero-text">Experience</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional journey showcasing growth, impact, and technical expertise 
            across diverse projects and technologies.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="overflow-hidden card-hover bg-card/80 backdrop-blur-sm border border-border/50 p-8"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Company Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground mb-1">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Building2 className="h-4 w-4" />
                        {exp.company}
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {exp.location} • {exp.type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-card-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Key Impact
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {exp.highlights.map((highlight, idx) => (
                        <div key={idx} className="bg-primary/5 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold hero-text">
                            {highlight.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {highlight.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Achievements & Technologies */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-4">
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-4">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge 
                          key={idx}
                          className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Career Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "4+", label: "Years Experience" },
            { number: "2", label: "Companies" },
            { number: "20+", label: "Projects Delivered" },
            { number: "95%", label: "Client Satisfaction" }
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

export default WorkExperience;
