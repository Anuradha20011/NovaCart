# 🛒 NovaCart – Full Stack E-Commerce Web Application

NovaCart is a responsive full-stack e-commerce web application built to simulate a real-world online shopping experience.

This project demonstrates frontend architecture, Object-Oriented Programming (OOP), REST API integration, and backend database connectivity using Node.js and MySQL (local development).

---

## 🚀 Project Overview

NovaCart allows users to:

- Browse 20+ dynamic products
- Search, filter, and sort products
- View product details in a modal popup
- Add products to cart
- Increase / Decrease product quantity
- Apply discount coupon codes
- Add / Remove wishlist items
- Login / Signup (UI-based authentication)
- Checkout and place orders
- View order history
- Admin manage products and update order status (local backend)

Cart and wishlist data are stored using LocalStorage, while products and orders are managed via MySQL database in the local backend setup.

---

## ✨ Core Features

### 🛍 Product System
- 20+ products with images and descriptions
- Dynamic discount calculation
- Star rating display
- Category-based filtering
- Price sorting (Low → High / High → Low)
- Search functionality

---

### 🛒 Cart System (OOP-Based)
- Implemented using JavaScript Class
- Add / Remove items
- Increase / Decrease quantity
- Real-time total calculation
- Sliding cart panel
- LocalStorage persistence

---

### ❤️ Wishlist System
- Add / Remove favorite products
- Stored using LocalStorage

---

### 🎟 Coupon System

- SAVE10 → 10% discount
- SAVE20 → 20% discount
- Dynamic discount logic

---

### 🔐 Authentication (Frontend Simulation)
- Login & Signup pages
- Navbar updates dynamically after login
- Session simulation using LocalStorage

---

### 💳 Checkout & Order Management
- Billing details form
- Order summary display
- Orders stored in MySQL (local backend)
- Order status management
- Admin panel for product management (local setup)

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Fetch API
- LocalStorage API

--

### Backend (Local Development)
- Node.js
- Express.js
- REST APIs
- CORS
- MySQL Database

---

## 📁 Project Structure

NovaCart/
│
├── index.html
├── checkout.html
├── login.html
├── signup.html
├── orders.html
├── success.html
├── admin.html
│
├── style.css
├── script.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│
└── README.md

---

## 🧠 Concepts Used

- Object-Oriented Programming (Cart Class)
- REST API Integration
- CRUD Operations (Create, Read, Update, Delete)
- DOM Manipulation
- Event Handling
- State Management
- Database Connectivity
- JSON Handling

