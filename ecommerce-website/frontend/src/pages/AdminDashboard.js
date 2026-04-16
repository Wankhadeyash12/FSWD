import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import ProductForm from '../components/ProductForm';
import ProductsList from '../components/ProductsList';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    setAdmin(JSON.parse(adminUser));
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      const token = localStorage.getItem('adminToken');

      if (editingProduct) {
        // Update product
        await axios.put(`/api/admin/products/${editingProduct._id}`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Product updated successfully');
      } else {
        // Create new product
        await axios.post('/api/admin/products', productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Product added successfully');
      }

      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/admin/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <div className="navbar-content">
          <h1>📊 Admin Dashboard</h1>
          <div className="admin-info">
            <span>Welcome, {admin?.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      <div className="admin-container">
        <div className="dashboard-header">
          <h2>Products Management</h2>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(!showForm);
            }}
            className="add-product-btn"
          >
            {showForm ? '❌ Cancel' : '➕ Add New Product'}
          </button>
        </div>

        {showForm ? (
          <ProductForm
            onSubmit={handleAddProduct}
            initialData={editingProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        ) : (
          <div className="dashboard-content">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>No products yet. Add your first product!</p>
              </div>
            ) : (
              <ProductsList
                products={products}
                onEdit={(product) => {
                  setEditingProduct(product);
                  setShowForm(true);
                }}
                onDelete={handleDeleteProduct}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
