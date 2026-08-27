import { useState } from "react";
import {
  Search,
  ShoppingBag,
  X,
  User,
} from "lucide-react";

import { useMenuData } from "./hooks/useMenuData";
import { useCart } from "./hooks/useCart";




import CategoryNav from "./components/CategoryNav";
import MenuSection from "./components/MenuSection";
import Cart from "./components/Cart";
import SizeModal from "./components/SizeModal";
import CheckoutPage from "./components/CheckoutPage";
import AuthModal from "./components/AuthModal";

import "./App.css";

function App() {
  const { data, loading, error, retry } = useMenuData();
  const [authOpen, setAuthOpen] = useState(false);

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    itemCount,
    subtotal,
  } = useCart();

  const [activeCategory, setActiveCategory] =
    useState(null);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [mobileCartOpen, setMobileCartOpen] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState("menu");

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loader"></div>
        <p>Preparing something delicious...</p>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="error-page">
        <h2>Unable to load the menu</h2>

        <p>{error}</p>

        <button onClick={retry}>
          Try Again
        </button>
      </div>
    );
  }

  const categories =
    data?.CategoryList || [];

  /* =========================
     FILTER SEARCH
  ========================= */

  const filteredCategories = categories
    .map((category) => ({
      ...category,

      ItemListWidget:
        (
          category.ItemListWidget || []
        ).filter((item) => {
          const query =
            searchTerm.toLowerCase();

          return (
            item.ItemName
              ?.toLowerCase()
              .includes(query) ||

            item.Description
              ?.toLowerCase()
              .includes(query) ||

            category.CategryName
              ?.toLowerCase()
              .includes(query)
          );
        }),
    }))
    .filter(
      (category) =>
        category.ItemListWidget.length > 0
    );

  /* =========================
     CATEGORY CLICK
  ========================= */

  const handleCategoryClick = (
    categoryId
  ) => {
    setActiveCategory(categoryId);

    const element =
      document.getElementById(
        `category-${categoryId}`
      );

    if (element) {
      const offset = 130;

      const position =
        element.getBoundingClientRect()
          .top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  /* =========================
     ADD TO CART
  ========================= */

  const handleAdd = (item) => {
    const hasSizes =
      Number(item.IsSizeAvailable) === 1 &&
      Array.isArray(
        item.SizeListWidget
      ) &&
      item.SizeListWidget.length > 0;

    if (hasSizes) {
      setSelectedItem(item);
    } else {
      addToCart(item);
    }
  };

  /* =========================
     GET QUANTITY
  ========================= */

  const getQuantity = (item) => {
    return cart
      .filter(
        (cartItem) =>
          String(
            cartItem.ItemId
          ) === String(item.ItemId)
      )
      .reduce(
        (total, cartItem) =>
          total + cartItem.quantity,
        0
      );
  };

  /* =========================
     INCREASE ITEM
  ========================= */

  const handleIncreaseItem = (
    item
  ) => {
    const cartItem = cart.find(
      (entry) =>
        String(
          entry.ItemId
        ) === String(item.ItemId) &&
        !entry.selectedSize
    );

    if (cartItem) {
      increaseQuantity(
        cartItem.cartKey
      );
    } else {
      handleAdd(item);
    }
  };

  /* =========================
     DECREASE ITEM
  ========================= */

  const handleDecreaseItem = (
    item
  ) => {
    const cartItem = cart.find(
      (entry) =>
        String(
          entry.ItemId
        ) === String(item.ItemId) &&
        !entry.selectedSize
    );

    if (cartItem) {
      decreaseQuantity(
        cartItem.cartKey
      );
    }
  };

  /* =========================
     SIZE CONFIRM
  ========================= */

  const handleSizeConfirm = (
    item,
    selectedSize,
    quantity
  ) => {
    addToCart(
      item,
      selectedSize,
      quantity
    );

    setSelectedItem(null);
  };

  /* =========================
     CHECKOUT
  ========================= */

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setMobileCartOpen(false);

    setCurrentPage("checkout");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     CHECKOUT PAGE
  ========================= */

  if (currentPage === "checkout") {
  return (
    <CheckoutPage
      cart={cart}
      itemCount={itemCount}
      subtotal={subtotal}
      onBack={() => setCurrentPage("menu")}
      onPlaceOrder={() => {
        alert(
          `Order placed successfully!

Items: ${itemCount}
Total: $${subtotal.toFixed(2)}

Thank you for choosing FoodChow!`
        );
      }}
    />
  );
}

  /* =========================
     MENU PAGE
  ========================= */

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">
        <div className="header-inner">

          {/* LOGO */}

          <a
            href="#"
            className="brand"
          >
            <div className="brand-mark">
              FC
            </div>

            <div>
              <strong>
                FoodChow
              </strong>

              <span>
                Freshly made. Just for you.
              </span>
            </div>
          </a>

          {/* SEARCH */}

          <div className="search-box">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search your favorite dish..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

            {searchTerm && (
              <button
                className="clear-search"
                onClick={() =>
                  setSearchTerm("")
                }
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* HEADER ACTIONS */}

          <div className="header-actions">

            {/* CART */}

            <button
              className="header-cart-btn"
              onClick={() => {
                if (window.innerWidth <= 900) {
                  setMobileCartOpen(true);
                } else {
                  document
                    .querySelector(
                      ".desktop-cart"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }
              }}
            >
              <ShoppingBag size={20} />

              <span>
                Cart
              </span>

              {itemCount > 0 && (
                <b>
                  {itemCount}
                </b>
              )}
            </button>

            {/* USER */}

            <button
              className="user-icon-btn"
              aria-label="User account"
              onClick={() => setAuthOpen(true)}
            >
              <User size={21} />
            </button>

          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="restaurant-hero">

        <div className="hero-content">

          <span className="hero-eyebrow">
            WELCOME TO
          </span>

          <h1 className="animated-hero-title">
            Delicious food,
            <br />
            made with care.
          </h1>

          <p className="animated-hero-text">
            Explore our freshly prepared menu
            and order your favorites in just a
            few clicks.
          </p>

          <div className="hero-meta">
            <span>
              ★ 4.8 Rating
            </span>

            <span>
              Fresh ingredients
            </span>

            <span>
              Fast ordering
            </span>
          </div>
        </div>

        <div className="hero-decoration">
          <span>
            🍜
          </span>
        </div>

      </section>

      {/* CATEGORY NAV */}

      {!searchTerm && (
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={
            handleCategoryClick
          }
        />
      )}

      {/* MAIN */}

      <main className="main-layout">

        {/* MENU */}

        <div className="menu-content">

          {searchTerm && (
            <div className="search-results-heading">

              <span>
                SEARCH RESULTS
              </span>

              <h2>
                Results for "
                {searchTerm}
                "
              </h2>

            </div>
          )}

          {filteredCategories.length >
          0 ? (

            filteredCategories.map(
              (category) => (
                <MenuSection
                  key={
                    category.CategryId
                  }
                  category={category}
                  onAdd={handleAdd}
                  getQuantity={
                    getQuantity
                  }
                  onIncrease={
                    handleIncreaseItem
                  }
                  onDecrease={
                    handleDecreaseItem
                  }
                />
              )
            )

          ) : (

            <div className="no-results">

              <Search size={38} />

              <h2>
                No dishes found
              </h2>

              <p>
                Try searching for
                something else.
              </p>

            </div>

          )}

        </div>

        {/* DESKTOP CART */}

        <div className="desktop-cart">

          <Cart
            cart={cart}
            itemCount={itemCount}
            subtotal={subtotal}
            onIncrease={
              increaseQuantity
            }
            onDecrease={
              decreaseQuantity
            }
            onRemove={
              removeFromCart
            }
            onCheckout={
              handleCheckout
            }
          />

        </div>

      </main>

      {/* MOBILE CART */}

      {itemCount > 0 && (
        <button
          className="mobile-cart-bar"
          onClick={() =>
            setMobileCartOpen(true)
          }
        >
          <ShoppingBag size={19} />

          <span>
            {itemCount} items
          </span>

          <strong>
            ${subtotal.toFixed(2)}
          </strong>

          <span>
            View Cart →
          </span>
        </button>
      )}

      {/* MOBILE CART DRAWER */}

      {mobileCartOpen && (

        <div
          className="mobile-cart-overlay"
          onClick={() =>
            setMobileCartOpen(false)
          }
        >

          <div
            className="mobile-cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="drawer-close"
              onClick={() =>
                setMobileCartOpen(false)
              }
            >
              <X size={21} />
            </button>

            <Cart
              cart={cart}
              itemCount={itemCount}
              subtotal={subtotal}
              onIncrease={
                increaseQuantity
              }
              onDecrease={
                decreaseQuantity
              }
              onRemove={
                removeFromCart
              }
              onCheckout={
                handleCheckout
              }
            />

          </div>

        </div>

      )}

      {/* SIZE MODAL */}

      {selectedItem && (

        <SizeModal
          item={selectedItem}
          onClose={() =>
            setSelectedItem(null)
          }
          onConfirm={
            handleSizeConfirm
          }
        />

      )}

        

      {/* LOGIN / SIGNUP MODAL */}
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
        />
      )}

    </div>
  );
}
export default App;