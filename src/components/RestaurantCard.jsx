import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  const { id, name, category, rating, deliveryTime, image } = restaurant;

  return (
    <Link to={`/restaurant/${id}`} className="card">
      <img src={image} alt={name} />
      <div className="card-body">
        <h3>{name}</h3>
        <p className="muted">{category}</p>
        <div className="card-info">
          <span className="rating">⭐ {rating}</span>
          <span>{deliveryTime}</span>
        </div>
      </div>
    </Link>
  );
}