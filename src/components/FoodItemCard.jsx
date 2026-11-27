import { useCart } from "../context/CartContext";

export default function FoodItemCard({ item, restaurantName }) {
  const { cart, addToCart, updateQty } = useCart();

  // ye item cart mein kitni baar hai
  const inCart = cart.find((i) => i.id === item.id);

  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} />
      <div className="food-info">
        <h4>{item.name}</h4>
        <p className="price">₹{item.price}</p>

        {inCart ? (
          <div className="qty-box">
            <button onClick={() => updateQty(item.id, -1)}>−</button>
            <span>{inCart.qty}</span>
            <button onClick={() => updateQty(item.id, 1)}>+</button>
          </div>
        ) : (
          <button
            className="add-btn"
            onClick={() => addToCart({ ...item, restaurantName })}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}