# Loan Approval System

A full-stack web application that evaluates loan applications and determines whether a user is eligible based on financial parameters such as **CIBIL score, income, existing loans, and employment stability**.

The system provides **automated loan eligibility checks and risk assessment**, similar to how banks evaluate applicants.

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Spring Boot
* Spring Security
* Java Mail Sender
* REST API

### Database

* MySQL

---

## Features

### Authentication

* User Registration
* Login
* Email Verification
* Forgot Password
* Password Reset
* BCrypt Password Encryption

### Loan System

* Apply for Loan
* Loan Eligibility Check
* Risk Score Calculation
* Loan Approval / Rejection
* Loan History Tracking

### Dashboard

* View CIBIL Score
* View Loan Statistics
* See Eligible Loan Types
* Apply for Available Loans

---

## Loan Eligibility Logic

Loan eligibility is determined based on **CIBIL score**.

| CIBIL Score | Eligible Loans                 |
| ----------- | ------------------------------ |
| 750+        | Personal, Car, Home, Education |
| 700–749     | Personal, Car                  |
| 650–699     | Personal                       |
| <650        | Not eligible                   |

---

## Risk Score Formula

Risk Score is calculated using:

Risk Score =
(creditScore × 0.4)

* (income factor × 0.3)

- (existing loan × 0.2)

* (employment stability × 0.1)

---

## Project Structure

```
loan-approval-system
│
├── backend  → Spring Boot APIs
├── frontend → React UI
└── README.md
```

---

## How to Run the Project

### Backend

```
cd backend
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

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

## Future Improvements

* Admin panel for loan approval
* Risk score visualization
* PAN verification
* Machine learning loan prediction

---

## Author

Kusuma Sri
