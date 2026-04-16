import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🛍️ ShopHub
        </Link>

        <div className="navbar-search">
          <input type="text" placeholder="Search products..." />
          <button>Search</button>
        </div>

        <div className="navbar-links">
          <Link to="/products" className="nav-link">Products</Link>

          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="user-button">
                👤 {user.name}
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/orders" className="dropdown-item">My Orders</Link>
                  <button onClick={() => { logout(); setDropdownOpen(false); }} className="dropdown-item logout">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
