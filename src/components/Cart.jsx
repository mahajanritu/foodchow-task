import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";

function Cart({
  cart,
  itemCount,
  subtotal,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  return (
    <aside className="cart-card">
      {/* Cart Header */}
      <div className="cart-header">
        <div>
          <span className="cart-label">YOUR ORDER</span>
          <h2>Your Cart</h2>
        </div>

        <div className="cart-count-icon">
          <ShoppingBag size={21} />
          {itemCount > 0 && <span>{itemCount}</span>}
        </div>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingBag size={32} />
          </div>

          <h3>Your cart is empty</h3>
          <p>Add something delicious from the menu.</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.cartKey}>
                <div className="cart-item-top">
                  <div className="cart-item-info">
                    <h3>{item.ItemName}</h3>

                    {item.selectedSize && (
                      <p className="selected-size">
                        {item.selectedSize.SizeName}
                      </p>
                    )}

                    <span className="cart-unit-price">
                      ${(Number(item.price) || 0).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => onRemove(item.cartKey)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="cart-item-bottom">
                  <div className="quantity-control">
                    <button
                      onClick={() => onDecrease(item.cartKey)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={17} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => onIncrease(item.cartKey)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={17} />
                    </button>
                  </div>

                  <strong className="item-total">
                    $
                    {(
                      (Number(item.price) || 0) *
                      item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <p>Taxes and delivery charges calculated at checkout.</p>

            <button
              className="checkout-btn"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default Cart;