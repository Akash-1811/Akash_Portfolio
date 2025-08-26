import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { SiUpwork } from "react-icons/si";

import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
} from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_jto4915",   // replace with EmailJS Service ID
        "template_rok5moa",  // replace with EmailJS Template ID
        formRef.current!,
        "8vvIoQ8LbZDTiNxLY"    // replace with EmailJS Public Key
      )
      .then(() => {
        toast({
          title: "Message Sent ✅",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        formRef.current?.reset();
      })
      .catch((error) => {
        toast({
          title: "Failed to send ❌",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
        console.error("EmailJS Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            Let's Work <span className="hero-text">Together</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to turn your ideas into reality? I'm here to help bring your project to life. 
            Let's discuss how we can collaborate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you need a complete web application, AI integration, or data analysis, 
                I'm here to help make it happen.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Card className="p-6 card-hover bg-card/80 backdrop-blur-sm border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a 
                      href="mailto:akashyadav181198@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      akashyadav181198@gmail.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 card-hover bg-card/80 backdrop-blur-sm border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a 
                      href="tel:+919022445161"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 9022445161
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 card-hover bg-card/80 backdrop-blur-sm border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      Mumbai India <br />
                      Available for remote work worldwide
                    </p>

                  </div>
                </div>
              </Card>
            </div>

            {/* Social Links */}
            <div>
  <h4 className="font-semibold mb-4">Connect With Me</h4>
  <div className="flex gap-4">
    {[
      { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
      { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/akash-yadav-4a3383240/", label: "LinkedIn" },
      { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/akash_1811/", label: "Instagram" },
      { icon: <SiUpwork className="h-5 w-5" />, href: "https://www.upwork.com/freelancers/~0188a061620eb4d6ca?viewMode=1", label: "Upwork" }, // ✅ Added Upwork
    ].map((social, index) => (
      <a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
        aria-label={social.label}
      >
        {social.icon}
      </a>
    ))}
  </div>
</div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm border border-border/50">
            <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="user_name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="user_email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Project Inquiry"
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="border-border/50 focus:border-primary resize-none"
                />
              </div>

              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-primary text-white hover:shadow-primary transition-all duration-300 hover:scale-105"
                size="lg"
              >
                {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
