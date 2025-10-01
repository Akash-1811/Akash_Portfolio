import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SCHEDULING_CONFIG, TimeSlot, AppointmentRequest, CalendarEvent } from './SchedulingModal.config';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose }) => {
  // Check if scheduling is properly configured
  if (!SCHEDULING_CONFIG.ENABLED) {
    // Fallback to simple contact form if secrets not configured
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        >
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Scheduling Temporarily Unavailable
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Please contact me directly to schedule an appointment:
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-slate-900 dark:text-white">developerakashcontact@developerakash.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-500" />
                <span className="text-slate-900 dark:text-white">+91 9022445161</span>
              </div>
            </div>
            <Button className="w-full mt-6" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
  const { toast } = useToast();
  const [step, setStep] = useState<'type' | 'datetime' | 'details' | 'confirmation'>('type');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  // Initialize Google Calendar API
  useEffect(() => {
    if (isOpen) {
      // For now, use fallback mode to avoid CSP issues
      // The Google Calendar integration can be enabled when CSP is properly configured
      console.log('Scheduling modal opened - using fallback mode');
    }
  }, [isOpen]);

  // Note: Google Calendar API functions removed to avoid CSP issues
  // In production, these would be handled by a backend service

  const checkAvailability = async (date: Date) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate checking availability with a simple algorithm
      // In production, this would connect to your actual calendar system
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const slots = generateSimpleTimeSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error checking availability:', error);
      setError('Failed to check availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateSimpleTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const appointmentType = SCHEDULING_CONFIG.APPOINTMENT.TYPES.find(t => t.id === selectedType);
    const duration = appointmentType?.duration || SCHEDULING_CONFIG.APPOINTMENT.DEFAULT_DURATION;
    
    const startHour = SCHEDULING_CONFIG.BUSINESS_HOURS.START_HOUR;
    const endHour = SCHEDULING_CONFIG.BUSINESS_HOURS.END_HOUR;
    
    // Generate time slots with some randomly unavailable slots to simulate real calendar
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, minute, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + duration);
        
        // Only add slots that end before business hours end
        if (slotEnd.getHours() <= endHour) {
          // Simulate some unavailable slots (e.g., lunch time, existing meetings)
          const isLunchTime = hour === 12 || hour === 13;
          const randomUnavailable = Math.random() < 0.2; // 20% chance of being unavailable
          
          slots.push({
            start: slotStart,
            end: slotEnd,
            available: !isLunchTime && !randomUnavailable
          });
        }
      }
    }
    
    return slots;
  };

  const generateTimeSlots = (date: Date, existingEvents: CalendarEvent[]): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const appointmentType = SCHEDULING_CONFIG.APPOINTMENT.TYPES.find(t => t.id === selectedType);
    const duration = appointmentType?.duration || SCHEDULING_CONFIG.APPOINTMENT.DEFAULT_DURATION;
    
    const startHour = SCHEDULING_CONFIG.BUSINESS_HOURS.START_HOUR;
    const endHour = SCHEDULING_CONFIG.BUSINESS_HOURS.END_HOUR;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, minute, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + duration);
        
        // Check if this slot conflicts with existing events
        const isAvailable = !existingEvents.some(event => {
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);
          
          return (slotStart < eventEnd && slotEnd > eventStart);
        });
        
        // Only add slots that end before business hours end
        if (slotEnd.getHours() <= endHour) {
          slots.push({
            start: slotStart,
            end: slotEnd,
            available: isAvailable
          });
        }
      }
    }
    
    return slots;
  };

  const bookAppointment = async () => {
    if (!selectedTimeSlot || !userDetails.name || !userDetails.email) {
      setError('Please fill in all required details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const appointmentType = SCHEDULING_CONFIG.APPOINTMENT.TYPES.find(t => t.id === selectedType);
      
      // Format appointment details for email
      const appointmentDetails = {
        type: appointmentType?.name || 'Consultation',
        clientName: userDetails.name,
        clientEmail: userDetails.email,
        clientPhone: userDetails.phone || 'Not provided',
        description: userDetails.description || 'No additional details provided',
        appointmentDate: selectedTimeSlot.start.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        appointmentTime: `${selectedTimeSlot.start.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        })} - ${selectedTimeSlot.end.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        })}`,
        duration: appointmentType?.duration || 60,
        timezone: SCHEDULING_CONFIG.BUSINESS_HOURS.TIMEZONE
      };

      // Prepare form data for the email API (same as contact form)
      const formData = new FormData();
      formData.append('name', userDetails.name);
      formData.append('email', userDetails.email);
      formData.append('phone', userDetails.phone || '');
      formData.append('company', 'Appointment Booking');
      formData.append('subject', `New Appointment Request - ${appointmentDetails.type}`);
      formData.append('message', `
New appointment request details:

🗓️ Type: ${appointmentDetails.type}
👤 Client: ${appointmentDetails.clientName}
📧 Email: ${appointmentDetails.clientEmail}
📱 Phone: ${appointmentDetails.clientPhone}
📅 Date: ${appointmentDetails.appointmentDate}
⏰ Time: ${appointmentDetails.appointmentTime}
⏱️ Duration: ${appointmentDetails.duration} minutes
🌍 Timezone: ${appointmentDetails.timezone}

📝 Project Description:
${appointmentDetails.description}

---
This is an automated message from the appointment booking system.
Please confirm this appointment by contacting the client directly.
      `);

      // Send email notification using your existing API
      const response = await fetch('https://aadhar-capital-backend.vercel.app/submit-form-akash', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Log successful booking
        console.log('Appointment booked and email sent:', appointmentDetails);
        
        // Show success toast
        toast({
          title: "Appointment Request Sent! ✅",
          description: "You'll receive a confirmation email shortly. Akash will contact you within 24 hours.",
        });
        
        setStep('confirmation');
      } else {
        throw new Error(result.message || 'Failed to send appointment request');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError('Failed to send appointment request. Please try again or contact directly.');
      
      // Show error toast
      toast({
        title: "Failed to Send Request ❌",
        description: "Something went wrong. Please try contacting directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setStep('type');
    setSelectedType('');
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setAvailableSlots([]);
    setError('');
    setUserDetails({ name: '', email: '', phone: '', description: '' });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get next 30 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= SCHEDULING_CONFIG.APPOINTMENT.DAYS_AHEAD; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Only include working days
      if (SCHEDULING_CONFIG.BUSINESS_HOURS.WORKING_DAYS.includes(date.getDay())) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Schedule Appointment
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
                </div>
              )}

              {/* Step 1: Select Appointment Type */}
              {step === 'type' && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Choose Appointment Type
                  </h3>
                  
                  {SCHEDULING_CONFIG.APPOINTMENT.TYPES.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedType === type.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {type.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {type.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                          <Clock className="h-4 w-4" />
                          <span>{type.duration}m</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    className="w-full mt-6"
                    onClick={() => setStep('datetime')}
                    disabled={!selectedType}
                  >
                    Continue
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Select Date and Time */}
              {step === 'datetime' && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Select Date & Time
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep('type')}
                    >
                      Back
                    </Button>
                  </div>

                  {!selectedDate ? (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-900 dark:text-white">Available Dates:</h4>
                      <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                        {getAvailableDates().slice(0, 10).map((date) => (
                          <Button
                            key={date.toISOString()}
                            variant="outline"
                            className="justify-start p-3 h-auto"
                            onClick={() => {
                              setSelectedDate(date);
                              checkAvailability(date);
                            }}
                          >
                            {formatDate(date)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          {formatDate(selectedDate)}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDate(null);
                            setSelectedTimeSlot(null);
                            setAvailableSlots([]);
                          }}
                        >
                          Change Date
                        </Button>
                      </div>

                      {loading ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                          <p className="text-slate-600 dark:text-slate-400 mt-2">
                            {SCHEDULING_CONFIG.MESSAGES.LOADING}
                          </p>
                        </div>
                      ) : availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                          {availableSlots
                            .filter(slot => slot.available)
                            .map((slot, index) => (
                              <Button
                                key={index}
                                variant={selectedTimeSlot === slot ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className="text-sm"
                              >
                                {formatTime(slot.start)}
                              </Button>
                            ))}
                        </div>
                      ) : (
                        <p className="text-center text-slate-600 dark:text-slate-400 py-4">
                          {SCHEDULING_CONFIG.MESSAGES.NO_SLOTS}
                        </p>
                      )}

                      {selectedTimeSlot && (
                        <Button
                          className="w-full mt-4"
                          onClick={() => setStep('details')}
                        >
                          Continue
                        </Button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: User Details */}
              {step === 'details' && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Your Details
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep('datetime')}
                    >
                      Back
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={userDetails.name}
                          onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          value={userDetails.email}
                          onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          value={userDetails.phone}
                          onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          placeholder="+91 9022445161"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Project Description
                      </label>
                      <textarea
                        value={userDetails.description}
                        onChange={(e) => setUserDetails(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        rows={3}
                        placeholder="Brief description of your project or requirements..."
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6"
                    onClick={bookAppointment}
                    disabled={!userDetails.name || !userDetails.email || loading}
                  >
                    {loading ? SCHEDULING_CONFIG.MESSAGES.BOOKING : 'Book Appointment'}
                  </Button>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 'confirmation' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Appointment Request Received!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Your appointment request has been received. Akash will contact you within 24 hours to confirm the appointment and send you a calendar invitation.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">What happens next?</h4>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• You'll receive a confirmation email shortly</li>
                        <li>• Akash will contact you to confirm details</li>
                        <li>• A calendar invitation will be sent</li>
                        <li>• You'll receive reminder notifications</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Need immediate assistance?</h4>
                      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <p>📧 Email: developerakashcontact@developerakash.com</p>
                        <p>📱 Phone: +91 9022445161</p>
                      </div>
                    </div>
                  </div>

                  {selectedDate && selectedTimeSlot && (
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Date:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {formatDate(selectedDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Time:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {formatTime(selectedTimeSlot.start)} - {formatTime(selectedTimeSlot.end)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Type:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {SCHEDULING_CONFIG.APPOINTMENT.TYPES.find(t => t.id === selectedType)?.name}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SchedulingModal;