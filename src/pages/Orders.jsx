import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem("orders")) || [];
  } catch {
    return [];
  }
}

export default function Orders() {
  const [orders, setOrders] = useState(loadOrders);
  const [now, setNow] = useState(() => Date.now());

  // har second "abhi ka time" update karo, taaki status badalta rahe
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const clearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  if (orders.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>No orders found 📦</h2>
        <p className="muted">Place the order first</p>
        <Link to="/" className="primary-btn">Check Restaurants</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-header">
        <h2>Your Orders</h2>
        <button className="remove-btn" onClick={clearOrders}>
          Clear history
        </button>
      </div>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} now={now} />
      ))}
    </div>
  );
}