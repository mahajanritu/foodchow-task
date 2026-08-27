function CategoryNav({ categories, activeCategory, onCategoryClick }) {
  return (
    <nav className="category-nav">
      <div className="category-nav-inner">
        {categories.map((category) => (
          <button
            key={category.CategryId}
            className={
              activeCategory === category.CategryId
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => onCategoryClick(category.CategryId)}
          >
            {category.CategryName}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default CategoryNav;