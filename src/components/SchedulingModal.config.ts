// Google Calendar Scheduling Configuration
export const SCHEDULING_CONFIG = {
  // Google Calendar API Configuration
  GOOGLE_CALENDAR: {
    // Your Google Calendar API key
    API_KEY: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || '',
    // Your Google Calendar ID (extracted from the embed URL)
    CALENDAR_ID: import.meta.env.VITE_GOOGLE_CALENDAR_ID || 'akashyadav181198@gmail.com',
    // Discovery URL for Google Calendar API
    DISCOVERY_URL: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    // OAuth 2.0 Configuration
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    // Client Secret for OAuth
    CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
    // Scopes required for calendar access
    SCOPES: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
  },

  // Business Hours Configuration
  BUSINESS_HOURS: {
    // Working days (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    WORKING_DAYS: [1, 2, 3, 4, 5], // Monday to Friday
    // Working hours in 24-hour format
    START_HOUR: 9, // 9 AM
    END_HOUR: 18, // 6 PM
    // Time zone
    TIMEZONE: 'Asia/Kolkata',
  },

  // Appointment Configuration
  APPOINTMENT: {
    // Default appointment duration in minutes
    DEFAULT_DURATION: 60,
    // Available appointment types
    TYPES: [
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
    ],
    // Buffer time between appointments in minutes
    BUFFER_TIME: 15,
    // How many days ahead to show availability
    DAYS_AHEAD: 30,
  },

  // UI Configuration
  UI: {
    // Colors for different appointment types
    COLORS: {
      consultation: '#10B981', // Green
      'project-discussion': '#3B82F6', // Blue
      'technical-review': '#8B5CF6', // Purple
    },
    // Date format for display
    DATE_FORMAT: 'DD/MM/YYYY',
    TIME_FORMAT: 'HH:mm',
  },

  // Messages
  MESSAGES: {
    SUCCESS: 'Appointment scheduled successfully! You will receive a calendar invitation.',
    ERROR: 'Failed to schedule appointment. Please try again or contact directly.',
    NO_SLOTS: 'No available time slots found. Please try a different date or contact directly.',
    LOADING: 'Checking availability...',
    BOOKING: 'Scheduling your appointment...',
  }
};

// Types for scheduling
export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

export interface AppointmentRequest {
  type: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  attendeeEmail: string;
  attendeeName: string;
  description?: string;
  phoneNumber?: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}