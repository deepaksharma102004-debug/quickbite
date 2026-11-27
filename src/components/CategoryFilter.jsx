export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "chip active" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}