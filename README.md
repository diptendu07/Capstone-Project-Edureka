# Student Portal

## Live Links
- **GitHub Repository:** [Capstone Project Repo](https://github.com/diptendu07/Capstone-Project-Edureka)
- **Backend (Render):** [Backend API](https://capstone-project-edureka-1.onrender.com)
- **Frontend (Netlify):** [Student Portal](https://67d3427dd48b8e6552a5aebb--edureka-student-portal.netlify.app/login)

**Note: Once logged in, you might need to refresh the page for the logout button and navbar links to get vissible.**
----------------------------------------------------------------------------------------------------------

# Admin Credentials (For Testing Live Website)
- **email:** **diptendulodh@gmail.com**
- **password:** **password123**

# User Credentials (For Testing Live Website)
- **email:** **johndoe@example.com**
- **password:** **password123**

*Note: You can register new user and log in with that credentials as well.*
------------------------------------------------------------------------------------------------------------

## Overview
The Student Portal is a web-based application that manages student activities in a school or college environment. It enhances reliability and transparency in information exchange, such as exam notifications, gate pass details, and more. This application is built using the MEAN (MongoDB, Express.js, Angular, Node.js) stack following the MVC architecture.

## Features
### Admin
- Enroll students with a unique registration number.
- Send registration details to students via email.
- Post notifications, exam timetables, faculty changes, gate passes, and circulars.
- Block student accounts.
- Approve or reject student leave applications.
- Change or reset passwords.

### Student
- Register using a unique registration number.
- Change or reset password.
- Apply for leave.
- Update profile details.
- Download exam timetables and gate passes.

## Tech Stack
- **Front-End:** Angular
- **Back-End:** Node.js, Express.js
- **Database:** MongoDB
- **Design Tools:** Angular Material / Bootstrap
- **Code Repository:** GitHub
- **IDE:** VS Code
- **Deployment:** Render (Backend) / Netlify (Frontend)

## Directory Structure
### Backend
```
backend/
├── server.js                # Main server entry point
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency tree
│
├── config/
│   ├── db.js                # MongoDB connection setup
│
├── models/
│   ├── User.js              # Mongoose schema for Users
│
├── middleware/
│   ├── authMiddleware.js    # JWT authentication middleware
│
├── controllers/
│   ├── authController.js    # Authentication (register, login, profile)
│   ├── adminController.js   # Admin functionalities
│   ├── studentController.js # Student functionalities
│
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── adminRoutes.js       # Admin routes
│   ├── studentRoutes.js     # Student routes
```

### Frontend
```
src/
├── index.html
├── main.ts
├── styles.css
│
├── app/
│   ├── app.component.ts / .html / .css
│   ├── app.config.ts
│   ├── app.routes.ts
│
│   ├── components/
│   │   ├── admin/
│   │   │   ├── admin.component.ts / .html / .css
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts / .html / .css
│   │   ├── login/
│   │   │   ├── login.component.ts / .html / .css
│   │   ├── navbar/
│   │   │   ├── navbar.component.ts / .html / .css
│   │   ├── register/
│   │       ├── register.component.ts / .html / .css
│
│   ├── guards/
│   │   ├── auth.guard.ts
│
│   ├── interceptors/
│   │   ├── auth.interceptor.ts
│
│   ├── services/
│   │   ├── auth.service.ts
│
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
```

## Setup Instructions
### Prerequisites
- Node.js & npm installed
- MongoDB installed or Atlas cloud instance
- Angular CLI installed

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Angular application:
   ```bash
   ng serve
   ```

## Deployment
- The backend and frontend are deployed separately on **Render** & **Netlify** respectively.
- Continuous deployment is set up via GitHub.

## Testing
- **Postman** is used for testing API endpoints.
- Unit testing is done using **Jasmine/Karma**.



