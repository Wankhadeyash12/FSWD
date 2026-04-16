import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ShopHub</h1>
        <p>Discover amazing products at great prices</p>
        <a href="/products" className="hero-btn">Shop Now</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  return (
    <div className="App">
      <Routes>
        {/* Admin routes (no navbar) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Customer routes (with navbar) */}
        <Route
          path="/*"
          element={
            <>
              <Navbar cartCount={3} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment/:orderId" element={<Payment />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
