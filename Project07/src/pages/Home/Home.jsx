import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap, FiTrendingUp, FiGrid, FiActivity, FiTarget, FiSun, FiWind } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories } from '../../data/products';
import './Home.css';

const CATEGORY_ICONS = {
  all: FiGrid,
  running: FiActivity,
  basketball: FiTarget,
  lifestyle: FiSun,
  jordan: FiZap,
  airmax: FiWind,
};

const HERO_PRODUCTS = products.filter(p => p.featured).slice(0, 3);
const FEATURED_CATEGORIES = categories.filter(c => c.id !== 'all');

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const displayProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="home">
      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-bg-text">SOLEFIRE</div>
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="badge">
              <FiZap size={10} />
              New Collection 2024
            </div>
            <h1 className="hero-title">
              Reimagined<br />
              <span className="hero-title-accent">Comfort.</span><br />
              Built to<br />Stand Out.
            </h1>
            <p className="hero-subtitle">
              Discover the world's most iconic sneakers.<br />
              From court legends to street staples.
            </p>
            <div className="hero-ctas">
              <Link to="/category/all" className="btn-primary">
                Shop All <FiArrowRight size={16} />
              </Link>
              <Link to="/category/jordan" className="btn-secondary">
                Explore Jordans
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-value">30+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">5</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">4.7★</span>
                <span className="stat-label">Avg Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Product Cards */}
          <div className="hero-products">
            {HERO_PRODUCTS.map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`hero-product-card hero-product-card--${i}`}
              >
                <img src={product.image} alt={product.name} />
                <div className="hero-product-info">
                  <span className="hero-product-name">{product.name}</span>
                  <span className="hero-product-price">₹{product.price.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* ===== CATEGORY STRIPS ===== */}
      <section className="category-strip container">
        {FEATURED_CATEGORIES.map(cat => {
          const Icon = CATEGORY_ICONS[cat.id];
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="category-chip"
            >
              {Icon && <Icon size={18} className="chip-icon" />}
              <span className="chip-label">{cat.label}</span>
              <FiArrowRight size={14} className="chip-arrow" />
            </Link>
          );
        })}
      </section>

      {/* ===== FEATURED DROPS ===== */}
      <section className="featured-section container">
        <div className="section-header">
          <div>
            <span className="badge"><FiTrendingUp size={11} /> Hot Drops</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Featured <span className="accent-text">Drops</span>
            </h2>
          </div>
          <Link to="/category/all" className="btn-ghost">
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="featured-grid">
          {HERO_PRODUCTS.map((product, i) => (
            <Link key={product.id} to={`/product/${product.id}`} className={`featured-card featured-card--${i}`}>
              <div className="featured-card-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="featured-card-info">
                <div className="badge">{product.category}</div>
                <h3>{product.name}</h3>
                <p className="featured-card-desc">{product.description.slice(0, 80)}...</p>
                <div className="featured-card-price">
                  <span className="price-current">₹{product.price.toLocaleString()}</span>
                  <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <span className="featured-card-cta">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ALL PRODUCTS ===== */}
      <section className="all-products container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              All <span className="accent-text">Kicks</span>
            </h2>
          </div>
          {/* Filter Tabs */}
          <div className="filter-tabs">
            {categories.map(cat => {
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <button
                  key={cat.id}
                  className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {Icon && <Icon size={13} />} {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="products-grid">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="promo-banner container">
        <div className="promo-inner">
          <div className="promo-text">
            <h2>Free Shipping on Orders Over <span className="accent-text">₹5,000</span></h2>
            <p>Use code <strong>SOLEFIRE24</strong> for 10% off your first order</p>
          </div>
          <Link to="/category/all" className="btn-primary">
            Shop Now <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
