import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag, FiTruck, FiCheck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { removeFromCart, updateQuantity, selectCartItems, selectCartTotal } from '../../store/cartSlice';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const shipping = cartTotal >= 5000 ? 0 : 199;
  const finalTotal = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state" style={{ paddingTop: 60 }}>
          <div className="empty-state-icon"><FiShoppingBag size={56} style={{ opacity: 0.2 }} /></div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any kicks yet.</p>
          <Link to="/" className="btn-primary">
            <FiShoppingBag size={16} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      {/* Header */}
      <div className="cart-header">
        <Link to="/" className="breadcrumb-link">
          <FiArrowLeft size={14} /> Continue Shopping
        </Link>
        <h1 className="section-title">
          Your <span className="accent-text">Cart</span>
          <span className="cart-count-badge">{cartItems.length}</span>
        </h1>
      </div>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
              {/* Product Image */}
              <Link to={`/product/${item.id}`} className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </Link>

              {/* Product Info */}
              <div className="cart-item-info">
                <div className="cart-item-top">
                  <div>
                    <span className="cart-item-brand">{item.brand}</span>
                    <Link to={`/product/${item.id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <div className="cart-item-meta">
                      <span>Size: UK {item.selectedSize}</span>
                      <span>•</span>
                      <span>Category: {item.category}</span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    className="cart-remove-btn"
                    onClick={() => dispatch(removeFromCart({ id: item.id, size: item.selectedSize }))}
                    title="Remove"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                <div className="cart-item-bottom">
                  {/* Quantity */}
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(updateQuantity({
                        id: item.id, size: item.selectedSize, quantity: item.quantity - 1
                      }))}
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => dispatch(updateQuantity({
                        id: item.id, size: item.selectedSize, quantity: item.quantity + 1
                      }))}
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="cart-item-price">
                    <span className="cart-price-main">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    {item.quantity > 1 && (
                      <span className="cart-price-unit">
                        ₹{item.price.toLocaleString()} each
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free-shipping' : ''}>
                {shipping === 0 ? <><FiCheck size={13} style={{ color: '#27AE60' }} /> FREE</> : `₹${shipping}`}
              </span>
            </div>
            {shipping > 0 && (
              <div className="shipping-notice">
                <FiTruck size={13} />
                Add ₹{(5000 - cartTotal).toLocaleString()} more for free shipping
              </div>
            )}
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span className="total-amount">₹{finalTotal.toLocaleString()}</span>
          </div>

          <button className="btn-primary checkout-btn">
            Proceed to Checkout →
          </button>

          <div className="summary-perks">
            <p><FiCheck size={13} /> Secure Checkout</p>
            <p><FiShield size={13} /> 100% Authentic Products</p>
            <p><FiRefreshCw size={13} /> 30-Day Returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
