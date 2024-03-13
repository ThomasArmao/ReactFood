import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context";
import Cart from "./Cart";
import CartForm from "./CartForm";
import History from "./History";

const CartModal = forwardRef(function Modal(
  { title, actions, checkout, onCheckoutClick, historyClick, onHistoryClick },
  ref
) {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { items, resetCart } = useContext(CartContext);
  const dialog = useRef();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function isSuccess(valueMessage) {
    if (valueMessage === "Order created!") {
      setIsOrderConfirmed(true);
      setTimeout(() => {
        dialog.current.close();
        setIsOrderConfirmed(false);
        onCheckoutClick();
        resetCart();
      }, 3000);
    }
  }

  return createPortal(
    <dialog id="modal" className="modal" ref={dialog}>
      {historyClick && (
        <History onClose={() => onHistoryClick(dialog.current.close())} />
      )}
      {!checkout && !historyClick && (
        <>
          <h2>{title}</h2>
          <Cart formattedTotalPrice={formattedTotalPrice} />
          <form method="dialog" className="modal-actions">
            {actions}
          </form>
        </>
      )}
      {checkout && (
        <>
          <h2>Checkout</h2>
          <p>Total Amount: {formattedTotalPrice}</p>
          <CartForm onCheckoutClick={onCheckoutClick} isSuccess={isSuccess} />
        </>
      )}
      {checkout && isOrderConfirmed && (
        <div className="order-success">
          <p>Order Created!</p>
        </div>
      )}
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
