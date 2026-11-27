import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { DELIVERY_FEE } from "../constants";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (form.name.trim().length < 2) newErrors.name = "Sahi naam daalo";
    if (!/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = "10 digit ka valid mobile number daalo";
    if (form.address.trim().length < 10) newErrors.address = "Poora address daalo (kam se kam 10 characters)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      id: Date.now(),
      items: cart,
      total: total + DELIVERY_FEE,
      status: "Placed",
      date: new Date().toISOString(),
      customer: {
        name: form.name.trim(),
        phone: form.phone,
        address: form.address.trim(),
      },
    };

    // purane orders uthao, naya sabse upar rakho, wapas save karo
    let oldOrders = [];
    try {
      oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      oldOrders = [];
    }
    localStorage.setItem("orders", JSON.stringify([order, ...oldOrders]));

    clearCart();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Cart khali hai 🛒</h2>
        <Link to="/" className="primary-btn">Restaurants dekho</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16 }}>Checkout</h2>

      <div className="cart-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Delivery Details</h3>

          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Deepak Sharma"
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            maxLength={10}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            autoComplete="street-address"
            rows={3}
            value={form.address}
            onChange={handleChange}
            placeholder="House no, street, area, city, pincode"
          />
          {errors.address && <p className="error">{errors.address}</p>}

          <button type="submit" className="primary-btn place-btn">
            Place Order • ₹{total + DELIVERY_FEE}
          </button>
        </form>

        <div className="summary">
          <h3>Order Summary</h3>
          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Delivery fee</span>
            <span>₹{DELIVERY_FEE}</span>
          </div>
          <div className="summary-row grand">
            <span>To pay</span>
            <span>₹{total + DELIVERY_FEE}</span>
          </div>
        </div>
      </div>
    </div>
  );
}