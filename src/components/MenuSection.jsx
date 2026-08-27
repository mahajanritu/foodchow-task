import MenuItem from "./MenuItem";

function MenuSection({
  category,
  onAdd,
  getQuantity,
  onIncrease,
  onDecrease,
}) {
  const items = category.ItemListWidget || [];

  return (
    <section
      className="menu-section"
      id={`category-${category.CategryId}`}
    >
      <div className="section-heading">
        <div>
          <span className="section-label">MENU</span>
          <h2>{category.CategryName}</h2>

          {category.Description && (
            <p>{category.Description}</p>
          )}
        </div>

        <span className="item-count">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="menu-list">
        {items.map((item) => (
          <MenuItem
            key={item.ItemId}
            item={item}
            onAdd={onAdd}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            quantity={getQuantity(item)}
          />
        ))}
      </div>
    </section>
  );
}

export default MenuSection;