# EduPortal - Master Implementation Plan & Roadmap

**Status**: Active Development Guide  
**Version**: 2.0 (Consolidated from Features & Improvements)  
**Date**: February 2026

This document serves as the **Single Source of Truth** for the development of the EduPortal School ERP. It consolidates technical improvements, security mandates, and functional requirements into a phased, actionable roadmap for developers.

---

## 📅 Roadmap Overview

| Phase | Focus Area | Goal | Estimated Duration |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Security & Foundation** | Secure the app, fix critical vulnerabilities, setup auth. | Weeks 1-4 |
| **Phase 2** | **Architecture & Database** | Refactor code, normalize database, setup ORM. | Weeks 5-8 |
| **Phase 3** | **Core Modules (Functional)** | Implement essential ERP modules (Users, Classes, Attendance). | Weeks 9-16 |
| **Phase 4** | **Advanced Modules** | Exams, Finance, Communication, Reports. | Weeks 17-24 |
| **Phase 5** | **Frontend Polish & Testing** | UI/UX, Mobile App, E2E Testing. | Weeks 25+ |
| **Phase 6** | **DevOps & Production** | CI/CD, Containerization, Monitoring. | Final Polish |

---

## 🛡️ Phase 1: Security & Foundation (Critical)

**Objective**: Address critical security flaws and establish a secure authentication baseline before building more features.

### 1.1 Authentication & Security
- [ ] **Password Security** (Critical)
  - [ ] Implement `bcrypt` for password hashing (cost factor 12).
  - [ ] Remove any plain-text password storage.
  - [ ] Enforce strong password policy (min 8 chars, mixed case, symbols).
- [ ] **JWT Implementation**
  - [ ] Implement Access Tokens (short-lived, ~15 mins).
  - [ ] Implement Refresh Tokens (long-lived, ~7 days, stored in HTTPOnly cookie).
  - [ ] Implement Token Rotation mechanism.
- [ ] **Rate Limiting**
  - [ ] Add `express-rate-limit` middleware (e.g., 100 req/15min).
  - [ ] Add stricter limits on auth endpoints (login/forgot-password).
- [ ] **CORS & Headers**
  - [ ] Configure CORS to allow only specific frontend domains.
  - [ ] Implement Helmet.js for security headers (XSS, HSTS, etc.).

### 1.2 Data Protection
- [ ] **SQL Injection Prevention**
  - [ ] Audit all SQL queries.
  - [ ] Replace string interpolation with parameterized queries or Sequelize methods.
- [ ] **Sensitive Data Encryption**
  - [ ] Encrypt Aadhar numbers and sensitive phone numbers at rest (AES-256).
  - [ ] Ensure PII is not logged in console/files.

---

## 🏗️ Phase 2: Architecture & Database Refactoring

**Objective**: Clean up the codebase and fix database schema issues to support scalability.

### 2.1 Backend Architecture (`/backend`)
- [ ] **Layered Structure**
  - [ ] **Controllers**: Handle HTTP requests/responses ONLY.
  - [ ] **Services**: Contain all business logic.
  - [ ] **Repositories/DAL**: Handle direct database interactions.
  - [ ] **Models**: Define Sequelize schemas.
- [ ] **Standardization**
  - [ ] Implement centralized `AppError` and `errorHandler` middleware.
  - [ ] Add `Joi` or `Zod` validation schemas for all requests.
  - [ ] Setup `winston` or `pino` for structured logging.

### 2.2 Database Schema Optimization
- [ ] **Consolidate Student Tables**
  - [ ] **Migrate** separate class tables (`class_sixth`, `class_seventh`) into a single `students` table.
  - [ ] Add `class_id` and `section_id` foreign keys.
- [ ] **User Unification**
  - [ ] Create a central `users` table for Auth (Student, Teacher, Admin, Parent login info).
  - [ ] Link `students`, `teachers`, `parents` profiles to `users.id`.
- [ ] **Normalization**
  - [ ] Ensure proper Foreign Key constraints are active.
  - [ ] Add indexes on frequently searched columns (`email`, `aadhar`, `class_id`).

---

## 🧩 Phase 3: Core Functional Modules

**Objective**: Build/Refactor the primary CRUD modules required for daily school operations.

### 3.1 User Management Module
- [ ] **Admin Dashboard**
  - [ ] Dashboard metrics (Total Students, Active Teachers, etc.).
  - [ ] User management interface (Create/Edit/Deactivate users).
  - [ ] Role implementation (RBAC: Admin, Teacher, Student, Parent, Accountant).
- [ ] **Student Profiles**
  - [ ] Comprehensive admission form (Personal, Parents, Address, Docs).
  - [ ] Bulk upload via CSV.
  - [ ] Student search and filtering.
- [ ] **Teacher Management**
  - [ ] Teacher profiles and qualification details.
  - [ ] Class/Subject assignment interface.

### 3.2 Academic Management
- [ ] **Class & Section Management**
  - [ ] Create/Edit Classes and Sections.
  - [ ] Define Class capacity.
- [ ] **Subject Management**
  - [ ] Define Subjects.
  - [ ] Map Subjects to Classes and Teachers.
- [ ] **Timetable**
  - [ ] Create Class-wise timetable.
  - [ ] Create Teacher-wise timetable.
  - [ ] Conflict detection logic.

### 3.3 Attendance Module
- [ ] **Daily Attendance**
  - [ ] Teacher interface to mark attendance.
  - [ ] Support for: Present, Absent, Late, Half-day.
- [ ] **Reporting**
  - [ ] Calculate monthly attendance percentage.
  - [ ] Alert system for low attendance.

---

## 💰 Phase 4: Advanced Modules

**Objective**: Implement complex business logic features.

### 4.1 Examination & Marks
- [ ] **Exam Setup**
  - [ ] Create Exam types (Mid-term, Final).
  - [ ] Schedule exams.
- [ ] **Marks Entry**
  - [ ] Teacher interface for marks entry (Subject-wise/Student-wise).
  - [ ] Lock/Finalize marks functionality.
- [ ] **Report Cards**
  - [ ] Auto-generate PDF report cards.
  - [ ] Grade calculation logic.

### 4.2 Fee Management & Finance
- [ ] **Fee Structure**
  - [ ] Define fee heads (Tuition, Transport, Lab).
  - [ ] Set fee amounts per Class/Category.
- [ ] **Collection**
  - [ ] Generate Invoices/Challans.
  - [ ] Record payments (Online/Offline).
  - [ ] Integration with Payment Gateway (Razorpay/Cashfree).
- [ ] **Dues & Reminders**
  - [ ] Track outstanding fees.
  - [ ] Auto-send reminders (SMS/Email).

### 4.3 Communication & Content
- [ ] **Notice Board**
  - [ ] Create circulars/announcements (Target: All, Class, Teacher).
- [ ] **Messaging**
  - [ ] Internal messaging system (Admin <-> Teacher <-> Parent).
- [ ] **Study Materials**
  - [ ] Teacher upload interface (PDF, Docs, Links).
  - [ ] Student download interface.

---

## 🎨 Phase 5: Frontend & User Experience

**Objective**: Ensure the UI is professional, responsive, and user-friendly.

### 5.1 Frontend Architecture (`/frontend`)
- [ ] **Modernization**
  - [ ] Use Functional Components & Hooks exclusively.
  - [ ] Implement `React Query` for data fetching/caching.
  - [ ] Establish a Global Store (Redux Toolkit or Context) for session state.
- [ ] **UI Components**
  - [ ] Build a reusable Component Library (Buttons, Inputs, Modals, Tables).
  - [ ] Ensure Mobile Responsiveness for all screens.
  - [ ] Implement Dark/Light mode support.

### 5.2 Specific Portals
- [ ] **Teacher Portal**: Optimized for tablets/desktop for marks entry.
- [ ] **Student/Parent Portal**: Mobile-first design.

---

## ⚙️ Phase 6: DevOps, Testing & Production

### 6.1 Quality Assurance
- [ ] **Testing**
  - [ ] Backend Unit Tests (Jest).
  - [ ] API Integration Tests (Supertest).
  - [ ] Frontend E2E Sanity Tests (Cypress).
- [ ] **Performance**
  - [ ] Implement Redis caching for heavy endpoints (features/attendance).
  - [ ] Optimize database query performance (N+1 prob solution).

### 6.2 Deployment
- [ ] **CI/CD**
  - [ ] Setup GitHub Actions for linting and testing.
- [ ] **Infrastructure**
  - [ ] Dockerize Backend and Frontend.
  - [ ] Setup Nginx/Reverse Proxy.
  - [ ] Configure Daily Database Backups (S3/Cloud).

---

## 📝 Developer Notes

- **Updating this Plan**: Mark items as `[x]` when completed.
- **New Features**: Add new requirements to the appropriate Phase section.
- **Reference**: 
  - See `FEATURES.md` for granular functional details.
  - See `IMPROVEMENTS.md` for specific technical implementation examples (code snippets for Auth, Logging, etc.).
