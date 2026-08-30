import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiShoppingBag, FiStar, FiTrendingUp } from 'react-icons/fi';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, size: product.sizes[3] || product.sizes[0] }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {/* Image */}
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="card-discount-badge">-{discount}%</span>
        )}
        {product.featured && (
          <span className="card-featured-badge"><FiTrendingUp size={11} /> Hot</span>
        )}

        {/* Hover actions */}
        <div className="card-actions">
          <button
            className={`card-action-btn wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlist}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart size={17} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="card-info">
        <div className="card-meta">
          <span className="card-brand">{product.brand}</span>
          <span className="card-category">{product.category}</span>
        </div>

        <h3 className="card-name">{product.name}</h3>

        <div className="card-rating">
          <FiStar size={12} fill="#FFD700" color="#FFD700" />
          <span className="rating-val">{product.rating}</span>
          <span className="rating-count">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="card-bottom">
          <div className="card-price">
            <span className="price-current">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <button
            className={`card-cart-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            title="Add to cart"
          >
            <FiShoppingBag size={15} />
            <span>{added ? '✓' : 'Add'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
