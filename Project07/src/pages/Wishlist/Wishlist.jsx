import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiTrash2, FiShoppingBag, FiArrowLeft, FiStar } from 'react-icons/fi';
import { removeFromWishlist, selectWishlistItems } from '../../store/wishlistSlice';
import { addToCart } from '../../store/cartSlice';
import './Wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, size: product.sizes[3] || product.sizes[0] }));
    dispatch(removeFromWishlist(product.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state" style={{ paddingTop: 60 }}>
          <div className="empty-state-icon"><FiHeart size={56} style={{ opacity: 0.2 }} /></div>
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite kicks by clicking the <FiHeart size={14} style={{ color: 'var(--accent)', verticalAlign: 'middle' }} /> heart icon.</p>
          <Link to="/" className="btn-primary">
            <FiShoppingBag size={16} /> Explore Kicks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page container">
      {/* Header */}
      <div className="wishlist-header">
        <Link to="/" className="breadcrumb-link">
          <FiArrowLeft size={14} /> Continue Shopping
        </Link>
        <h1 className="section-title">
          My <span className="accent-text">Wishlist</span>
          <span className="wishlist-count-badge">{wishlistItems.length}</span>
        </h1>
        <p className="wishlist-subtitle">
          Your saved kicks — add them to cart when you're ready!
        </p>
      </div>

      {/* Wishlist Grid */}
      <div className="wishlist-grid">
        {wishlistItems.map(product => {
          const discount = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );
          return (
            <div key={product.id} className="wishlist-card">
              {/* Image */}
              <Link to={`/product/${product.id}`} className="wishlist-card-image">
                <img src={product.image} alt={product.name} />
                {discount > 0 && (
                  <span className="wl-discount-badge">-{discount}%</span>
                )}
              </Link>

              {/* Info */}
              <div className="wishlist-card-info">
                <div className="wl-meta">
                  <span className="wl-brand">{product.brand}</span>
                  <span className="wl-category">{product.category}</span>
                </div>

                <Link to={`/product/${product.id}`} className="wl-name">
                  {product.name}
                </Link>

                <div className="wl-rating">
                  <FiStar size={12} fill="#FFD700" color="#FFD700" />
                  <span>{product.rating}</span>
                  <span className="wl-review-count">({product.reviewCount.toLocaleString()})</span>
                </div>

                <div className="wl-price">
                  <span className="wl-price-current">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="wl-price-original">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="wl-actions">
                  <button
                    className="btn-primary wl-cart-btn"
                    onClick={() => handleMoveToCart(product)}
                    title="Move to Cart"
                  >
                    <FiShoppingBag size={15} />
                    Move to Cart
                  </button>
                  <button
                    className="wl-remove-btn"
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                    title="Remove from Wishlist"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Bar */}
      <div className="wishlist-actions-bar">
        <Link to="/" className="btn-secondary">
          ← Keep Shopping
        </Link>
        <p className="wishlist-tip">
          <FiHeart size={13} style={{ color: 'var(--accent)' }} />
          Items in your wishlist are not reserved. Add to cart to secure them!
        </p>
      </div>
    </div>
  );
};

export default Wishlist;
