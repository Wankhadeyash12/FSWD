import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const discountPercent = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {discountPercent > 0 && (
          <div className="discount-badge">{discountPercent}% OFF</div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <p className="product-category">{product.category}</p>

        <div className="product-rating">
          {'⭐'.repeat(Math.round(product.rating))} ({product.reviews?.length || 0})
        </div>

        <div className="product-price">
          {product.discountPrice ? (
            <>
              <span className="original-price">${product.price}</span>
              <span className="final-price">${product.discountPrice}</span>
            </>
          ) : (
            <span className="final-price">${product.price}</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product._id)}
          className="add-to-cart-btn"
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
