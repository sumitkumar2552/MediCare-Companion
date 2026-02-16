# 🩺 MediCare Companion – Medication Adherence App

A simple, user-friendly medication adherence web application built as part of the **React Developer Assignment** for *GravityWrite / WebsiteLearners Pvt. Ltd.*

This application helps **patients** track their daily medication and allows **caretakers** to monitor adherence, missed doses, and receive reminders.

---

## 🎯 Problem Statement (As per Assignment)

The goal was to build a **simple medication adherence application** that:
- Allows a patient to mark medication as taken
- Allows a caretaker to monitor adherence
- Sends reminders when medication is missed

> Focus was on **core functionality**, not pixel-perfect UI or production-grade infrastructure.

---

## 👥 User Roles

### 1️⃣ Patient
- Login to the app
- View today’s medication
- Mark medication as **Taken** (only for current day)
- View medication history using a calendar

### 2️⃣ Caretaker
- Login using same system
- Monitor patient’s medication adherence
- View:
  - Today’s medication status (Pending / Taken)
  - Calendar view (Taken / Missed)
  - Adherence rate, streak, missed count
- Configure email notification preferences

---

## ✅ Features Implemented

### 🔐 Authentication
- Firebase Authentication (Email/Password)
- Single login system for both Patient & Caretaker

### 💊 Medication Tracking (Patient)
- Daily medication display with scheduled time
- Mark medication as **Taken** (restricted to today)
- Optional proof photo upload (UI-level)
- Calendar highlights:
  - Green → Taken
  - Blue → Today
  - Red → Missed

### 🧑‍⚕️ Caretaker Dashboard
- Overview metrics:
  - Adherence Rate
  - Current Streak
  - Missed This Month
  - Taken This Week
- Tabs:
  - Overview
  - Recent Activity
  - Calendar View
  - Notifications

### 📧 Notifications
- Email notification preferences
- Missed medication alert configuration
- Reminder email preview

> ⚠️ Email sending is simulated (as allowed by assignment scope)

---

## 🛠 Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Backend / Auth:** Firebase Authentication
- **Database:** Firebase Firestore
- **Deployment:** Lovable (Vercel-style hosting)

---

## 🧠 Design Decisions

- Focused on **clarity and usability** rather than complex flows
- Used a **single medication per day** to keep scope aligned with assignment
- Email reminders implemented at UI/config level (no cron jobs)
- Calendar-based visualization for better adherence tracking

---

## 🚀 How to Run Locally

```bash
# Clone repository
git clone <your-repo-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

> Firebase keys are required in `.env` file for authentication & Firestore.

---

