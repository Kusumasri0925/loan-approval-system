# Explainable AI Loan Approval System

A full-stack web application that simulates an intelligent loan approval platform.
It evaluates loan applications based on income and credit score while clearly explaining the approval or rejection reason.

---

## Features

* User Registration with Email Verification
* Secure Login with JWT Authentication
* Forgot Password and Email Reset
* User Dashboard with Profile Details
* Apply for Loans (Personal, Home, Car)
* AI-based Loan Decision Engine
* Loan Approval / Rejection Reason
* Loan History Tracking

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Spring Boot
* Spring Security
* JWT Authentication

### Database

* MySQL

---

## System Architecture

```
React Frontend
      ↓
REST APIs (Spring Boot)
      ↓
Business Logic (Loan Decision Engine)
      ↓
MySQL Database
```

---

## Loan Decision Logic

Loan approval is based on explainable rules:

* Credit Score ≥ 700 → Higher approval chance
* Income ≥ 50% of Loan Amount → Income sufficient
* Otherwise → Loan rejected with reason

Example:

Approved
"Excellent credit score and sufficient income."

Rejected
"Low credit score or insufficient income."

---

## Project Structure

```
loan-approval-system
│
├── frontend      → React application
│
├── src           → Spring Boot backend
│
├── pom.xml       → Maven configuration
│
└── README.md
```

---

## How to Run the Project

### Backend

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### Frontend

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## Author

Kusuma Sri

POST /api/loan/apply
GET /api/loan/history/{userId}
```

Kusuma Sri
