import { useContext, useRef, useState } from "react";
import { CartContext } from "../store/cart-context";
import logo from "../assets/logo.jpg";
import CartModal from "./CartModal";

const Header = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isModalHistoryOpen, setIsModalHistoryOpen] = useState(false);
  const { items } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  function handleCheckoutClick() {
    setIsCheckout(!isCheckout);
  }

  function handleModalHistoryClick(closeModal) {
    setIsModalHistoryOpen(!isModalHistoryOpen);
    if (isModalHistoryOpen === false) {
      handleOpenCartClick()
    }
  }

  let modalActions = <button className="text-button">Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className="text-button">Close</button>
        <button className="button" onClick={handleCheckoutClick}>Go to Checkout</button>
      </>
    );
  }
 

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
        checkout={isCheckout}
        onCheckoutClick={handleCheckoutClick}
        historyClick={isModalHistoryOpen}
        onHistoryClick={handleModalHistoryClick}
      />
      <div id="main-header">
        <div id="title">
          <img src={logo} alt="Logo" />
          <h1>REACTFOOD</h1>
        </div>
        <div>
          <button className="history" onClick={handleModalHistoryClick}>
            Order History
          </button>
          <button onClick={handleOpenCartClick}>Cart({cartQuantity})</button>
        </div>
      </div>
    </>
  );
};

export default Header;
