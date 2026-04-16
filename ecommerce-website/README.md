# E-commerce Website

A full-stack e-commerce platform with user authentication, admin panel, shopping cart, and payment integration using **Razorpay**.

## Features

✅ **User Authentication** - Register, Login with form validation
✅ **Admin Panel** - Product management (Add/Edit/Delete)
✅ **Product Catalog** - Browse products with images and descriptions
✅ **Shopping Cart** - Add/Remove items, manage quantities
✅ **Order Management** - Place orders with shipping address
✅ **Payment Integration** - Razorpay payment processing (India-ready)
✅ **Secure Payments** - HMAC-SHA256 signature verification
✅ **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Razorpay** - Payment gateway (India)
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Razorpay Account (for payments)

### Installation

#### Step 1: Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce-db
PORT=5001
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

#### Step 2: Seed Sample Products
```bash
node seed.js
```

#### Step 3: Start Backend
```bash
npm start
```
Server runs on: `http://localhost:5001`

#### Step 4: Frontend Setup
```bash
cd frontend
npm install
npm start
```
Opens at: `http://localhost:3001`

## Features Guide

### 👨‍💼 Admin Panel
- **URL:** `http://localhost:3001/admin/login`
- **Demo Login:** 
  - Email: `admin@example.com`
  - Password: `admin123`
- **Features:**
  - ➕ Add new products
  - ✏️ Edit product details
  - 🗑️ Delete products
  - 📊 View stock levels

### 👤 Customer Features
- **Register:** Create account with validation
- **Products:** Browse 8 sample products
- **Cart:** Add/remove items
- **Checkout:** Enter shipping address
- **Payment:** Secure Razorpay payment

### 💳 Test Razorpay Payment
Use test card:
```
Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

## Project Structure

```
ecommerce-website/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── adminAuthRoutes.js
│   │   ├── adminProductRoutes.js
│   │   └── razorpayRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── ProductList.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Payment.js
│   │   │   ├── AdminLogin.js
│   │   │   └── AdminDashboard.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductForm.js
│   │   │   └── ProductsList.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── AuthContext.js
│   │   └── App.js
│   └── package.json
│
├── QUICKSTART.md
├── ADMIN_SETUP.md
├── IMPLEMENTATION_SUMMARY.md
└── README.md
```

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/admin/auth/login
```

### Products
```
GET    /api/products
GET    /api/admin/products (Admin)
POST   /api/admin/products (Admin)
PUT    /api/admin/products/:id (Admin)
DELETE /api/admin/products/:id (Admin)
```

### Orders
```
POST   /api/orders
GET    /api/orders/:id
```

### Payments
```
POST   /api/payment/create-order
POST   /api/payment/verify
GET    /api/payment/key
```

## Security

- ✅ JWT-based authentication
- ✅ Bcryptjs password hashing
- ✅ HMAC-SHA256 payment verification
- ✅ Role-based admin access
- ✅ Input validation on frontend & backend

## Documentation

- **QUICKSTART.md** - Fast setup guide
- **ADMIN_SETUP.md** - Detailed admin panel guide
- **IMPLEMENTATION_SUMMARY.md** - Technical details

## Troubleshooting

### Products not showing?
```bash
cd backend
node seed.js  # Add sample products
```

### Admin login not working?
- Ensure backend is running on port 5001
- Check `.env` has JWT_SECRET configured
- Use demo credentials: admin@example.com / admin123

### Razorpay payment not opening?
- Verify `.env` has Razorpay keys
- Check browser console for errors
- Ensure backend is running

## Sample Products

After running `seed.js`, you get 8 demo products:
- Wireless Headphones (₹149)
- Smart Watch (₹249)
- Premium T-Shirt (₹34)
- Denim Jeans (₹69)
- Web Development Guide (₹29)
- Coffee Maker (₹99)
- Yoga Mat (₹34)
- Running Shoes (₹119)

## Production Deployment

1. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to live keys
2. Change admin default credentials
3. Set up MongoDB backups
4. Enable HTTPS/SSL
5. Configure production database
6. Set up logging and monitoring

## License

MIT License

## Support

For issues and questions, check the documentation files or console errors.

---

**Status:** ✅ Production Ready | **Updated:** 2024
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── paymentRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── ProductCard.js
│   │   ├── pages/
│   │   │   ├── ProductList.js
│   │   │   ├── Cart.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Checkout.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── AuthContext.js
│   │   └── App.js
│   ├── public/index.html
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `POST /api/products/:id/reviews` - Add review

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/remove/:productId` - Remove from cart
- `PUT /api/cart/update/:productId` - Update quantity
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Payment
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/payment/confirm` - Confirm payment
- `GET /api/payment/public-key` - Get Stripe public key

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: { street, city, state, zipCode, country },
  profileImage: String,
  timestamps
}
```

### Product
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number,
  discountPrice: Number,
  stock: Number,
  rating: Number,
  reviews: Array,
  image: String,
  images: Array,
  seller: ObjectId (ref: User),
  tags: Array,
  timestamps
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  items: Array,
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  totalAmount: Number,
  tax: Number,
  shippingCost: Number,
  stripePaymentId: String,
  timestamps
}
```

## Key Features Explained

### Authentication
- JWT tokens stored in localStorage
- Password encryption with bcryptjs
- Protected routes with auth middleware

### Cart Management
- Store cart items in database
- Auto-calculate totals and item count
- Update quantities in real-time

### Payment Integration
- Stripe Payment Intent API
- Secure payment processing
- Webhook support for payment status

### Product Management
- Category-based filtering
- Search functionality
- Product ratings and reviews

## Testing the App

1. **Register/Login:**
   - Create account or login with existing credentials
   - JWT token auto-saved

2. **Browse Products:**
   - View all products on Products page
   - Filter by category
   - Search by name

3. **Shopping Cart:**
   - Add products to cart
   - Update quantities
   - View cart summary

4. **Checkout:**
   - Fill shipping address
   - Review order details
   - Process payment with Stripe

5. **Order Tracking:**
   - View order history
   - Check order status
   - Cancel pending orders

## Deployment

### Backend (Heroku)
```bash
git push heroku main
```

### Frontend (Vercel)
```bash
vercel
```

### Database
Use MongoDB Atlas cloud database

## Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Ensure mongod is running |
| Stripe errors | Check API keys in .env |
| CORS errors | Verify backend URL in frontend |
| Auth not working | Check JWT_SECRET matches |

## Security Notes

⚠️ Change JWT_SECRET in production
⚠️ Never commit .env file
⚠️ Use HTTPS in production
⚠️ Validate all inputs on backend
⚠️ Implement rate limiting

## Future Enhancements

- [ ] Wishlist feature
- [ ] Real-time notifications
- [ ] Email confirmations
- [ ] Admin dashboard
- [ ] Multiple payment gateways
- [ ] Coupon/Discount codes
- [ ] Order tracking with emails

## License

MIT - Free to use for learning and projects

---

**Created:** 2024  
**Purpose:** Educational - Complete e-commerce platform example
