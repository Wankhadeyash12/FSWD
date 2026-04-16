import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../utils/api';
import './Checkout.css';

function Checkout() {
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = async () => {
    if (!Object.values(address).every(v => v)) {
      alert('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await orderAPI.createOrder({ shippingAddress: address });
      setOrder(response.data.order);
      navigate(`/payment/${response.data.order._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        <div className="address-form">
          <h2>Shipping Address</h2>

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={address.name}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="street"
            placeholder="Street address"
            value={address.street}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State / Province"
            value={address.state}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="zipCode"
            placeholder="ZIP / Postal code"
            value={address.zipCode}
            onChange={handleAddressChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleAddressChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={address.phone}
            onChange={handleAddressChange}
          />

          <button
            onClick={handleCreateOrder}
            disabled={loading}
            className="create-order-btn"
          >
            {loading ? 'Creating Order...' : 'Continue to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
