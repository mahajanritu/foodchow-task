import { useMemo, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (item, selectedSize = null, quantity = 1) => {
    const price = Number(
      selectedSize?.Price ??
        selectedSize?.price ??
        item.Price ??
        item.price ??
        0
    );

    const cartKey = `${item.ItemId}-${selectedSize?.SizeId || "default"}`;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.cartKey === cartKey
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.cartKey === cartKey
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
              }
            : cartItem
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          selectedSize,
          price,
          quantity: quantity,
          cartKey,
        },
      ];
    });
  };

  const increaseQuantity = (cartKey) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (cartKey) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.cartKey !== cartKey)
    );
  };

  const itemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    itemCount,
    subtotal,
  };
}