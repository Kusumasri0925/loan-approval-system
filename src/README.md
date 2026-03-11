# Loan Approval System - Backend

This is the backend API built using Spring Boot.

It handles authentication, loan processing, and database operations.

---

## Features

* User Registration
* Email Verification
* Login with JWT Authentication
* Forgot Password API
* Loan Application Processing
* AI Loan Decision Logic
* Loan History API

---

## Tech Stack

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* MySQL
* Maven

---

## Run the Backend

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## API Endpoints

Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

Loan

```
POST /api/loan/apply
GET /api/loan/history/{userId}
```
