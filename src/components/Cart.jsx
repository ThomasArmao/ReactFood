import { CartContext } from "../store/cart-context";
import { useContext } from "react";

export default function Cart({ formattedTotalPrice }) {
  const { items, updateItemQuantity } = useContext(CartContext);

  return (
    <div>
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id} className="cart-item">
                <div className="single-item">
                  <p>{item.name}</p>
                  <p> ($ {item.price})</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p className="cart-total">
        <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
