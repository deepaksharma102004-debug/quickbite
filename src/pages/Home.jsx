import { useState } from "react";
import { restaurants } from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // data se unique categories nikalo
  const categories = ["All", ...new Set(restaurants.map((r) => r.category))];

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || r.category === category)
  );

  return (
    <div className="container">
      <input
        id="search"
        name="search"
        className="search"
        type="text"
        placeholder="Search restaurants..."
        aria-label="Search restaurants"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      {filtered.length === 0 ? (
        <p className="muted">No restaurant Found.</p>
      ) : (
        <div className="grid">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
}