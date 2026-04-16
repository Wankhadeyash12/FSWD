# E-commerce Setup Guide

## Complete Setup Instructions

### Step 1: Prerequisites

Ensure you have:
1. **Node.js** v14+ - [Download](https://nodejs.org/)
2. **MongoDB** (local or MongoDB Atlas)
3. **Stripe Account** - [Create Account](https://stripe.com)
4. **Git** (optional)

### Step 2: MongoDB Setup

#### Option A: Local MongoDB
```bash
# Download & Install from https://www.mongodb.com/try/download/community
# Start MongoDB (Windows as Administrator)
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to `.env` file

### Step 3: Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get API keys:
   - **Secret Key** (starts with `sk_test_`)
   - **Public Key** (starts with `pk_test_`)
3. Add to `.env` file in backend folder

### Step 4: Backend Configuration

```bash
cd ecommerce-website/backend
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce-db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_in_production
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxx
```

Install & Run:
```bash
npm install
npm run dev
```

Expected output:
```
Connected to MongoDB successfully!
Server running on http://localhost:5000
```

### Step 5: Frontend Configuration

Open new terminal:
```bash
cd ecommerce-website/frontend
npm install
npm start
```

Expected output:
```
Local: http://localhost:3000
```

### Step 6: Test the Application

#### 1. Register User
- Go to http://localhost:3000/register
- Create account with email/password

#### 2. Add Sample Products (via MongoDB)
Use MongoDB Compass or Mongo CLI to add products:
```javascript
db.products.insertMany([
  {
    name: "Laptop",
    description: "High performance laptop",
    category: "Electronics",
    price: 999,
    discountPrice: 799,
    stock: 10,
    image: "https://via.placeholder.com/300"
  },
  {
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt",
    category: "Clothing",
    price: 29,
    stock: 50,
    image: "https://via.placeholder.com/300"
  }
])
```

#### 3. Test Shopping Flow
1. Browse products at `/products`
2. Add items to cart
3. Go to cart page
4. Proceed to checkout
5. Fill shipping address
6. Process payment with Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Date: Any future date
   - CVC: Any 3 digits

### Step 7: Stripe Test Cards

For testing in development:

| Card Type | Number | Exp | CVC |
|-----------|--------|-----|-----|
| Visa | 4242 4242 4242 4242 | 12/25 | 123 |
| MasterCard | 5555 5555 5555 4444 | 12/25 | 123 |
| Amex | 3782 822463 10005 | 12/25 | 1234 |
| Decline | 4000 0000 0000 0002 | 12/25 | 123 |

### Step 8: File Structure

```
ecommerce-website/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   ├── server.js        # Express app
│   ├── .env             # Configuration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # API & Auth
│   │   ├── App.js       # Main component
│   │   └── index.js     # Entry point
│   ├── public/
│   └── package.json
└── README.md
```

### Step 9: Environment Variables

#### Backend (.env)
```
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce-db

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=change_this_key_in_production

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
```

#### Frontend (proxy in package.json)
```json
"proxy": "http://localhost:5000"
```

### Step 10: Running Multiple Terminals

You need 2-3 terminals:

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd ecommerce-website/backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd ecommerce-website/frontend
npm start
```

## Troubleshooting

### MongoDB Connection Failed
- Check if `mongod` is running
- Verify connection string is correct
- For Atlas, check IP whitelist

### Stripe Payment Errors
- Verify API keys are correct
- Check test vs live keys in .env
- Use test cards for development

### CORS Errors
- Ensure backend is running on :5000
- Check proxy in frontend package.json
- Verify cross-origin headers

### Dependencies Missing
- Delete node_modules
- Delete package-lock.json
- Run `npm install` again

### Port Already in Use
- Change PORT in .env
- Or kill process on port: `netstat -ano | findstr :5000`

## First-Time Setup Checklist

- [ ] Install Node.js
- [ ] Start MongoDB
- [ ] Create Stripe account
- [ ] Clone/download project
- [ ] Setup backend .env
- [ ] Install backend dependencies
- [ ] Start backend server
- [ ] Install frontend dependencies
- [ ] Start frontend server
- [ ] Test registration
- [ ] Add test products
- [ ] Test checkout with Stripe test card

## Security Reminders

⚠️ Change `JWT_SECRET` before deploying to production
⚠️ Use `STRIPE_SECRET_KEY` only on backend, never expose in frontend
⚠️ Add environment variables to hosting platform (no .env files)
⚠️ Enable HTTPS for production

## Next Steps After Setup

1. Add more products to database
2. Test all payment flows
3. Customize product images
4. Add email notifications
5. Deploy to production

## Need Help?

Check API documentation in README.md for endpoint details and request/response formats.
