import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SchedulingModal from './SchedulingModal';

interface AppointmentBookingProps {
  className?: string;
  title?: string;
  subtitle?: string;
  showIcon?: boolean;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  className = "",
  title = "Schedule a Meeting",
  subtitle = "Book a consultation to discuss your project",
  showIcon = true
}) => {
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const appointmentTypes = [
    {
      name: "Free Consultation",
      duration: "30 min",
      description: "Initial project discussion and requirements gathering",
      icon: User,
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Project Discussion", 
      duration: "60 min",
      description: "Detailed project planning and technical discussion",
      icon: Calendar,
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Technical Review",
      duration: "45 min", 
      description: "Code review or technical architecture discussion",
      icon: Clock,
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <>
      <div className={`${className}`}>
        <Card className="p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            {showIcon && (
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            )}
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {subtitle}
            </p>
          </div>

          {/* Appointment Types */}
          <div className="grid gap-4 mb-8">
            {appointmentTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                    <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mr-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {type.name}
                        </h3>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                          {type.duration}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              You'll be meeting with Akash Yadav
            </h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>📧 Email: akashyadav181198@gmail.com</p>
              <p>📱 Phone: +91 9022445161</p>
              <p>🕐 Timezone: Asia/Kolkata (IST)</p>
              <p>📅 Available: Monday - Friday, 9 AM - 6 PM</p>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => setIsSchedulingOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Book Your Appointment</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              🔒 Your information is secure • 📧 Calendar invite will be sent automatically
            </p>
          </div>
        </Card>
      </div>

      {/* Scheduling Modal */}
      <SchedulingModal 
        isOpen={isSchedulingOpen} 
        onClose={() => setIsSchedulingOpen(false)} 
      />
    </>
  );
};

export default AppointmentBooking;