# Backend - Loan Approval System

This backend is built using **Spring Boot** and provides REST APIs for the loan approval system.

## Technologies

* Spring Boot
* Spring Security
* Java Mail Sender
* MySQL
* Maven

---

## Features

### Authentication

* Register user
* Login
* Email verification
* Forgot password
* Reset password

### Loan APIs

* Apply Loan
* View Loan History
* Loan Eligibility Check
* Risk Score Evaluation

---

## API Endpoints

### Authentication

Register

```
POST /api/auth/register
```

Login

```
POST /api/auth/login
```

Verify Email

```
GET /api/auth/verify/{id}
```

Forgot Password

```
POST /api/auth/forgot-password
```

Reset Password

```
POST /api/auth/reset-password
```

---

### Loan APIs

Apply Loan

```
POST /api/loan/apply
```

Loan History

```
GET /api/loan/history/{userId}
```

Eligible Loans

```
GET /api/loan/eligible/{cibil}
```

---

## Database

MySQL tables:

### user

* id
* name
* email
* password
* cibil_score
* verified

### loan_application

* id
* user_id
* loan_type
* pan_number
* loan_amount
* income
* credit_score
* existing_loan
* years_of_employment
* status
* reason

---

## Run Backend

```
mvn spring-boot:run
```

```
