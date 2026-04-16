import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, productAPI } from '../utils/api';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await cartAPI.updateQuantity(productId, { quantity });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  if (loading) return <div className="loading">Loading cart...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="quantity-control">
                <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              <button
                onClick={() => handleRemoveItem(item.product._id)}
                className="remove-btn"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>$10.00</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%):</span>
            <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(cart.totalPrice + 10 + cart.totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
