# NivaranX 🏛️
### AI Powered Smart Civic Grievance Management System

![NivaranX](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![AI](https://img.shields.io/badge/AI-Groq-purple)

## 🌐 Live Demo
**Frontend:** https://nivaran-x.vercel.app  
**Backend:** https://nivaranx.onrender.com  
**GitHub:** https://github.com/piyush12-ux/NivaranX

---

## 📌 What is NivaranX?

NivaranX is an **AI-powered grievance management platform** built for citizens and government departments. 

In India, millions of public complaints go unheard every day — broken roads, water supply issues, electricity problems, garbage collection failures. Existing government portals like PGPortal are **outdated, slow, and lack AI automation**.

**NivaranX solves this problem** by providing a modern, intelligent platform where:
- Citizens can easily **submit complaints with photo evidence**
- AI automatically **detects fake/spam complaints**
- Admins can **efficiently manage and resolve** issues
- Users can **track their complaint status** in real-time

---

## 🎯 Problem It Solves

| Problem | NivaranX Solution |
|---|---|
| No easy way to report public issues | Simple complaint form with photo upload |
| Fake & spam complaints waste resources | AI fake complaint detection |
| No tracking after complaint submission | Real-time status tracking |
| Abusive language in complaints | Profanity filter |
| Manual complaint categorization | AI-powered auto detection |
| No communication between citizen & admin | Notification system |
| Outdated government portals | Modern dark UI with animations |
| Bots submitting fake complaints | Rate limiting (5 complaints/day) |

---

## 🔄 How It Works

```
Citizen registers → Submits complaint with photo
        ↓
AI checks if complaint is genuine or fake
        ↓
Complaint saved in database
        ↓
Admin reviews & updates status
        ↓
Citizen gets notification
        ↓
Complaint resolved! ✅
```

---

## ✨ Features

### 👤 Citizen Features
- Register/Login with JWT Authentication
- Submit complaints with photo evidence (mandatory)
- Track complaint status in real-time
- View complaint history & details
- Search & filter complaints by category
- AI Chatbot support 24/7
- Real-time notifications when status changes
- Profile management
- Forgot password & reset

### 👨‍💼 Admin Features
- Admin dashboard with real-time analytics
- View & manage all complaints
- Update complaint status (Submitted → In Progress → Resolved)
- Search & filter complaints by title, user, location
- Filter by category & status
- Real-time statistics (Total, Pending, Resolved, Users)

### 🤖 AI Features
- AI Fake Complaint Detection (Groq AI — Llama 3.1)
- AI Chatbot Assistant (answers in Hindi & English)
- Profanity & abuse filtering

### 🔒 Security Features
- JWT Authentication & Authorization
- bcrypt Password Hashing
- Rate Limiting (5 complaints/day per user)
- Role-based Access Control (Citizen/Admin)
- File Upload Validation (JPG, PNG, JPEG only)
- Profanity Filter
- Helmet.js Security Headers
- CORS Protection

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + Vite | Frontend Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | API Calls |
| React Hot Toast | Toast Notifications |
| React Router DOM | Client-side Routing |

### Backend
| Package | Purpose |
|---|---|
| Node.js + Express.js | Backend Framework |
| MongoDB + Mongoose | Database & ODM |
| jsonwebtoken | JWT Authentication |
| bcryptjs | Password Hashing |
| multer | Image Upload Handling |
| express-rate-limit | API Rate Limiting |
| helmet | Security HTTP Headers |
| cors | Cross Origin Resource Sharing |
| leo-profanity | Profanity Filter |
| groq-sdk | AI Integration (Llama 3.1) |
| nodemon | Development Auto-restart |

---

## 📁 Folder Structure

```
NivaranX/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable Components
│   │   │   ├── Chatbot.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/          # All Pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ComplaintDetail.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── context/        # Auth Context
│   │   └── services/       # API Services
│
├── server/                 # Node.js Backend
│   ├── controllers/        # Business Logic
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   ├── adminController.js
│   │   ├── chatController.js
│   │   └── notificationController.js
│   ├── routes/             # API Routes
│   ├── models/             # Database Models
│   ├── middleware/         # Auth & Security Middleware
│   ├── uploads/            # Uploaded Images
│   └── index.js            # Server Entry Point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas Account
- Groq API Key (free at console.groq.com)

### Installation

**Clone the repository:**
```bash
git clone https://github.com/piyush12-ux/NivaranX.git
cd NivaranX
```

**Backend Setup:**
```bash
cd server
npm install
```

**Create `.env` file in server folder:**
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

**Start Backend:**
```bash
npm run dev
```

**Frontend Setup:**
```bash
cd client
npm install
npm run dev
```

---

## 📊 Database Models

### Users
| Field | Type | Description |
|---|---|---|
| name | String | User's full name |
| email | String | Unique email |
| password | String | bcrypt hashed |
| phone | String | Phone number |
| role | String | citizen / admin |

### Complaints
| Field | Type | Description |
|---|---|---|
| user | ObjectId | Reference to User |
| title | String | Complaint title (min 10 chars) |
| description | String | Details (min 20 chars) |
| category | String | Road/Water/Electricity etc |
| priority | String | low/medium/high/emergency |
| status | String | submitted → resolved |
| image | String | Photo evidence filename |
| location | String | Complaint location |

### Notifications
| Field | Type | Description |
|---|---|---|
| user | ObjectId | Reference to User |
| message | String | Notification message |
| isRead | Boolean | Read status |
| complaintId | ObjectId | Reference to Complaint |

---

## 🌐 API Endpoints

### Auth APIs
```
POST /api/auth/register       - Register new user
POST /api/auth/login          - Login user
PUT  /api/auth/profile        - Update profile
POST /api/auth/forgot-password - Forgot password
POST /api/auth/reset-password  - Reset password
```

### Complaint APIs
```
POST /api/complaints/create   - Submit complaint (with image)
GET  /api/complaints/my       - Get my complaints
```

### Admin APIs
```
GET  /api/admin/complaints           - Get all complaints
PUT  /api/admin/complaints/:id/status - Update status
GET  /api/admin/users                - Get all users
GET  /api/admin/analytics            - Get statistics
```

### Chat & Notification APIs
```
POST /api/chat/message        - AI Chatbot message
GET  /api/notifications       - Get notifications
PUT  /api/notifications/read  - Mark as read
```

---

## 🚀 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | nivaran-x.vercel.app |
| Backend | Render | nivaranx.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## 🔮 Future Enhancements

- [ ] Email Notifications (Nodemailer)
- [ ] OTP Verification at registration
- [ ] Google reCAPTCHA integration
- [ ] Complaint Voting/Upvote System
- [ ] Public Heatmap (Leaflet.js)
- [ ] QR Code Complaint System
- [ ] Voice Complaint (Speech to Text)
- [ ] Hindi/Regional Language Support
- [ ] Mobile App (React Native)
- [ ] Push Notifications
- [ ] Advanced Analytics Charts
- [ ] PDF Report Generation
- [ ] Department Management System
- [ ] Pagination for large datasets
- [ ] Loading states & skeleton screens

---

## 👨‍💻 Developer

**Piyush Yadav**  
BCA 3rd Year Student — Full Stack Developer  
Built this project to solve real-world civic problems using modern web technologies and AI.

---

## 📄 License
MIT License

---

*Built with ❤️ using React, Node.js & Groq AI*
