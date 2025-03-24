# Task Manager App

## Overview

Task Manager App is a full-stack mobile application built using React Native (Expo) for the frontend and Node.js with MongoDB for the backend. The app allows users to sign up, log in, and manage tasks (CRUD operations) with authentication.

## Features

### Frontend (React Native with Expo)

#### Authentication:

- **Signup Screen:** Users can register with name, email, and password.
- **Login Screen:** Users can log in using email and password.
- **JWT Token Authentication:** The app uses AsyncStorage to store JWT tokens for session management.

#### Task Management:

- **Home Screen:** Displays tasks fetched from the backend with a pull-to-refresh feature.
- **Add Task Screen:** Allows users to create a new task (title + description).
- **Task Details Screen:** Displays task details and provides options to edit or delete a task.
- **Logout:** Clears the stored JWT token and navigates back to the Login screen.

#### Tech Stack & Tools:

- **State Management:** React Context API
- **Navigation:** React Navigation (Stack Navigator)
- **Storage:** AsyncStorage (for JWT tokens)
- **UI Components:** React Native Paper

---

### Backend (Node.js, Express, MongoDB)

#### API Endpoints:

**Authentication (JWT-based)**

- `POST /auth/signup` → Register a new user
- `POST /auth/login` → Authenticate user and return JWT

**Task Management (Protected Routes - Requires JWT)**

- `POST /tasks` → Create a new task
- `GET /tasks` → Get all tasks for the logged-in user
- `GET /tasks/:id` → Get a specific task
- `PUT /tasks/:id` → Update a task
- `DELETE /tasks/:id` → Delete a task

#### Tech Stack:

- **Backend Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Security:** bcrypt.js (password hashing), jsonwebtoken (JWT authentication)
- **Middleware:** CORS, Express JSON Middleware

---

## Installation & Setup

### Prerequisites:

- Node.js & npm installed
- MongoDB running locally or on a cloud provider
- Expo CLI installed globally

### Backend Setup:

1. Clone the backend repository:
   ```sh
   git clone https://github.com/Akil7204/TaskManagerBackend.git
   cd TaskManagerBackend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup:

1. Clone the frontend repository:
   ```sh
   git clone https://github.com/Akil7204/TaskManagerApp.git
   cd TaskManagerApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Expo development server:
   ```sh
   npx expo start
   ```

---

## Deployment

### Backend Deployment:

- The backend is deployed on **Render**
- API Base URL: `[https://your-backend-url.onrender.com](https://taskmanagerapp-llfn.onrender.com)`

### Frontend APK:

- Download the APK for testing: [Expo Go APK Link](https://expo.dev/accounts/akil_aki/projects/TaskManagerApp/builds/e8756f13-38b1-4ecc-8f65-20b262a6ce7d)

---

## Future Enhancements (Optional Features Not Implemented)

- Implement password reset functionality
- Improve UI animations with React Native Gesture Handler
- Add push notifications for task reminders

---

## Contact

- **GitHub:** [Akil7204](https://github.com/Akil7204)
- **LinkedIn:** [Akil Aki](https://www.linkedin.com/in/akil-aki01/)
- **Email:** [akilakil6874@gmail.com](mailto\:akilakil6874@gmail.com)

