import React, { useState } from 'react';
import './ProductForm.css';

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      description: '',
      category: 'Electronics',
      price: '',
      discountPrice: '',
      stock: '',
      image: '',
      tags: ''
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.image) {
      alert('Please fill all required fields');
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : 0,
      stock: parseInt(formData.stock),
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
    };

    onSubmit(submitData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price (₹) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Discount Price (₹)</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            placeholder="Leave blank if no discount"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Stock *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL *</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
      </div>

      <div className="form-group full">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="5"
          required
        />
      </div>

      <div className="form-group full">
        <label>Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g., electronics, gadget, tech"
        />
      </div>

      <div className="form-preview">
        {formData.image && (
          <div className="preview-item">
            <h4>Preview</h4>
            <img src={formData.image} alt="preview" onError={(e) => e.target.src = 'https://via.placeholder.com/300'} />
            <p>{formData.name}</p>
            <p className="price">₹{formData.price}</p>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialData ? '💾 Update Product' : '➕ Add Product'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          ❌ Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
