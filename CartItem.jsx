import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  selectCartItems,
  selectTotalCost,
  selectTotalQuantity,
} from '../redux/CartSlice';
import PlantArt from './PlantArt';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalCost = useSelector(selectTotalCost);
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <h1>Your cart is empty</h1>
          <p>Nothing potted up yet &mdash; the catalog is waiting.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-summary-line">
        <span>
          <strong>{totalQuantity}</strong> {totalQuantity === 1 ? 'plant' : 'plants'} in cart
        </span>
        <span className="cart-summary-total">Total: ${totalCost.toFixed(2)}</span>
      </div>

      <ul className="cart-ledger">
        <li className="cart-ledger-header" aria-hidden="true">
          <span className="col-item">Item</span>
          <span className="col-unit">Unit price</span>
          <span className="col-qty">Quantity</span>
          <span className="col-line">Total</span>
          <span className="col-remove" />
        </li>
        {items.map((item) => (
          <li className="cart-row" key={item.id}>
            <div className="col-item">
              <div className="cart-thumb">
                <PlantArt {...item.art} className="plant-svg" />
              </div>
              <span className="cart-item-name">{item.name}</span>
            </div>
            <span className="col-unit">${item.price.toFixed(2)}</span>
            <span className="col-qty">
              <button
                type="button"
                className="qty-btn"
                aria-label={`Decrease quantity of ${item.name}`}
                onClick={() => dispatch(decrementQuantity(item.id))}
              >
                &minus;
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                type="button"
                className="qty-btn"
                aria-label={`Increase quantity of ${item.name}`}
                onClick={() => dispatch(incrementQuantity(item.id))}
              >
                +
              </button>
            </span>
            <span className="col-line">${(item.price * item.quantity).toFixed(2)}</span>
            <span className="col-remove">
              <button
                type="button"
                className="remove-btn"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => dispatch(removeItem(item.id))}
              >
                Remove
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="cart-actions">
        <Link to="/products" className="btn btn-secondary">
          Continue Shopping
        </Link>
        <button type="button" className="btn btn-primary" onClick={() => setCheckoutMessage(true)}>
          Checkout
        </button>
      </div>

      {checkoutMessage && (
        <p className="checkout-note" role="status">
          Checkout is coming soon &mdash; we&rsquo;re still potting that feature up.
        </p>
      )}
    </main>
  );
}
