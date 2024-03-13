import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  resetCart: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updateItems = [...state.items];

    const existingCartItemIndex = updateItems.findIndex(
      (CartItem) => CartItem.id === action.payload.id
    );

    const existingCartItem = updateItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updateItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = action.payload;

      updateItems.push({
        id: action.payload.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updateItems,
    };
  } else if (action.type === "UPDATE_ITEM") {
    const updateItems = [...state.items];

    const updateItemIndex = updateItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    if (updateItemIndex !== -1) {
      const updateItem = {
        ...updateItems[updateItemIndex],
      };

      updateItem.quantity += action.payload.amount;

      if (updateItem.quantity <= 0) {
        updateItems.splice(updateItemIndex, 1);
      } else {
        updateItems[updateItemIndex] = updateItem;
      }
    }

    return {
      items: updateItems,
    };
  } else if (action.type === "RESET") {
    return {
      items: [],
    };
  }
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );
  function resetCart() {
    shoppingCartDispatch({ type: "RESET" });
  }
  function handleAddItemToCart(obj) {
    shoppingCartDispatch({ type: "ADD_ITEM", payload: obj });
  }

  function handleUpdateItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateItemQuantity,
    resetCart: resetCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
