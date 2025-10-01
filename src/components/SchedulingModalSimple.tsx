import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SchedulingModalSimpleProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchedulingModalSimple: React.FC<SchedulingModalSimpleProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'type' | 'datetime' | 'details' | 'confirmation'>('type');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  const appointmentTypes = [
    {
      id: 'consultation',
      name: 'Free Consultation',
      duration: 30,
      description: 'Initial project discussion and requirements gathering'
    },
    {
      id: 'project-discussion',
      name: 'Project Discussion',
      duration: 60,
      description: 'Detailed project planning and technical discussion'
    },
    {
      id: 'technical-review',
      name: 'Technical Review',
      duration: 45,
      description: 'Code review or technical architecture discussion'
    }
  ];

  // Generate next 7 business days (excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    let current = 1; // Start from tomorrow
    
    while (count < 7) {
      const date = new Date(today);
      date.setDate(today.getDate() + current);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
        count++;
      }
      current++;
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const resetModal = () => {
    setStep('type');
    setSelectedType('');
    setSelectedDate('');
    setSelectedTime('');
    setUserDetails({ name: '', email: '', phone: '', description: '' });
    setLoading(false);
    setError('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const appointmentType = appointmentTypes.find(t => t.id === selectedType);
      
      // Format appointment details for email
      const appointmentDetails = {
        type: appointmentType?.name || 'Consultation',
        clientName: userDetails.name,
        clientEmail: userDetails.email,
        clientPhone: userDetails.phone || 'Not provided',
        description: userDetails.description || 'No additional details provided',
        appointmentDate: formatDate(selectedDate),
        appointmentTime: selectedTime,
        duration: appointmentType?.duration || 30
      };

      // Prepare form data for the email API
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

      if (response.ok) {
        setStep('confirmation');
      } else {
        throw new Error('Failed to send appointment request');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError('Failed to send appointment request. Please try contacting directly via email or phone.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                  
                  {appointmentTypes.map((type) => (
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

                  {/* Date Selection */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900 dark:text-white">Available Dates:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {availableDates.map((date) => (
                        <Button
                          key={date}
                          variant={selectedDate === date ? "default" : "outline"}
                          className="justify-start p-3 h-auto"
                          onClick={() => setSelectedDate(date)}
                        >
                          {formatDate(date)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-900 dark:text-white">Available Times:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <Button
                      className="w-full mt-4"
                      onClick={() => setStep('details')}
                    >
                      Continue
                    </Button>
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
                    onClick={handleSubmit}
                    disabled={!userDetails.name || !userDetails.email || loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending Request...</span>
                      </div>
                    ) : (
                      'Schedule Appointment'
                    )}
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
                      Request Sent Successfully!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Your appointment request has been submitted successfully. Akash will contact you within 24 hours to confirm the details and send you the meeting link.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Next Steps:</strong><br />
                        • You'll receive a confirmation email shortly<br />
                        • Akash will reach out to finalize the meeting details<br />
                        • A calendar invite will be sent before the meeting
                      </p>
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
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
                          {selectedTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Type:</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {appointmentTypes.find(t => t.id === selectedType)?.name}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Next Steps:</strong><br />
                      Akash will reach out to you at {userDetails.email} or {userDetails.phone} to confirm the appointment and send you the meeting details.
                    </p>
                  </div>

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

export default SchedulingModalSimple;