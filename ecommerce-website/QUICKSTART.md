# 🚀 E-commerce Platform - Quick Start Guide

## ⚡ Quick Setup (3 Steps)

### Step 1: Seed Database with Sample Products
```bash
cd backend
node seed.js
```
✅ 8 sample products will be added to MongoDB

### Step 2: Start Backend Server (Terminal A)
```bash
cd backend
npm start
```
Backend will run on: **http://localhost:5001**

### Step 3: Start Frontend Server (Terminal B)
```bash
cd frontend
npm start
```
Frontend will run on: **http://localhost:3001**

---

## 🔧 Setup Razorpay (First Time Only)

1. Get Razorpay API keys from https://dashboard.razorpay.com
2. Update `backend/.env`:
   ```
   RAZORPAY_KEY_ID=your_key
   RAZORPAY_KEY_SECRET=your_secret
   ```

---

## 👨‍💼 Admin Panel

**URL:** `http://localhost:3001/admin/login`

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

**Features:**
- ➕ Add new products
- ✏️ Edit products
- 🗑️ Delete products
- 📊 View all products in a table

---

## 👤 Customer Features

| Route | Purpose |
|-------|---------|
| `/register` | Create account (min 6 char password) |
| `/login` | Login to account |
| `/products` | Browse products |
| `/cart` | View shopping cart |
| `/checkout` | Enter shipping address |
| `/payment/:orderId` | Razorpay payment page |

---

## 💳 Test Razorpay Payment

Use this test card:
```
Number: 4111 1111 1111 1111
Expiry: 12/25 (any future date)
CVV: 123
```

---

## 📦 Sample Products Included

After `node seed.js`, you'll have 8 products:
1. Wireless Headphones - ₹149
2. Smart Watch - ₹249
3. Premium T-Shirt - ₹34
4. Denim Jeans - ₹69
5. Web Development Guide - ₹29
6. Coffee Maker - ₹99
7. Yoga Mat - ₹34
8. Running Shoes - ₹119

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Products not showing | Run `node backend/seed.js` |
| Admin login fails | Check backend is running on 5001 |
| Razorpay not opening | Check `.env` has Razorpay keys |
| Registration fails | Password must be 6+ chars |

---

## 📚 What's New (Latest Update)

✅ **Admin Panel** - Complete product management interface
✅ **Razorpay Integration** - Secure payment processing
✅ **Improved Registration** - Better validation and error handling
✅ **Product CRUD** - Add, edit, delete products from dashboard
✅ **8 Sample Products** - Ready-to-go demo data

---

## 🔒 Security Features

- JWT authentication
- Bcryptjs password hashing
- HMAC-SHA256 payment verification
- Role-based access control (Admin)

---

## 📖 Documentation

- See `ADMIN_SETUP.md` for detailed admin setup
- See `README.md` for project overview

---

## 🎯 Quick Checklist

- [ ] Start MongoDB (if not running)
- [ ] Run `node backend/seed.js`
- [ ] Start backend: `npm start` (backend folder)
- [ ] Start frontend: `npm start` (frontend folder)
- [ ] Go to http://localhost:3001
- [ ] Admin login: admin@example.com / admin123
- [ ] Create user account at /register
- [ ] Shop, add to cart, checkout, pay with Razorpay

---

## 🎉 All Set!

Your e-commerce platform is ready. Start the servers above and begin testing!
| /register | Registration |

## Backend Endpoints

```
GET  /api/products       - Get all products
POST /api/cart/add       - Add to cart
GET  /api/orders         - Get user orders
POST /api/payment/*      - Payment endpoints
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Cannot connect to MongoDB" | Start `mongod` first |
| "Port 5000 in use" | Change PORT in .env |
| Stripe errors | Check API keys in .env |
| React won't start | Delete node_modules, run `npm install` |

## Features

✅ User Registration & Login
✅ Product Browsing & Search
✅ Shopping Cart
✅ Secure Checkout
✅ Stripe Payment Integration
✅ Order Management

## Environment Setup

Create `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce-db
PORT=5000
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx
```

Get Stripe keys from: https://dashboard.stripe.com

## Add Sample Products

Use MongoDB Compass or Terminal:
```bash
mongosh
use ecommerce-db
db.products.insertMany([
  { name: "Laptop", price: 999, stock: 10, category: "Electronics", image: "https://via.placeholder.com/300", description: "High performance" },
  { name: "Phone", price: 599, stock: 20, category: "Electronics", image: "https://via.placeholder.com/300", description: "Latest model" },
  { name: "Shirt", price: 29, stock: 50, category: "Clothing", image: "https://via.placeholder.com/300", description: "Cotton" }
])
```

## Testing Payments

1. Add product to cart
2. Proceed to checkout
3. Fill address details
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete payment

## Deployment

### Backend (Heroku)
```bash
git push heroku main
```

### Frontend (Vercel)
```bash
vercel
```

## Licenses & Credits

MIT License - Learn and build!

Enjoy your E-commerce platform! 🚀
