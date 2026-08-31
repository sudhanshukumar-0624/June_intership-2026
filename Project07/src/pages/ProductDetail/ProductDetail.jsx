import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiShoppingBag, FiZap, FiTruck, FiShield, FiRefreshCw, FiRotateCcw, FiStar, FiMaximize2, FiPackage, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { getProductById, getSimilarProducts } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <FiStar
      key={i}
      size={14}
      fill={i < Math.floor(rating) ? '#FFD700' : 'none'}
      color={i < Math.floor(rating) ? '#FFD700' : '#444'}
    />
  ));
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = getProductById(id);
  const similar = product ? getSimilarProducts(product, 4) : [];

  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product?.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setSelectedSize(null);
    setAddedToCart(false);
    setSizeError(false);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="empty-state">
          <div className="empty-state-icon"><FiPackage size={56} style={{ opacity: 0.2 }} /></div>
          <h2>Product Not Found</h2>
          <p>This product doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    dispatch(addToCart({ product, size: selectedSize }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    dispatch(addToCart({ product, size: selectedSize }));
    navigate('/cart');
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const avgRating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link"><FiArrowLeft size={14} /> Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/category/${product.category}`} className="breadcrumb-link">
            {product.category}
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="product-layout">
          {/* ===== IMAGES ===== */}
          <div className="product-images">
            {/* Thumbnails */}
            <div className="image-thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb ${selectedImage === i ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="main-image-wrap">
              {discount > 0 && (
                <span className="detail-discount-badge">-{discount}% OFF</span>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="main-image"
                key={selectedImage}
              />
              <button
                className={`wishlist-overlay-btn ${isWishlisted ? 'active' : ''}`}
                onClick={handleWishlist}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <FiHeart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* ===== PRODUCT INFO ===== */}
          <div className="product-info">
            {/* Brand & Tags */}
            <div className="product-top-meta">
              <span className="detail-brand">{product.brand}</span>
              <div className="product-tags">
                {product.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>

            {/* Name */}
            <h1 className="product-name">{product.name}</h1>

            {/* Rating */}
            <div className="product-rating-row">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-score">{product.rating}</span>
              <a href="#reviews" className="rating-link">
                ({product.reviewCount.toLocaleString()} reviews)
              </a>
            </div>

            {/* Price */}
            <div className="product-price-section">
              <span className="detail-price-current">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="detail-price-original">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="detail-price-save">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="product-option-group">
              <div className="option-header">
                <span className="option-label">Color</span>
                <span className="option-value">{
                  ['Black/Red', 'White/Blue', 'Orange/Grey'][selectedColor]
                }</span>
              </div>
              <div className="color-swatches">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`color-swatch ${selectedColor === i ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(i)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="product-option-group">
              <div className="option-header">
                <span className="option-label">Size (UK)</span>
                {selectedSize && <span className="option-value">UK {selectedSize}</span>}
              </div>
              {sizeError && (
                <p className="size-error"><FiAlertTriangle size={13} /> Please select a size before adding to cart</p>
              )}
              <div className="size-selector">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#" className="size-guide-link"><FiMaximize2 size={12} /> View Size Guide</a>
            </div>

            {/* CTA Buttons */}
            <div className="product-ctas">
              <button
                className={`btn-primary cta-cart ${addedToCart ? 'success' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <><FiCheck size={18} /> Added to Cart!</>
                ) : (
                  <><FiShoppingBag size={18} /> Add to Cart</>
                )}
              </button>

              <button className="btn-buy-now" onClick={handleBuyNow}>
                <FiZap size={18} /> Buy Now
              </button>

              <button
                className={`btn-wishlist ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={handleWishlist}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <FiHeart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Perks */}
            <div className="product-perks">
              <div className="perk">
                <FiTruck size={16} className="perk-icon" />
                <div>
                  <span className="perk-title">Free Delivery</span>
                  <span className="perk-desc">On orders above ₹5,000</span>
                </div>
              </div>
              <div className="perk">
                <FiRotateCcw size={16} className="perk-icon" />
                <div>
                  <span className="perk-title">Easy Returns</span>
                  <span className="perk-desc">30-day return policy</span>
                </div>
              </div>
              <div className="perk">
                <FiShield size={16} className="perk-icon" />
                <div>
                  <span className="perk-title">100% Authentic</span>
                  <span className="perk-desc">Guaranteed genuine products</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="product-tabs">
          <div className="tabs-nav">
            {['description', 'reviews', 'shipping'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {/* Description */}
            {activeTab === 'description' && (
              <div className="tab-description">
                <p>{product.description}</p>
                <ul className="detail-features">
                  <li>Upper: Premium leather and synthetic materials</li>
                  <li>Midsole: Encapsulated Air-Sole unit</li>
                  <li>Outsole: Rubber with traction pattern</li>
                  <li>Closure: Lace-up</li>
                  <li>Fit: True to size</li>
                </ul>
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <div className="tab-reviews" id="reviews">
                {/* Rating Summary */}
                <div className="reviews-summary">
                  <div className="reviews-avg">
                    <span className="avg-score">{avgRating.toFixed(1)}</span>
                    <div className="stars">{renderStars(avgRating)}</div>
                    <span className="avg-count">{product.reviews.length} reviews</span>
                  </div>
                </div>

                {/* Review List */}
                <div className="reviews-list">
                  {product.reviews.map(review => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-avatar">{review.avatar}</div>
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.user}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="stars">{renderStars(review.rating)}</div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping */}
            {activeTab === 'shipping' && (
              <div className="tab-shipping">
                <div className="shipping-info">
                  <div className="shipping-row">
                    <FiTruck size={18} className="perk-icon" />
                    <div>
                      <h4>Standard Delivery</h4>
                      <p>5-7 business days • Free on orders above ₹5,000</p>
                    </div>
                  </div>
                  <div className="shipping-row">
                    <FiZap size={18} className="perk-icon" />
                    <div>
                      <h4>Express Delivery</h4>
                      <p>1-2 business days • ₹199</p>
                    </div>
                  </div>
                  <div className="shipping-row">
                    <FiRotateCcw size={18} className="perk-icon" />
                    <div>
                      <h4>Returns</h4>
                      <p>30-day hassle-free returns. Items must be unworn and in original packaging.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== SIMILAR PRODUCTS ===== */}
        {similar.length > 0 && (
          <section className="similar-section">
            <div className="section-header">
              <h2 className="section-title">
                You Might <span className="accent-text">Also Like</span>
              </h2>
              <Link to={`/category/${product.category}`} className="btn-ghost">
                View All
              </Link>
            </div>
            <div className="similar-grid">
              {similar.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
