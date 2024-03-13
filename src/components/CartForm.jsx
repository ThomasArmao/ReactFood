import InputForm from "./InputForm";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../store/cart-context";
import { updateUserOrder } from "../http";

const CartForm = ({ onCheckoutClick, isSuccess }) => {
  const { items } = useContext(CartContext);

  const [userOrders, setUserOrders] = useState({
    items: items,
    customer: {
      name: "",
      email: "",
      street: "",
      city: "",
      ["postal-code"]: "",
    },
  });

  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  async function fetchUserOrder() {
    setIsFetching(true);

    try {
      const orders = await updateUserOrder(userOrders);
      setUserOrders(orders);
      setIsFetching(false);
    } catch (error) {
      setError({
        message: error.message || "Error Order!",
      });
      setIsFetching(false);
    }
  }
  useEffect(() => {
    isSuccess(userOrders.message);
  }, [isFetching]);

  function handleSubmit(event) {
    event.preventDefault();
    fetchUserOrder();
    setUserOrders({
      items: [],
      customer: { name: "", email: "", street: "", city: "", postalCode: "" },
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserOrders((prevOrder) => ({
      ...prevOrder,
      customer: {
        ...prevOrder.customer,
        [name]: value,
      },
    }));
  }

  return (
    <form method="dialog" onSubmit={handleSubmit}>
      <div className="control">
        <InputForm
          label="Full Name"
          type="text"
          placeholder="Name Surname"
          name="name"
          onChange={handleInputChange}
        />
        <InputForm
          label="E-mail Address"
          type="email"
          placeholder="yourname@example.com"
          name="email"
          onChange={handleInputChange}
        />
        <InputForm
          label="Street"
          type="text"
          placeholder="Food Street 00"
          name="street"
          onChange={handleInputChange}
        />
      </div>
      <div className="control-row">
        <InputForm
          label="Postal Code"
          type="text"
          placeholder="00123"
          name="postal-code"
          onChange={handleInputChange}
        />
        <InputForm
          label="City"
          type="text"
          placeholder="Foodland"
          name="city"
          onChange={handleInputChange}
        />
      </div>
      <div className="modal-actions">
        <button className="text-button" onClick={onCheckoutClick}>
          Back
        </button>
        <button className="button" type="submit">
          Submit Order
        </button>
      </div>
    </form>
  );
};

export default CartForm;
