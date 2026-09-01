import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { FiFilter, FiArrowLeft, FiX, FiChevronDown, FiGrid, FiActivity, FiTarget, FiSun, FiZap, FiWind, FiPackage } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories, getProductsByCategory } from '../../data/products';
import './Category.css';

const CATEGORY_ICONS = {
  all: FiGrid,
  running: FiActivity,
  basketball: FiTarget,
  lifestyle: FiSun,
  jordan: FiZap,
  airmax: FiWind,
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'newest', label: 'Newest' },
];

const ALL_SIZES = [6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13];

const Category = () => {
  const { type } = useParams();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  const [sort, setSort] = useState('featured');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const category = categories.find(c => c.id === type) || categories[0];

  const baseProducts = useMemo(() => {
    let list = getProductsByCategory(type);
    if (searchQuery) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.includes(searchQuery.toLowerCase()))
      );
    }
    return list;
  }, [type, searchQuery]);

  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    // Size filter
    if (selectedSizes.length > 0) {
      list = list.filter(p => selectedSizes.some(s => p.sizes.includes(s)));
    }

    // Price filter
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return list;
  }, [baseProducts, selectedSizes, priceRange, sort]);

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setPriceRange([0, 30000]);
    setSort('featured');
  };

  const hasActiveFilters = selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 30000;

  return (
    <div className="category-page container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-link"><FiArrowLeft size={14} /> Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          {searchQuery ? `Search: "${searchQuery}"` : category?.label || type}
        </span>
      </nav>

      {/* Header */}
      <div className="category-header">
        <div>
          <h1 className="section-title">
            {searchQuery ? (
              <>Search: <span className="accent-text">"{searchQuery}"</span></>
            ) : (() => {
              const Icon = CATEGORY_ICONS[category?.id];
              return (
                <>{Icon && <Icon size={28} style={{ color: 'var(--accent)', marginRight: 10, verticalAlign: 'middle' }} />}<span className="accent-text">{category?.label || type}</span> Shoes</>
              );
            })()}
          </h1>
          <p className="category-count">{filteredProducts.length} products found</p>
        </div>

        <div className="category-controls">
          {/* Sort */}
          <div className="sort-dropdown">
            <button
              className="sort-btn"
              onClick={() => setSortOpen(!sortOpen)}
            >
              {SORT_OPTIONS.find(o => o.value === sort)?.label}
              <FiChevronDown size={14} className={sortOpen ? 'rotated' : ''} />
            </button>
            {sortOpen && (
              <div className="sort-options">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`sort-option ${sort === opt.value ? 'active' : ''}`}
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Toggle (mobile) */}
          <button
            className={`filter-toggle-btn ${filtersOpen ? 'active' : ''}`}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <FiFilter size={16} />
            Filters
            {hasActiveFilters && <span className="filter-dot"></span>}
          </button>
        </div>
      </div>

      <div className="category-layout">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${filtersOpen ? 'open' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                <FiX size={13} /> Clear All
              </button>
            )}
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4 className="filter-group-title">Price Range</h4>
            <div className="price-display">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={30000}
              step={500}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="price-range-slider"
            />
          </div>

          {/* Sizes */}
          <div className="filter-group">
            <h4 className="filter-group-title">Sizes (UK)</h4>
            <div className="size-grid">
              {ALL_SIZES.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSizes.includes(size) ? 'selected' : ''}`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Category Links */}
          <div className="filter-group">
            <h4 className="filter-group-title">Categories</h4>
            <div className="category-filter-links">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={cat.id === 'all' ? '/category/all' : `/category/${cat.id}`}
                  className={`cat-filter-link ${type === cat.id ? 'active' : ''}`}
                  onClick={() => setFiltersOpen(false)}
                >
                  {cat.icon} {cat.label}
                  <span className="cat-count">
                    {getProductsByCategory(cat.id).length}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="category-products">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><FiPackage size={56} style={{ opacity: 0.2 }} /></div>
              <h2>No Kicks Found</h2>
              <p>Try adjusting your filters or explore another category.</p>
              <button className="btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="products-grid-category">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
