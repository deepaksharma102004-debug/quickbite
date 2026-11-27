import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { DELIVERY_FEE } from "../constants";



export default function Cart() {
  const { cart, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <p className="muted">Add some tasty!</p>
        <Link to="/" className="primary-btn">Look the Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="remove-btn" onClick={clearCart}>Clear cart</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="summary">
          <h3>Bill Details</h3>
          <div className="summary-row">
            <span>Item total</span>
            <span>₹{total}</span>
          </div>
          <div className="summary-row">
            <span>Delivery fee</span>
            <span>₹{DELIVERY_FEE}</span>
          </div>
          <div className="summary-row grand">
            <span>To pay</span>
            <span>₹{total + DELIVERY_FEE}</span>
          </div>
          <Link to="/checkout" className="primary-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}