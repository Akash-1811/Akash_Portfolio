# 📅 Google Calendar Scheduling Setup Guide

This guide will help you set up the Google Calendar integration for the appointment scheduling feature.

## 🔧 Prerequisites

1. **Google Cloud Console Account**: You'll need access to Google Cloud Console
2. **Google Calendar**: Make sure you have a Google Calendar set up
3. **Environment Variables**: Ability to set environment variables in your project

## 🚀 Step-by-Step Setup

### Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create or Select a Project**
   - Create a new project or select an existing one
   - Note down your project ID

3. **Enable Google Calendar API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on it and press "Enable"

### Step 2: Create Credentials

1. **Go to Credentials**
   - Navigate to "APIs & Services" > "Credentials"

2. **Create API Key**
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
   - (Optional) Restrict the key to Google Calendar API only

3. **Create OAuth 2.0 Client ID**
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application" as application type
   - Add your domain to "Authorized JavaScript origins"
     - For development: `http://localhost:5173`
     - For production: `https://yourdomain.com`
   - Copy the Client ID

### Step 3: Environment Variables

Create a `.env` file in your project root and add:

```env
# Google Calendar API Configuration
VITE_GOOGLE_CALENDAR_API_KEY=your_api_key_here
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_GOOGLE_CALENDAR_ID=akashyadav181198@gmail.com
```

**Important Notes:**
- In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser
- The config uses `import.meta.env.VITE_*` instead of `process.env.VITE_*`
- Add `.env` to your `.gitignore` file to keep credentials secure

**Replace the values with:**
- `your_api_key_here`: The API key from Step 2
- `your_client_id_here`: The OAuth Client ID from Step 2
- `akashyadav181198@gmail.com`: Your personal Gmail account for appointments

### Step 4: Configure Calendar Settings

Update the `SchedulingModal.config.ts` file with your preferences:

```typescript
export const SCHEDULING_CONFIG = {
  BUSINESS_HOURS: {
    WORKING_DAYS: [1, 2, 3, 4, 5], // Monday to Friday
    START_HOUR: 9, // 9 AM
    END_HOUR: 18, // 6 PM
    TIMEZONE: 'Asia/Kolkata', // Your timezone
  },
  
  APPOINTMENT: {
    DAYS_AHEAD: 30, // How many days to show availability
    BUFFER_TIME: 15, // Minutes between appointments
  }
};
```

## 🔒 Security Notes

1. **API Key Security**
   - Never commit your `.env` file to version control
   - Add `.env` to your `.gitignore` file
   - Use environment variables in production

2. **OAuth Setup**
   - Configure proper authorized domains
   - Use HTTPS in production
   - Restrict API key usage to specific APIs

## 🧪 Testing

1. **Development Testing**
   - Start your development server
   - Open the chatbot and ask about scheduling
   - Click "Schedule Appointment" button
   - Test the calendar integration

2. **Production Deployment**
   - Update OAuth authorized domains
   - Set environment variables in your hosting platform
   - Test the complete flow

## 🎯 Components Included

### 1. Standalone Appointment Booking (`AppointmentBooking.tsx`)
A beautiful, independent scheduling component that can be placed anywhere on your website:

```tsx
import AppointmentBooking from '@/components/AppointmentBooking';

// Use anywhere in your app
<AppointmentBooking 
  title="Schedule a Meeting"
  subtitle="Book a consultation to discuss your project"
  className="max-w-2xl mx-auto"
/>
```

**Features:**
- ✅ Standalone component (not tied to chatbot)
- ✅ Beautiful card-based design
- ✅ Shows all appointment types with descriptions
- ✅ Contact information display
- ✅ Responsive and mobile-friendly
- ✅ Customizable title and subtitle

### 2. Chatbot Integration
- Smart detection of scheduling keywords
- "Schedule Appointment" button in chatbot
- Seamless modal integration

### 3. Scheduling Modal
- **Step 1**: Choose appointment type (Consultation, Project Discussion, Technical Review)
- **Step 2**: Select date and time from available slots
- **Step 3**: Enter contact details
- **Step 4**: Confirmation with calendar invitation

## 🎯 Features Included

### Chatbot Integration
- Smart detection of scheduling keywords
- Automatic responses about appointment options
- Direct scheduling modal trigger

### Scheduling Modal
- **Step 1**: Choose appointment type (Consultation, Project Discussion, Technical Review)
- **Step 2**: Select date and time from available slots
- **Step 3**: Enter contact details
- **Step 4**: Confirmation with calendar invitation

### Google Calendar Integration
- ✅ Real-time availability checking
- ✅ Automatic calendar event creation
- ✅ Email invitations to both parties
- ✅ Conflict prevention
- ✅ Business hours respect
- ✅ Buffer time between meetings

## 🎨 Customization

### Appointment Types
Edit the `APPOINTMENT.TYPES` array in `SchedulingModal.config.ts`:

```typescript
TYPES: [
  {
    id: 'consultation',
    name: 'Free Consultation',
    duration: 30,
    description: 'Initial project discussion'
  },
  // Add more types...
]
```

### Business Hours
Adjust working days and hours:

```typescript
BUSINESS_HOURS: {
  WORKING_DAYS: [1, 2, 3, 4, 5], // Days of week (0=Sunday)
  START_HOUR: 9,
  END_HOUR: 18,
  TIMEZONE: 'Your/Timezone'
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Gemini AI not available" Error**
   - This is expected - the system will use smart fallback responses
   - The scheduling feature works independently

2. **Calendar API Errors**
   - Check that Google Calendar API is enabled
   - Verify API key and Client ID are correct
   - Ensure proper OAuth domain configuration

3. **No Available Slots**
   - Check business hours configuration
   - Verify calendar permissions
   - Look for calendar conflicts

### Debug Mode
Enable console logging by adding to your config:

```typescript
DEBUG: true
```

## 📱 User Experience

### For Website Visitors
1. Chat with the AI bot
2. Ask about scheduling or appointments
3. Click "Schedule Appointment" button
4. Choose appointment type and time
5. Fill in contact details
6. Receive calendar invitation

### For You (Akash)
1. Automatic calendar events created
2. Email notifications for new appointments
3. Contact details included in event description
4. Proper time blocking to prevent conflicts

## 🚀 Deployment

### Environment Variables in Production
Set these in your hosting platform:
- `VITE_GOOGLE_CALENDAR_API_KEY`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_CALENDAR_ID`

### Domain Configuration
Update OAuth settings with production domain:
- Development: `http://localhost:5173`
- Production: `https://yourdomain.com`

---

## 🎉 Ready to Use!

Once configured, your portfolio will have:
- ✅ Smart chatbot responses about scheduling
- ✅ Professional appointment booking system
- ✅ Google Calendar integration
- ✅ Automatic email invitations
- ✅ Conflict prevention
- ✅ Mobile-friendly interface

Your visitors can now easily schedule appointments with you directly through your portfolio website!