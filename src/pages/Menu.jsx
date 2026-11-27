import { useParams, Link } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import FoodItemCard from "../components/FoodItemCard";

export default function Menu() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    return (
      <div className="container">
        <p>No Restaurant Found</p>
        <Link to="/" className="back-link">←Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← Back</Link>

      <div className="menu-header">
        <h2>{restaurant.name}</h2>
        <p className="muted">
          {restaurant.category} • ⭐ {restaurant.rating} • {restaurant.deliveryTime}
        </p>
      </div>

      <div className="food-list">
        {restaurant.menu.map((item) => (
          <FoodItemCard
            key={item.id}
            item={item}
            restaurantName={restaurant.name}
          />
        ))}
      </div>
    </div>
  );
}