import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook, FiBox, FiGrid, FiActivity, FiTarget, FiSun, FiZap, FiWind } from 'react-icons/fi';
import { categories } from '../../data/products';
import './Footer.css';

const CATEGORY_ICONS = {
  all: FiGrid,
  running: FiActivity,
  basketball: FiTarget,
  lifestyle: FiSun,
  jordan: FiZap,
  airmax: FiWind,
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <FiBox size={20} style={{ color: 'var(--accent)' }} />
            <span>SOLE<span className="logo-accent">FIRE</span></span>
          </Link>
          <p className="footer-tagline">
            Reimagined Comfort.<br />Built to Stand Out.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="Instagram"><FiInstagram size={18} /></a>
            <a href="#" className="social-btn" aria-label="Twitter"><FiTwitter size={18} /></a>
            <a href="#" className="social-btn" aria-label="YouTube"><FiYoutube size={18} /></a>
            <a href="#" className="social-btn" aria-label="Facebook"><FiFacebook size={18} /></a>
          </div>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-col-title">Shop</h4>
          <ul className="footer-links">
            {categories.filter(c => c.id !== 'all').map(cat => {
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="footer-link">
                    {Icon && <Icon size={13} />} {cat.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Help */}
        <div className="footer-col">
          <h4 className="footer-col-title">Help</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Size Guide</a></li>
            <li><a href="#" className="footer-link">Shipping Info</a></li>
            <li><a href="#" className="footer-link">Returns & Exchanges</a></li>
            <li><a href="#" className="footer-link">Track Order</a></li>
            <li><a href="#" className="footer-link">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col footer-newsletter">
          <h4 className="footer-col-title">Stay in the loop</h4>
          <p className="footer-newsletter-desc">Get early access to drops, exclusives, and more.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn-primary">Join</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom container">
        <p className="footer-copy">© 2024 SoleFire. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
