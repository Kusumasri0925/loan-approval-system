# Explainable AI Loan Approval System

A full-stack web application that simulates an intelligent loan approval system.
It automatically evaluates loan applications based on income and credit score while explaining the decision to the user.

---

## Features

* User Registration with Email Verification
* Secure Login using JWT Authentication
* Forgot Password and Reset via Email
* User Dashboard with Profile Details
* Apply for Loans (Personal, Home, Car)
* AI-based Loan Decision Logic
* Loan Approval / Rejection Reason
* Loan History Tracking

---

## Tech Stack

Frontend

* React.js
* Axios
* Tailwind CSS

Backend

* Spring Boot
* Spring Security
* JWT Authentication

Database

* MySQL

Other Tools

* Git & GitHub
* Maven

---

## System Architecture

Frontend (React)
⬇
REST APIs (Spring Boot)
⬇
Business Logic (Loan Decision Engine)
⬇
MySQL Database

---

## Loan Approval Logic

Loan approval is based on simple explainable rules:

* Credit Score ≥ 700 → Higher approval chance
* Income ≥ 50% of Loan Amount → Income sufficient
* Otherwise → Loan rejected with reason

Example decision:

Approved:
"Excellent credit score and sufficient income."

Rejected:
"Low credit score or insufficient income."

---

## Project Structure

```
loan-approval-system
│
├── backend (Spring Boot)
│   ├── src
│   ├── pom.xml
│
├── loan-frontend (React)
│   ├── src
│   ├── package.json
│
└── README.md
```

---

## How to Run the Project

### Backend

```
cd backend
mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

### Frontend

```
cd loan-frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

## Future Improvements

* Deploy on cloud (AWS / Render)
* Add credit risk ML model
* Improve dashboard analytics
* Add admin panel for loan monitoring

---

## Author

Kusuma Sri
