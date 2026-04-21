Retail Billing System

A full-stack Retail Billing System built to streamline customer management, product handling, and billing operations. The application simulates real-world retail workflows with GST-compliant invoice generation, seamless backend integration, and an intuitive user interface.

## Tech Stack
1) Frontend
* React.js
* CSS

2) Backend
* Spring Boot (Java)
* REST APIs
* Postman

3) Database
* MySQL
* MySQL Workbench

## Features

*  Customer Management (Add, Edit, Delete, View)
*  Product Management (Add, Edit, Delete, View)
*  Billing System with multiple items
*  GST Calculation
*  Dashboard Overview
*  Login System (Basic Authentication)
*  Bill History & Details
*  PDF Bill Generation

## Project Structure
```
retail-billing-system/
 ├── backend/
 │    └── Spring Boot Project (backend )
 └── frontend/
      └── React Project ( frontend )
```
##  Installation & Setup

## Backend Setup (Spring Boot)

1. Navigate to backend folder:
```
   cd backend
```
2. Run the application:
  by clicking on the folder and running on RUN JAVA APPLICATION

3. Backend runs on:

   ```
   http://localhost:8081
   ```

## Frontend Setup (React)

1. Navigate to frontend folder:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the app:

   ```
   npm start
   ```

4. Frontend runs on:

   ```
   http://localhost:3000
   ```

---

##  API Endpoints (Sample)
```
| Method  | Endpoint   | Description      |
| ------ | ---------- | ----------------- |
| GET    | /customers | Get all customers |
| POST   | /customers | Add new customer  |
| GET    | /products  | Get all products  |
| POST   | /products  | Add new product   |
| POST   | /billing   | Generate bill     |
```
## Future Enhancements / Upgradation

*  JWT Authentication
*  Responsive UI
*  Sales Analytics Dashboard
*  Cloud Deployment

##  Author

* Priyamvada Kumar
* 
##  Acknowledgment

This project was built as part of learning full-stack development using React and Spring Boot.

## Imp Note

Ensure MySQL is running and properly configured in the application.properties file before starting the backend server.
