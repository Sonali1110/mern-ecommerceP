# 🛒 MERN Stack eCommerce Backend

This is a full-featured eCommerce backend built with MongoDB, Express, Node.js and JWT authentication.

## 📦 Features

- User registration and login
- Admin access control
- Product CRUD (Create, Read, Update, Delete)
- Order creation, payment simulation, delivery tracking
- Email confirmation on order placement (NodeMailer)
- Ready for frontend connection via REST API

## 🚀 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Auth
- NodeMailer (email)
- Demo Payment (mocked)

## 📂 API Endpoints

View the full [API documentation](#) or import the Postman collection.

## 🔒 .env File Setup

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecom
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
