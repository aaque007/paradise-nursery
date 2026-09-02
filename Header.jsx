import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../redux/CartSlice';

export default function Header() {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        Paradise Nursery
      </NavLink>
      <nav className="main-nav" aria-label="Primary">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
          Plants
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active cart-link' : 'cart-link')}>
          <span className="cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M3 4h2l1.6 10.2A2 2 0 0 0 8.57 16H18a2 2 0 0 0 1.94-1.5L21.5 8H6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" />
            </svg>
          </span>
          Cart
          <span className="cart-count" data-testid="cart-count">
            {totalQuantity}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}
