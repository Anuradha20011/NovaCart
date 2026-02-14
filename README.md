# 🛒 NovaCart – Full Stack E-Commerce Web Application

NovaCart is a modern, responsive **Full Stack E-Commerce Web Application** built using:

HTML, CSS, Bootstrap, JavaScript (ES6), Node.js, Express.js and MySQL.

This project demonstrates real-world frontend architecture, Object-Oriented Programming (OOP), REST API integration, and backend database connectivity.

---

## 🌐 Live Demo (Frontend)

Frontend (GitHub Pages):
https://anuradha20011.github.io/NovaCart/

> Note: Backend runs locally using Node.js + MySQL.

---

## 🚀 Project Overview

NovaCart simulates a real-world online shopping platform where users can:

- Browse 20+ products (fetched from MySQL database)
- Search, filter, and sort products
- View product details in modal popup
- Add products to cart
- Increase / Decrease quantity
- Apply coupon codes
- Add/remove wishlist items
- Login / Signup (UI-based authentication)
- Checkout and place orders
- View order history
- Admin can manage products and update order status

Cart and wishlist use LocalStorage.
Products and orders are stored in MySQL database.

---

## ✨ Core Features

### 🛍 Product System (Database Connected)

- Products stored in MySQL
- Fetched using REST API (GET /products)
- Dynamic image rendering
- Category filtering
- Price sorting
- Discount percentage calculation
- Star rating display

---

### 🛒 Cart System (OOP Based)

Implemented using JavaScript Class:

- Add / Remove products
- Increase / Decrease quantity
- Real-time total calculation
- Coupon discount support
- Sliding cart side panel
- LocalStorage persistence

---

### ❤️ Wishlist System

- Add / Remove favorites
- Stored in LocalStorage
- Dynamic UI updates

---

### 🎟 Coupon System

- SAVE10 → 10% discount
- SAVE20 → 20% discount
- Real-time discount calculation

---

### 🔐 Authentication (Frontend Simulation)

- Login & Signup UI
- Session simulation using LocalStorage
- Navbar updates dynamically after login

---

### 💳 Checkout & Orders (Backend Connected)

On checkout:

POST /orders

Order data stored in MySQL:
- items (JSON format)
- total amount
- status (Pending)
- created_at timestamp

Orders page fetches data using:

GET /orders

Admin can update order status:

PUT /orders/:id

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Fetch API
- LocalStorage API

### Backend
- Node.js
- Express.js
- REST APIs
- CORS
- JSON Middleware

### Database
- MySQL
- SQL (INSERT, SELECT, UPDATE, DELETE)

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
│   ├── node_modules/
│
└── README.md

---

## 🔄 API Endpoints

Products:
- GET /products
- POST /products
- PUT /products/:id
- DELETE /products/:id

Orders:
- GET /orders
- POST /orders
- PUT /orders/:id

---

## 🎯 Learning Outcomes

- Built a complete full-stack e-commerce application
- Connected frontend with backend APIs
- Integrated MySQL database with Node.js
- Implemented OOP-based cart system
- Managed application state
- Practiced REST API development
- Deployed frontend using GitHub Pages

---

## 🔮 Future Improvements

- JWT authentication
- Payment gateway integration
- Cloud database deployment
- Backend hosting (Render)
- Admin dashboard analytics
- Role-based authentication

---

## 👩‍💻 Developed By

Anuradha Kumari  
B.Tech Computer Science Student  
Aspiring Full Stack Developer
