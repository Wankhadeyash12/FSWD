import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';

function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => alert('Failed to load Razorpay');
    document.body.appendChild(script);

    // Fetch order details
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Failed to fetch order');
    }
  };

  const handlePayment = async () => {
    if (!order || !razorpayReady) {
      alert('Please wait for the page to load completely');
      return;
    }

    try {
      setLoading(true);

      // Get Razorpay key
      const keyResponse = await axios.get('/api/payment/key');
      const razorpayKey = keyResponse.data.key;

      // Create Razorpay order
      const orderResponse = await axios.post('/api/payment/create-order', {
        orderId: orderId,
        totalAmount: order.totalAmount
      });

      const { order: razorpayOrder } = orderResponse.data;

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'ShopHub',
        description: `Order #${orderId}`,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await axios.post('/api/payment/verify', {
              orderId: razorpayOrder.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });

            if (verifyResponse.data.paymentStatus === 'succeeded') {
              alert('Payment successful! Order confirmed.');
              navigate('/products');
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Failed to verify payment');
          }
        },
        prefill: {
          name: order.shippingAddress?.name || 'Customer',
          email: 'customer@example.com'
        },
        theme: {
          color: '#667eea'
        }
      };

      if (!window.Razorpay) {
        alert('Razorpay is not loaded');
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.error || error.message || 'Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return <div className="payment-container"><div className="loading">Loading order...</div></div>;
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>💳 Payment</h1>

        <div className="order-summary">
          <h2>Order Summary - #{orderId.substring(0, 8).toUpperCase()}</h2>

          <div className="summary-section">
            <h3>Shipping Address</h3>
            <p>
              {order.shippingAddress?.name}<br />
              {order.shippingAddress?.street}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br />
              {order.shippingAddress?.country}<br />
              {order.shippingAddress?.phone}
            </p>
          </div>

          <div className="summary-section">
            <h3>Items</h3>
            <div className="items-list">
              {order.items?.map(item => (
                <div key={item._id} className="item">
                  <div className="item-info">
                    <span className="item-name">{item.productName}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="price-breakdown">
            <div className="breakdown-row">
              <span>Subtotal:</span>
              <span>₹{(order.totalAmount * 0.9).toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Tax (10%):</span>
              <span>₹{(order.totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="breakdown-row total">
              <span>Total Amount:</span>
              <span>₹{order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !razorpayReady}
          className="payment-btn"
        >
          {loading ? 'Processing...' : `Pay ₹${order.totalAmount?.toFixed(2)} with Razorpay`}
        </button>

        <p className="payment-info">
          🔒 Secure payment powered by Razorpay<br/>
          All transactions are encrypted and secure
        </p>
      </div>
    </div>
  );
}

export default Payment;
