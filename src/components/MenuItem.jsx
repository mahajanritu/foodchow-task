import { Minus, Plus } from "lucide-react";
import { useState } from "react";

function MenuItem({
  item,
  onAdd,
  quantity,
  onIncrease,
  onDecrease,
}) {
  const [imageError, setImageError] = useState(false);

  const imageUrl =
    item.ItemImage ||
    item.Image ||
    item.ImageUrl ||
    item.ImagePath ||
    "";

  const price =
    item.Price ??
    item.price ??
    item.StartingPrice ??
    0;

  const displayPrice =
    Number(item.IsSizeAvailable) === 1
      ? `From $${Number(price).toFixed(2)}`
      : `$${Number(price).toFixed(2)}`;

  return (
    <article className="menu-item">
      <div className="menu-item-content">
        <div className="item-top">
          <span className="item-type">◉</span>

          <h3>{item.ItemName}</h3>
        </div>

        {item.Description && (
          <p className="item-description">
            {item.Description}
          </p>
        )}

        <div className="item-bottom">
          <strong className="item-price">
            {displayPrice}
          </strong>

          {quantity > 0 ? (
            <div className="quantity-control">
              <button
                onClick={() => onDecrease(item)}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => onIncrease(item)}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>
          ) : (
            <button
              className="add-btn"
              onClick={() => onAdd(item)}
            >
              ADD <Plus size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="item-image">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={item.ItemName}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-placeholder">
            🍜
          </div>
        )}
      </div>
    </article>
  );
}

export default MenuItem;