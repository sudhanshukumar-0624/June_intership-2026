import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiShoppingBag, FiHeart, FiSearch, FiX, FiMenu, FiBox } from 'react-icons/fi';
import { selectCartCount } from '../../store/cartSlice';
import { selectWishlistCount } from '../../store/wishlistSlice';
import { categories } from '../../data/products';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <FiBox size={22} className="logo-icon-svg" />
            <span className="logo-text">SOLE<span className="logo-accent">FIRE</span></span>
          </Link>

          {/* Category Nav */}
          <nav className={`navbar-nav ${mobileOpen ? 'open' : ''}`}>
            {categories.map(cat => (
              <NavLink
                key={cat.id}
                to={cat.id === 'all' ? '/' : `/category/${cat.id}`}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar-actions">
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            <Link to="/wishlist" className="icon-btn icon-btn--badge" aria-label="Wishlist">
              <FiHeart size={20} />
              {wishlistCount > 0 && (
                <span className="badge-count">{wishlistCount}</span>
              )}
            </Link>

            <Link to="/cart" className="icon-btn icon-btn--badge" aria-label="Cart">
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="badge-count">{cartCount}</span>
              )}
            </Link>

            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch}>
              <FiSearch size={22} className="search-icon" />
              <input
                autoFocus
                type="text"
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
                <FiX size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
