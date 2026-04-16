import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI, cartAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts({ category, search });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartAPI.addToCart({ productId, quantity: 1 });
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please login first.');
    }
  };

  return (
    <div className="product-list-container">
      <div className="filters">
        <h3>Filters</h3>
        
        <div className="filter-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button onClick={fetchProducts} className="filter-btn">Apply Filters</button>
      </div>

      <div className="products-section">
        <h2>Products ({products.length})</h2>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
