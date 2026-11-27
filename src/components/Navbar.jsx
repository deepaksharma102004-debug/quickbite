import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🍔 QuickBite</Link>
      <div className="nav-links">
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart ({count})</Link>
      </div>
    </nav>
  );
}