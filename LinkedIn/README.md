# 🚀 CareerConnect – Real-Time Professional Networking Platform

A full-stack **Job Portal & Professional Networking Application** built using the **MERN Stack**.
This platform goes beyond simple job listings by integrating a **LinkedIn-style networking system**, allowing users to connect, share multimedia posts, and interact in real-time using **Socket.io**.

---

## 📌 Project Overview

**CareerConnect** is designed to simulate a real-world professional ecosystem. It bridges the gap between static job boards and interactive social networks.
* **Real-Time Networking:** Users can send connection requests and get instant updates without refreshing.
* **Live Engagement:** Likes and comments on posts update instantly across all active users.
* **Professional Profiles:** Users can showcase their skills, resume, and bio with editable profile pages.
* **Media-Rich Posts:** Integrated image upload functionality for sharing achievements and updates.

---

## 🧠 Key Technical Features

This project demonstrates advanced full-stack capabilities, particularly in real-time communication and media handling.

### 📡 Real-Time Architecture (Socket.io)
* **Instant Notifications:** "Connection Request" buttons update in real-time (Connect -> Pending -> Accepted).
* **Live Feed Updates:** Likes and comments are broadcasted instantly to all viewing users.
* **Event-Driven Backend:** Efficient handling of socket events alongside REST API calls.

### 🔐 Secure Authentication
* **JWT (JSON Web Tokens):** Stateless authentication mechanism using HTTP-only cookies.
* **Bcrypt:** Industry-standard password hashing for user security.
* **Custom Middleware:** `isAuth` middleware to protect private routes and profile data.

### 🖼️ Cloud & Media Management
* **Cloudinary Integration:** Optimized storage and delivery for user avatars and post images.
* **Multer:** Robust middleware for handling `multipart/form-data` file uploads.

---

## ⚙️ Tech Stack

### Frontend
* **React.js:** Component-based UI for a dynamic user experience.
* **Socket.io Client:** For establishing bi-directional communication.
* **CSS / Tailwind:** Responsive design for seamless mobile and desktop usage.

### Backend
* **Node.js & Express.js:** Scalable RESTful API architecture.
* **Socket.io Server:** Managing real-time events (Connections, Likes, Comments).
* **Multer:** File handling middleware.
* **Cookie-Parser:** Secure cookie management.

### Database
* **MongoDB & Mongoose:** NoSQL database for flexible data modeling (Users, Posts, Connections).

---


## 🎓Contributors
-Yash Chauhan