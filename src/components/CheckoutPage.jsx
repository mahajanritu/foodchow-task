import {
  ArrowLeft,
  Check,
  ShoppingBag,
  MapPin,
  Phone,
  CreditCard,
  ChevronRight,
} from "lucide-react";

function CheckoutPage({
  cart,
  itemCount,
  subtotal,
  onBack,
  onPlaceOrder,
}) {
  return (
    <div className="checkout-page">
      {/* HEADER */}
      <header className="checkout-page-header">
        <div className="checkout-header-inner">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={19} />
            <span>Back to Menu</span>
          </button>

          <div className="checkout-brand">
            <div className="checkout-brand-mark">FC</div>

            <div>
              <strong>FoodChow</strong>
              <span>Secure Checkout</span>
            </div>
          </div>

          <div className="secure-checkout">
            <Check size={15} />
            Secure checkout
          </div>
        </div>
      </header>

      <main className="checkout-page-content">
        {/* LEFT */}
        <section className="checkout-main">
          <div className="checkout-heading">
            <span className="checkout-eyebrow">CHECKOUT</span>

            <h1>Almost there! 🎉</h1>

            <p>
              Review your order and add your details to complete your purchase.
            </p>
          </div>

          {/* STEPS */}
          <div className="checkout-steps">
            <div className="checkout-step active">
              <span>1</span>
              <div>
                <strong>Review</strong>
                <small>Check your order</small>
              </div>
            </div>

            <div className="checkout-step-line"></div>

            <div className="checkout-step">
              <span>2</span>
              <div>
                <strong>Complete</strong>
                <small>Order confirmation</small>
              </div>
            </div>
          </div>

          {/* ORDER CARD */}
          <div className="checkout-card">
            <div className="checkout-card-header">
              <div>
                <span className="card-label">YOUR ORDER</span>

                <h2>
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </h2>
              </div>

              <div className="checkout-icon-box">
                <ShoppingBag size={21} />
              </div>
            </div>

            <div className="checkout-items">
              {cart.map((item) => {
                const price = Number(
                  item.price || item.ItemPrice || 0
                );

                const total = price * item.quantity;

                return (
                  <div
                    className="checkout-item"
                    key={item.cartKey}
                  >
                    <div className="checkout-food-icon">
                      🍽️
                    </div>

                    <div className="checkout-item-info">
                      <h3>{item.ItemName}</h3>

                      {item.selectedSize && (
                        <p>
                          {item.selectedSize.SizeName ||
                            item.selectedSize.name}
                        </p>
                      )}

                      <span>
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <strong className="checkout-item-price">
                      ${total.toFixed(2)}
                    </strong>
                  </div>
                );
              })}
            </div>

            <button className="add-more-btn" onClick={onBack}>
              Add more items
              <ChevronRight size={17} />
            </button>
          </div>

          {/* CUSTOMER DETAILS */}
          <div className="details-card">
            <div className="details-header">
              <div>
                <span className="card-label">
                  CUSTOMER DETAILS
                </span>

                <h2>Where should we deliver?</h2>
              </div>
            </div>

            <div className="details-grid">
              <div className="input-group full">
                <label>
                  <MapPin size={16} />
                  Delivery address
                </label>

                <input
                  type="text"
                  placeholder="Enter your delivery address"
                />
              </div>

              <div className="input-group">
                <label>
                  <Phone size={16} />
                  Phone number
                </label>

                <input
                  type="text"
                  placeholder="Your phone number"
                />
              </div>

              <div className="input-group">
                <label>
                  <CreditCard size={16} />
                  Payment method
                </label>

                <select>
                  <option>Pay on delivery</option>
                  <option>Credit / Debit Card</option>
                  <option>UPI Payment</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SUMMARY */}
        <aside className="checkout-summary-card">
          <div className="summary-header">
            <span className="checkout-eyebrow">
              ORDER SUMMARY
            </span>

            <h2>Your total</h2>
          </div>

          <div className="summary-items">
            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery fee</span>

              <strong className="delivery-free">
                Calculated later
              </strong>
            </div>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <div>
              <span>Total</span>
              <small>Taxes calculated at checkout</small>
            </div>

            <strong>
              ${subtotal.toFixed(2)}
            </strong>
          </div>

          <button
            className="place-order-btn"
            onClick={onPlaceOrder}
          >
            <Check size={20} />

            <span>Place Order</span>

            <strong>
              ${subtotal.toFixed(2)}
            </strong>
          </button>

          <div className="secure-order-box">
            <div>🔒</div>

            <p>
              <strong>Secure ordering</strong>
              <span>
                Your information is safely protected.
              </span>
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default CheckoutPage;