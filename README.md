

 # 👤 FMVTS User Microservice

The **FMVTS User Microservice** is responsible for **user lifecycle management and role-based user operations** within the Fleet Management and Vehicle Tracking System (FMVTS).

This service acts as the **source of truth for user data** and works closely with the **Auth Microservice** and other domain services to ensure user authentication, authorization, and operational consistency.

---

## 📌 Core Responsibilities

- User registration (enrollment)
- Fetching user details for authentication
- Updating user account information
- Deactivating user accounts
- Enforcing role-based access control (RBAC)
- Syncing driver availability and vehicle assignment via events
- Serving as the user data provider for Auth Microservice

---

## 🏗️ Architecture Role

Auth Microservice
      |
User Microservice
      |
Vehicle Microservice


- The **Auth Microservice** consumes user data for login and registration
- The **Vehicle Microservice** publishes events to update driver status and vehicle assignment

---

## 🔐 Authentication & Authorization

- Protected routes require a **valid JWT token**
- JWT validation is handled via middleware
- Certain operations are restricted by **user role**
  - Example: Only `admin` can deactivate a user

---

## 🔄 Event-Driven Synchronization

The User Microservice **subscribes to events from the Vehicle Microservice** to ensure:

- Driver availability status is updated accurately
- Assigned vehicle ID is synced in real time
- Driver–vehicle mapping remains consistent across services

This ensures **eventual consistency** without tight coupling between services.

---

▶️ Running the Service
   
   Install Dependencies
    
      npm install
---

Start Application

      npm start
  

