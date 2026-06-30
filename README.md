# 🏥 MediCare Connect

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Stripe-Payment-blue?style=for-the-badge&logo=stripe" />
  <img src="https://img.shields.io/badge/Better%20Auth-Authentication-orange?style=for-the-badge" />
</p>

<p align="center">
  A modern healthcare management platform that connects patients, doctors, and administrators through a centralized online appointment and healthcare management system.
</p>

---

## 🔗 Live Links

🌐 **Live Site:** https://medicare-connect-green.vercel.app/

💻 **Client Repository:** https://github.com/Palash-4/MediCare-Connect

⚙️ **Server Repository:** https://github.com/Palash-4/Medicare-Connect-server

---

# 📖 Project Overview

MediCare Connect is a full-stack healthcare management platform built to simplify hospital appointment booking and healthcare services management.

The platform allows:

- Patients to search doctors and book appointments
- Doctors to manage schedules and appointments
- Admins to manage users, doctors, payments, and analytics
- Secure online consultation fee payments using Stripe
- Role-based dashboard access and protected routes

The main goal of this project is to reduce manual appointment booking processes and provide a seamless digital healthcare experience.

---

# ✨ Key Features

## 🔐 Authentication System

- Email & Password Authentication
- Google Login
- Better Auth Integration
- Protected Routes
- Role-Based Authorization
- Persistent Login Session

---

## 🏠 Public Pages

### Home Page
- Healthcare Banner
- Featured Doctors
- Medical Specializations
- Platform Statistics
- Patient Testimonials
- Why Choose MediCare Connect Section
- Framer Motion Animations

### Doctor Pages
- Find Doctors
- Search by Name
- Search by Specialization
- Doctor Details Page
- Pagination Support
- Sorting by:
  - Consultation Fee
  - Experience
  - Highest Rating

### Other Pages
- About Us
- Contact Us
- Login
- Register

---

# 👨‍⚕️ Patient Dashboard

## Dashboard Overview
- Total Appointments
- Total Doctors
- Medical Records
- Ratings Overview

## My Appointments
- View Appointments
- Cancel Appointment
- Appointment Status
- Payment Status

## Payment System
- Stripe Payment Gateway Integration
- Secure Payment Processing
- Consultation Fee Payment
- Transaction Record Storage
- Payment History

## Reviews
- Add Review
- Update Review
- Delete Review

## Profile
- Update Personal Information
- Profile Management

---

# 🩺 Doctor Dashboard

## Dashboard Overview
- Total Patients
- Appointment Statistics
- Reviews Overview

## Appointment Requests
- Accept Appointment
- Reject Appointment
- View Patient Information
- Appointment Status Management

## Prescription Management
- Create Prescription
- Update Prescription

## Profile Management
- Qualifications
- Experience
- Consultation Fee
- Available Slots
- Available Days

---

# 👨‍💼 Admin Dashboard

## Dashboard Overview
- Total Users
- Total Doctors
- Total Patients
- Total Appointments
- Total Payments

## Manage Users
- View Users
- Delete User
- Suspend User

## Manage Doctors
- Verify Doctor
- Reject Verification
- Update Verification Status

## Manage Appointments
- View All Appointments
- Monitor Appointment Status

## Payment Management
- View Payment Records
- Monitor Transactions

## Analytics
- Doctor Performance
- Total Patients
- Total Doctors
- Total Appointments
- Recharts Integration

---

# 💳 Payment Integration

- Stripe Payment Gateway
- Secure Card Payment
- Consultation Fee Payment
- Payment Status Storage
- Transaction History Management

---

# 📱 Responsive Design

Fully Responsive on:

- Mobile Devices
- Tablets
- Desktop Devices

---

# 🛡 Security Features

- JWT Authentication
- Protected API Routes
- Role-Based Access Control
- Secure Environment Variables
- Server-Side Validation
- MongoDB Data Protection

---

# 🧰 Technology Stack

## Frontend
- Next.js 16
- React.js
- Tailwind CSS
- DaisyUI
- HeroUI
- Framer Motion
- React Icons
- React Hot Toast
- Recharts
- Stripe

## Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Stripe API

## Authentication
- Better Auth
- Google OAuth

## Deployment
- Vercel
- MongoDB Atlas

---

# 🗄 Database Collections

### Users
- name
- email
- role
- photo
- phone
- gender
- status
- createdAt

### Doctors
- doctorName
- specialization
- qualifications
- experience
- consultationFee
- hospitalName
- profileImage
- availableDays
- availableSlots
- verificationStatus

### Appointments
- patientId
- doctorId
- appointmentDate
- appointmentTime
- appointmentStatus
- symptoms
- paymentStatus

### Reviews
- patientId
- doctorId
- rating
- reviewText
- createdAt

### Payments
- appointmentId
- patientId
- doctorId
- amount
- transactionId
- paymentDate

### Prescriptions
- doctorId
- patientId
- appointmentId
- diagnosis
- medications
- notes
- createdAt

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Palash-4/MediCare-Connect.git
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# 🔑 Environment Variables

### Client

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_IMGBB_API_KEY=
```

### Server

```env
PORT=
MONGODB_URI=
CLIENT_URI=
STRIPE_SECRET_KEY=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_SECRET=
```

---

# 👨‍💻 Developer

### MD. Hasan Al Tarek Palash

🎓 Undergraduate Student  
Department of Computer Science & Engineering  
Daffodil International University (DIU)

🌐 Portfolio:
https://hasan-al-tarek-palash.vercel.app/

💼 LinkedIn:
https://www.linkedin.com/in/hasan-al-tarek-palash-9ab643323/

🐙 GitHub:
https://github.com/Palash-4

---

# ⭐ If you like this project, consider giving it a star on GitHub.