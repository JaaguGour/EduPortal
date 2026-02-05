# EduPortal - Educational Management System

A comprehensive web-based education management platform built with **React**, **Node.js/Express**, and **MySQL**. EduPortal streamlines administrative, teaching, and student activities within an educational institution.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [State Management](#state-management)
- [Key Workflows](#key-workflows)

---

## 🎯 Project Overview

**EduPortal** is a three-tier educational management system that enables:

- **Administrators** to manage the entire institution
- **Teachers** to manage students and coursework
- **Students** to view profiles, attendance, payments, and academic materials

The system manages multiple classes (6th through 10th standard), student attendance, fee payments, email communications, file uploads, and timetable management.

---

## 🛠 Tech Stack

### **Backend**

- **Runtime**: Node.js
- **Framework**: Express.js (v4.19.2)
- **Database**: MySQL 2 with Sequelize ORM
- **Database Host**: TiDB Cloud (AWS ap-southeast-1)
- **Authentication**: Username/Password with role-based access
- **Email**: Nodemailer (v6.9.14)
- **Payment Gateway**: Cashfree PG (v4.2.3)
- **File Upload**: Multer (v1.4.5)
- **CORS**: Enabled for frontend-backend communication
- **Development**: Nodemon for hot-reload

### **Frontend**

- **Library**: React (v18.3.1)
- **State Management**: Redux Toolkit (v2.2.7)
- **Routing**: React Router DOM (v6.26.0)
- **UI Framework**:
  - Material-UI (MUI) (v5.16.7)
  - React Bootstrap (v2.10.4)
  - Bootstrap (v5.3.3)
- **HTTP Client**: Axios (v1.7.3)
- **Icons**: React Icons (v5.2.1)
- **Tables**: React Bootstrap Table Next (v4.0.3)
- **Printing**: React to Print (v2.15.1)
- **Payment**: Cashfree JS (v1.0.5)

---

## 🏗 Architecture

### **Three-Layer Architecture Pattern**

```
┌─────────────────────────────────────────────┐
│         FRONTEND (React + Redux)            │
│  Components | Routes | State Management     │
└────────────────────┬────────────────────────┘
                     │ HTTP/Axios
                     ▼
┌─────────────────────────────────────────────┐
│    BACKEND (Express.js API Server)          │
│  Routes → Controllers → Services → Models   │
└────────────────────┬────────────────────────┘
                     │ Query
                     ▼
┌─────────────────────────────────────────────┐
│       DATABASE (TiDB Cloud MySQL)           │
│  Users | Classes | Attendance | Payments    │
└─────────────────────────────────────────────┘
```

### **Request Flow Example (Student Login)**

```
1. Student enters credentials → React Component (LogInPage)
2. Form submitted → Axios POST to /auth/login
3. Backend Controller validates credentials
4. Service fetches student info from database
5. Response sent with role and student data
6. Redux dispatches action to store user info
7. Router navigates to student dashboard
```

---

## ✨ Features

### **1. Authentication & Authorization**

- Role-based login (Admin, Teacher, Student)
- Secure credential verification
- Session management via Redux
- Three distinct user roles with unique permissions

### **2. Student Management**

- Add students to specific classes (6th-10th standard)
- View student profiles and basic information
- Upload and manage student profile images
- Remove students from the system
- Class-wise student organization

### **3. Attendance Management**

- Mark attendance for students per class
- View attendance records (student and teacher perspectives)
- Track absent days and leave requests
- Class-wise attendance reports
- Generate attendance lists

### **4. Payment & Fee Management**

- Online fee payment integration with Cashfree
- Fee status tracking
- Payment history
- Order generation and verification
- Support for INR currency transactions

### **5. Communication System**

- Email notifications to parents/guardians
- Bulk email campaigns
- Meeting invitations
- School event announcements
- Dynamic email templates

### **6. File Management**

- Profile image upload for students, teachers, and admins
- Document storage in `/uploads` directory
- Unique file naming with timestamps
- Database tracking of file metadata

### **7. Timetable Management**

- View class timetables
- Teacher and student-specific timetables
- Calendar integration

### **8. Academic Resources**

- Teachers can upload notes
- View educational materials
- Digital classroom support

### **9. Leave Management**

- Students can submit leave requests
- Teachers/admins can approve/review leaves
- Leave status tracking

---

## 📁 Project Structure

### **Backend Structure**

```
backend/
├── main.js                          # Express server entry point
├── package.json                     # Dependencies
├── .env                            # Environment variables (DB credentials)
│
├── config/
│   ├── dbConnection.js             # TiDB MySQL connection setup
│   └── nodemailerconfig.js         # Email configuration
│
├── routers/                        # API route definitions
│   ├── authRoutes.js               # POST /auth/login
│   ├── studentroute.js             # Student CRUD operations
│   ├── teacherrouter.js            # Teacher operations
│   ├── emailRoute.js               # Email sending
│   ├── paymentRoutes.js            # Payment processing
│   └── uploadRouter.js             # File upload handling
│
├── controllers/                    # Route handlers (business logic)
│   ├── authcontroller.js           # Login verification
│   ├── studentcontroller.js        # Student endpoints
│   ├── teachercontroller.js        # Teacher endpoints
│   ├── emailController.js          # Email operations
│   ├── paymentsController.js       # Payment operations
│   └── uploadController.js         # File upload/retrieval
│
├── services/                       # Business logic & DB operations
│   ├── studentServices.js          # Student data operations
│   ├── teacherServices.js          # Teacher data operations
│   ├── adminservices.js            # Admin operations
│   ├── Emailservices.js            # Email sending logic
│   ├── paymentServices.js          # Payment DB operations
│   └── uploadservices.js           # File metadata storage
│
├── uploads/                        # Stored profile images & documents
└── views/
    └── userNotFound.html           # 404 page
```

### **Frontend Structure**

```
frontend/
├── package.json                    # React dependencies
├── src/
│   ├── App.js                      # Main app routing (45+ routes)
│   ├── App.css                     # Global styles
│   ├── index.js                    # Redux store configuration
│   ├── constants.js                # BACKEND_BASE_URL
│   │
│   ├── Components/
│   │   ├── HomePage.js             # Landing page
│   │   ├── LogInPage.js            # Login form
│   │   ├── NotFound.js             # 404 component
│   │   ├── calender.js             # Calendar widget
│   │   │
│   │   ├── admin/                  # Admin dashboard
│   │   │   ├── adminhome.js
│   │   │   ├── Homeadmin.js
│   │   │   ├── addstudent.js
│   │   │   ├── addTeacher.js
│   │   │   ├── viewstudents.js
│   │   │   ├── viewstudentssix.js  (6th class)
│   │   │   ├── viewstudentsseven.js (7th class)
│   │   │   ├── viewstudentseight.js (8th class)
│   │   │   ├── viewstudentsnine.js (9th class)
│   │   │   ├── viewstudentsten.js  (10th class)
│   │   │   ├── viewteacher.js
│   │   │   ├── timetable.js
│   │   │   ├── AttendencebyAdmin.js
│   │   │   ├── sendMail.js
│   │   │   ├── uploadImagesByAdim.js
│   │   │   ├── viewattendence.js
│   │   │   ├── viewprofiles.js
│   │   │   ├── navbar.js
│   │   │   ├── sidebar.js
│   │   │   └── bodycontent.js
│   │   │
│   │   ├── teachers/               # Teacher dashboard
│   │   │   ├── teacherhome.js
│   │   │   ├── home.js
│   │   │   ├── NavBar.js
│   │   │   ├── sidebar.js
│   │   │   ├── bodycontent.js
│   │   │   ├── viewStudents.js
│   │   │   ├── Attendence.js
│   │   │   ├── timetable.js
│   │   │   ├── notes.js
│   │   │   ├── viewprofile.js
│   │   │   ├── editProfile.js
│   │   │   ├── sendMail.js
│   │   │   ├── addStudents.js
│   │   │   └── uploadimagesByTeacher.js
│   │   │
│   │   ├── students/               # Student dashboard
│   │   │   ├── studenthome.js
│   │   │   ├── Home.js
│   │   │   ├── studentNavBar.js
│   │   │   ├── studentSidebar.js
│   │   │   ├── studentBodyContent.js
│   │   │   ├── studentviewprofile.js
│   │   │   ├── viewteachers.js
│   │   │   ├── timetable.js
│   │   │   ├── diary.js           (Leave requests)
│   │   │   ├── StudentAttendence.js
│   │   │   ├── Payment.js         (Fee payment)
│   │   │   ├── feeStatus.js
│   │   │   ├── uploadimage.js
│   │   │   ├── profileimage.js
│   │   │   └── studentdata.js
│   │   │
│   │   └── reusable/               # Shared components
│   │       ├── alerts.js           (Alert messages)
│   │       ├── card.js             (Card layout)
│   │       ├── modal.js            (Modal dialogs)
│   │       ├── table.js            (Data tables)
│   │       ├── profile.js
│   │       └── printPage.js        (Print functionality)
│   │
│   └── store/                      # Redux state management
│       ├── reducer.js              # Login state (isValid)
│       ├── alertReducer.js         # Alert notifications
│       ├── studentinfoReducer.js   # Student data state
│       ├── teacherinfoReducer.js   # Teacher data state
│       └── admininfoReducer.js     # Admin data state
│
└── public/
    └── index.html                  # React root HTML
```

---

## 🚀 Setup & Installation

### **Prerequisites**

- Node.js (v14 or higher)
- npm or yarn
- MySQL/TiDB Cloud account
- Cashfree merchant account (for payments)

### **Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create .env file with:
# DB_HOST=gateway01.ap-southeast-1.prod.aws.tidbcloud.com
# DB_PORT=4000
# DB_USER=<your_tidb_user>
# DB_PASSWORD=<your_tidb_password>
# DB_NAME=eduportal

# Start development server (with hot-reload)
npm start
# Server runs on http://localhost:5000
```

**Key Backend Configurations:**

- **Database**: TiDB Cloud (MySQL compatible)
- **CORS**: Enabled for frontend communication
- **Static Files**: `/uploads` directory for images
- **Port**: 5000 (or environment variable `port`)

### **Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Create .env file with:
# REACT_APP_BACKEND_URL=http://localhost:5000

# Start development server
npm start
# App runs on http://localhost:3000
```

**Key Frontend Configurations:**

- **Proxy**: http://localhost:5000 (for API calls)
- **Constants**: `constants.js` contains `BACKEND_BASE_URL`

---

## 🔌 API Endpoints

### **Authentication**

```
POST /auth/login
  Body: { name, password, role }
  Response: { page: role, info: userDetails }
```

### **Students**

```
POST   /student/addstudent           # Add new student
GET    /student/getStudents          # Get all students
POST   /student/addattendence        # Mark attendance
GET    /student/getattendence        # Get attendance
GET    /student/attendence           # Student's attendance
GET    /student/getTimeTable         # Student timetable
POST   /student/leave_form           # Submit leave request
GET    /student/getclasswisestudents # Get students by class
DELETE /student/removestudent        # Remove student
GET    /student/leftstudents         # Get absent students
```

### **Teachers**

```
GET    /teacher/getTeachers          # Get all teachers
POST   /teacher/addteacher           # Add teacher
GET    /teacher/getTimeTable         # Teacher timetable
```

### **Email**

```
POST /email/send                     # Send emails to parents
```

### **Payments**

```
POST /payment/create-order           # Create payment order
POST /payment/verify                 # Verify payment
```

### **File Upload**

```
POST /upload/profile                 # Upload profile image
GET  /uploads/:filename              # Retrieve uploaded file
```

---

## 🎨 Frontend Components

### **Component Hierarchy**

#### **Admin Dashboard**

```
AdminHomePage (Layout)
├── Navbar
├── Sidebar
├── HomeAdmin (Dashboard)
│   ├── Add Student
│   ├── Add Teacher
│   ├── View Students (by class)
│   ├── View Teachers
│   ├── View Attendance
│   ├── Timetable
│   ├── Send Mail
│   ├── Upload Images
│   └── View Profiles
```

#### **Teacher Dashboard**

```
TeacherHomePage (Layout)
├── NavBar
├── Sidebar
├── Home (Dashboard)
│   ├── View Students
│   ├── Mark Attendance
│   ├── View Timetable
│   ├── Upload Notes
│   ├── View Profile
│   ├── Edit Profile
│   ├── Send Mail to Parents
│   ├── Add Students
│   ├── Upload Profile Image
│   └── Calendar
```

#### **Student Dashboard**

```
StudentHomePage (Layout)
├── StudentNavBar
├── StudentSidebar
├── Home (Dashboard)
│   ├── View Profile
│   ├── View Teachers
│   ├── Submit Leave Request (Diary)
│   ├── View Timetable
│   ├── View Attendance
│   ├── Online Payment
│   ├── Fee Status
│   ├── Upload Profile Image
│   └── Calendar
```

### **Reusable Components**

- **Alerts**: Success/Error notifications
- **Card**: Information cards
- **Modal**: Dialog boxes for forms
- **Table**: Data table display
- **Profile**: User profile card
- **PrintPage**: Print functionality for attendance

---

## 💾 Database Schema

### **Key Tables**

```sql
-- Authentication
login (username, password, role)

-- Students
students (id, name, email, phone, class, dateOfBirth, ...)
class_sixth, class_seventh, class_eight, class_nine, class_ten
(class-specific tables for student records)

-- Teachers
teachers (employee_id, name, email, phone, assigned_class, ...)

-- Administration
admins (admin_id, name, email, ...)

-- Attendance
attendance (id, student_id, date, class_id, status, ...)

-- Payments
fee_payments (id, student_id, amount, date, order_id, status, ...)

-- Timetables
timetable (id, class_id, day, time_slot, subject, teacher_id, ...)

-- Leave
leave_requests (id, student_id, start_date, end_date, reason, status, ...)

-- File Uploads
uploads (id, filename, filepath, user_id, upload_date, ...)
```

---

## 🔄 State Management (Redux)

### **Redux Store Structure**

```javascript
store = {
  LogIn: {
    isValid: boolean  // Authentication status
  },

  StudentInfo: {
    studentinfo: {
      name, email, class, phone, attendance, ...
    }
  },

  TeacherInfo: {
    teacherinfo: {
      name, email, assigned_class, subject, ...
    }
  },

  AdminInfo: {
    admininfo: {
      name, email, ...
    }
  },

  Alert: {
    message: string,
    type: 'success' | 'error' | 'warning'
  }
}
```

### **Reducers**

| Reducer                 | Actions              | Purpose               |
| ----------------------- | -------------------- | --------------------- |
| `reducer.js`            | valid, invalid       | Login state           |
| `studentinfoReducer.js` | changeStudentinfo    | Store student data    |
| `teacherinfoReducer.js` | changeTeacherinfo    | Store teacher data    |
| `admininfoReducer.js`   | changeAdmininfo      | Store admin data      |
| `alertReducer.js`       | setAlert, clearAlert | Display notifications |

---

## 🔄 Key Workflows

### **1. Student Login Flow**

```
1. User enters credentials → LogInPage component
2. Form validation (email, password format)
3. POST request to /auth/login with {name, password, role: 'student'}
4. Backend verifies in login table
5. Service fetches student details (getStudentInfo)
6. Redux action dispatches (changeStudentinfo)
7. Router navigates to /student dashboard
8. StudentHome component renders with student data
```

### **2. Add Student Flow**

```
1. Admin fills AddStudentByAdmin form
2. Form validation (Aadhar, phone, email)
3. Username generated from firstName + Aadhar
4. Password set to dateOfBirth
5. Data inserted into:
   - students table (main record)
   - class_sixth/seventh/eight/nine/ten table (class-specific)
   - login table (authentication)
   - attendance table (attendance record)
6. Success notification displayed
```

### **3. Payment Flow**

```
1. Student selects Payment from dashboard
2. Enters amount to pay
3. Frontend calls POST /payment/create-order
4. Backend generates unique order ID (SHA-256 hash)
5. Cashfree API creates order in SANDBOX environment
6. Response contains payment gateway URL
7. Cashfree hosted checkout opens
8. Student completes payment
9. POST /payment/verify confirms transaction
10. Fee record added to fee_payments table
11. Frontend redirects to student dashboard
```

### **4. Email Notification Flow**

```
1. Teacher clicks SendMail
2. Fills meeting details (date, time, venue, parent emails)
3. POST /email/send to backend
4. Controller formats HTML email template
5. Nodemailer sends via configured SMTP
6. Multiple parents receive emails
7. Success notification shown
```

### **5. Attendance Marking Flow**

```
1. Teacher navigates to Mark Attendance (Attendence.js)
2. Selects class and date
3. Checks boxes for present students
4. POST /student/addattendence
5. Attendance record inserted
6. Can view attendance via GET /student/getattendence
7. Students see their attendance in StudentAttendence.js
8. Admin views class-wise reports in AttendencebyAdmin.js
```

---

## 🔐 Security Notes

### **Current Implementation**

- Basic username/password authentication
- Role-based access control (Admin, Teacher, Student)
- CORS enabled for frontend communication
- File upload with timestamp naming

### **Recommendations for Production**

- Implement JWT tokens for session management
- Add password hashing (bcrypt)
- Implement SQL injection prevention with parameterized queries
- Add HTTPS/SSL certificates
- Implement rate limiting on authentication endpoints
- Add logging and monitoring
- Validate file uploads (type, size)
- Implement data encryption for sensitive fields

---

## 📊 Technology Dependencies Summary

| Category      | Technology      | Version        |
| ------------- | --------------- | -------------- |
| Runtime       | Node.js         | Latest         |
| Web Framework | Express         | 4.19.2         |
| React         | React           | 18.3.1         |
| Database      | MySQL/TiDB      | 3.11.0         |
| ORM           | Sequelize       | 6.37.3         |
| UI Kits       | MUI + Bootstrap | 5.16.7 + 5.3.3 |
| State         | Redux Toolkit   | 2.2.7          |
| Routing       | React Router    | 6.26.0         |
| HTTP          | Axios           | 1.7.3+         |
| Email         | Nodemailer      | 6.9.14         |
| Payments      | Cashfree        | 4.2.3          |
| File Upload   | Multer          | 1.4.5          |

---

## 🎓 Summary

**EduPortal** is a well-structured educational management system with:

- **Clear separation of concerns** (Controllers → Services → Models)
- **Three distinct user roles** with specialized dashboards
- **Comprehensive features** covering student lifecycle management
- **Modern tech stack** using React and Express
- **Scalable architecture** with TiDB Cloud database
- **Integrated payment system** for fee collection
- **Communication system** for parent-teacher interaction

The application successfully demonstrates full-stack development with proper routing, state management, and database operations.

---

## 📝 Notes

- **Database**: Uses TiDB Cloud (MySQL-compatible cloud database)
- **Email**: Configured via Nodemailer, requires SMTP credentials
- **Payments**: Cashfree integration in SANDBOX mode (can be switched to production)
- **File Storage**: Local disk storage in `/uploads` directory
- **Development**: Uses Nodemon for backend and React Scripts for frontend

---

**Version**: 1.0.0  
**Last Updated**: February 2026
