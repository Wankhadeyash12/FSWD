import React from 'react';
import './ProductsList.css';

function ProductsList({ products, onEdit, onDelete }) {
  return (
    <div className="products-table-container">
      {products.length === 0 ? (
        <div className="empty-state">No products found</div>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>
                  <img src={product.image} alt={product.name} onError={(e) => e.target.src = 'https://via.placeholder.com/50'} />
                </td>
                <td>
                  <strong>{product.name}</strong>
                  <p className="description">{product.description.substring(0, 50)}...</p>
                </td>
                <td>{product.category}</td>
                <td>
                  <div className="price-cell">
                    {product.discountPrice ? (
                      <>
                        <span className="original">₹{product.price}</span>
                        <span className="discount">₹{product.discountPrice}</span>
                      </>
                    ) : (
                      <span>₹{product.price}</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`stock ${product.stock > 10 ? 'high' : product.stock > 0 ? 'low' : 'out'}`}>
                    {product.stock > 0 ? product.stock : 'Out'}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button
                      onClick={() => onEdit(product)}
                      className="edit-btn"
                      title="Edit product"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="delete-btn"
                      title="Delete product"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductsList;
