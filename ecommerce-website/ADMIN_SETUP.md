# Admin Panel & Razorpay Integration Setup Guide

## Overview
This guide will help you set up and use the newly created admin panel for product management and integrate Razorpay payment gateway into your e-commerce website.

## ✅ What's New

### 1. **Admin Frontend Components**
- `/admin/login` - Admin login page with email/password authentication
- `/admin/dashboard` - Admin dashboard for product management
- Product form for adding/editing products
- Product list table for viewing, editing, and deleting products

### 2. **Admin Backend Routes**
- `POST /api/admin/auth/login` - Admin authentication
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create a new product
- `PUT /api/admin/products/:id` - Update a product
- `DELETE /api/admin/products/:id` - Delete a product

### 3. **Razorpay Payment Integration**
- `POST /api/payment/create-order` - Create a Razorpay order
- `POST /api/payment/verify` - Verify payment signature
- `GET /api/payment/key` - Get Razorpay public key
- New Payment page at `/payment/:orderId`

### 4. **Registration Form Fix**
- Added password confirmation validation
- Added name length validation (min 2 characters)
- Added password length validation (min 6 characters)
- Better error messages

---

## 🔧 Setup Instructions

### Step 1: Setup Your Razorpay Account
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up or log in to your account
3. Navigate to **Settings → API Keys**
4. Copy your **Key ID** and **Key Secret**

### Step 2: Update Environment Variables
Update your `backend/.env` file with your Razorpay keys:

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce-db
PORT=5001
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

### Step 3: Install Dependencies
If not already installed, add the Razorpay package:

```bash
cd backend
npm install razorpay
```

### Step 4: Seed Database with Sample Products
Run the seed script to populate your database with sample products:

```bash
cd backend
node seed.js
```

**Expected Output:**
```
✅ Database connection successful
✅ Database cleared
✅ 8 sample products added
```

### Step 5: Start the Backend Server
```bash
cd backend
npm start
```

You should see:
```
✅ Server running on http://localhost:5001
✅ Connected to MongoDB
```

### Step 6: Start the Frontend Server
In a new terminal:

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3001`

---

## 📱 Using the Admin Panel

### Login to Admin Panel

1. **Navigate to Admin Login:**
   - URL: `http://localhost:3001/admin/login`
   
2. **Default Admin Credentials:**
   ```
   Email: admin@example.com
   Password: admin123
   ```

   ⚠️ **Note:** These are hardcoded demo credentials. For production, create admin users through database directly or a separate admin registration endpoint.

### Managing Products

1. **View All Products:**
   - Click on the dashboard to see all products in a table format
   - View product details: Name, Category, Price, Stock, and Images

2. **Add a New Product:**
   - Click **➕ Add New Product** button
   - Fill in product details:
     - **Name:** Product name (required)
     - **Category:** Select from dropdown
     - **Price:** Original price in ₹
     - **Discount Price:** Optional discounted price
     - **Stock:** Quantity available
     - **Image:** Product image URL
     - **Description:** Product description (required)
     - **Tags:** Comma-separated tags
   - Click **➕ Add Product** to save

3. **Edit a Product:**
   - Click the **✏️ Edit** button on any product
   - Modify the details
   - Click **💾 Update Product** to save

4. **Delete a Product:**
   - Click the **🗑️ Delete** button
   - Confirm the deletion

5. **Stock Status Indicators:**
   - 🟢 **Green** - High stock (> 10 items)
   - 🟡 **Yellow** - Low stock (1-10 items)
   - 🔴 **Red** - Out of stock (0 items)

---

## 💳 Payment Integration (Razorpay)

### Customer Payment Flow

1. **Add Products to Cart** - User adds items to their shopping cart

2. **Proceed to Checkout:**
   - Click "Checkout" button in cart
   - Enter shipping address (all fields required)
   - Click "Continue to Payment"

3. **Payment Page:**
   - View order summary with items and pricing
   - Click "Pay ₹[Amount] with Razorpay"
   - Razorpay payment modal opens

4. **Complete Payment:**
   - Enter card/wallet/UPI details
   - OTP verification (if required)
   - Payment completes
   - Success message displayed
   - Redirected to products page

### Payment Security

- **HMAC-SHA256 Signature Verification:** All payments are verified using secure signatures
- **Encryption:** All transactions are encrypted through Razorpay
- **Amount in Paise:** Backend converts amounts to paise (₹1 = 100 paise) for Razorpay

### Test Payment Details

Use these test credentials in Razorpay payment modal:

**Card (Success):**
- Number: `4111 1111 1111 1111`
- Expiry: `12/25` (any future date)
- CVV: `123`

**Card (Failure):**
- Number: `4111 1111 1111 1110`

---

## 🐛 Troubleshooting

### Products Not Showing
- **Solution:** Run `node backend/seed.js` to populate the database
- Check MongoDB connection with `mongosh`

### Registration Failing
- **Check:** Password is at least 6 characters
- **Check:** Passwords match in confirmation field
- **Check:** Email is not already registered
- **Check:** Backend server is running

### Admin Login Not Working
- **Default Email:** admin@example.com
- **Default Password:** admin123
- **Check:** Backend is running on port 5001
- **Check:** `.env` file has JWT_SECRET configured

### Razorpay Payment Not Opening
- **Check:** Razorpay script loaded (check browser console)
- **Check:** RAZORPAY_KEY_ID set correctly in `.env`
- **Check:** Backend is running (`npm start` in backend folder)
- **Check:** Browser console for JavaScript errors

### CORS Errors
- **Solution:** Backend CORS middleware is configured
- **Check:** Backend proxy in frontend `package.json` points to `http://localhost:5001`

---

## 📊 Database Schema

### Admin Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ('admin' or 'super-admin'),
  permissions: Object,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number,
  discountPrice: Number,
  stock: Number,
  image: String,
  tags: [String],
  seller: String (admin ID),
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Verification
All payments include:
- Order ID (Razorpay)
- Payment ID
- Signature (HMAC-SHA256)
- Timestamp verification

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Update admin credentials in database
- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Replace test Razorpay keys with production keys
- [ ] Implement proper admin registration flow
- [ ] Add email verification for user registration
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up MongoDB backups
- [ ] Configure proper error logging
- [ ] Add rate limiting for APIs
- [ ] Test payment flow thoroughly
- [ ] Enable 2FA for admin accounts

---

## 📞 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/admin/auth/login` - Admin login

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/key` - Get Razorpay key

---

## 🎉 Success!

Your e-commerce platform is now fully functional with:
✅ User authentication and registration
✅ Admin panel for product management
✅ Razorpay payment integration
✅ Order management
✅ Sample products in database

For any issues, check the backend console output and browser console for error messages.

Happy selling! 🚀
