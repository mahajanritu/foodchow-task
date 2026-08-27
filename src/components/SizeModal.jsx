import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

function SizeModal({ item, onClose, onConfirm }) {
  const sizes = item?.SizeListWidget || [];

  const [selectedSize, setSelectedSize] = useState(
    sizes.length > 0 ? sizes[0] : null
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      setSelectedSize(
        item.SizeListWidget?.length > 0
          ? item.SizeListWidget[0]
          : null
      );
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  const price = Number(
    selectedSize?.Price ?? selectedSize?.price ?? item.Price ?? 0
  );

  const increase = () => setQuantity((q) => q + 1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleConfirm = () => {
    onConfirm(item, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="size-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <div>
            <span className="section-label">CUSTOMIZE</span>
            <h2 id="size-modal-title">{item.ItemName}</h2>

            {item.Description && <p>{item.Description}</p>}
          </div>

          <div className="modal-food-image">
            {item.ItemImage ? (
              <img src={item.ItemImage} alt={item.ItemName} />
            ) : (
              <span>🍜</span>
            )}
          </div>
        </div>

        <div className="size-options">
          <h3>Choose your size</h3>

          {sizes.map((size) => {
            const sizePrice = Number(size.Price || size.price || 0);

            const isSelected =
              selectedSize?.SizeId === size.SizeId;

            return (
              <button
                key={size.SizeId}
                className={`size-option ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                <span className="radio-circle">
                  {isSelected && <span />}
                </span>

                <span className="size-name">
                  {size.SizeName || "Regular"}
                </span>

                <strong>${sizePrice.toFixed(2)}</strong>
              </button>
            );
          })}
        </div>

        <div className="modal-footer">
          <div className="quantity-control large">
            <button onClick={decrease} aria-label="Decrease quantity">
              <Minus size={18} />
            </button>

            <span>{quantity}</span>

            <button onClick={increase} aria-label="Increase quantity">
              <Plus size={18} />
            </button>
          </div>

          <button className="confirm-add-btn" onClick={handleConfirm}>
            Add to cart · ${(price * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SizeModal;