import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <h4>{item.name}</h4>
        {item.restaurantName && <p className="muted">{item.restaurantName}</p>}
        <p className="price">₹{item.price}</p>
      </div>

      <div className="cart-item-actions">
        <div className="qty-box">
          <button onClick={() => updateQty(item.id, -1)}>−</button>
          <span>{item.qty}</span>
          <button onClick={() => updateQty(item.id, 1)}>+</button>
        </div>
        <p className="line-total">₹{item.price * item.qty}</p>
        <button className="remove-btn" onClick={() => removeItem(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}