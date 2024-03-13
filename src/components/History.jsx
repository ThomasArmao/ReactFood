import { useState, useEffect } from "react";
import { fetchAvailableOrders } from "../http";

const History = ({ onClose }) => {
  const [availableOrders, setAvailableOrders] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  console.log(availableOrders);
  useEffect(() => {
    async function fetchOrders() {
      setIsFetching(true);
      try {
        const orders = await fetchAvailableOrders();
        setAvailableOrders(orders);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch orders, please try again later!",
        });
        setIsFetching(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <div className="history-controls">
        <h2>History</h2>
        <button className="button" onClick={onClose} type="button">
          Close
        </button>
      </div>
      <ul>
        {availableOrders.map((order) => (
          <div key={order.id} className="order-item">
            <p>Order number: {order.id}</p>
            <p>Name: {order.customer.name}</p>
            <p>Email: {order.customer.email}</p>
            <p>Postal Code: {order.customer["postal-code"]}</p>
            <p>Street: {order.customer.street}</p>
            <p>City: {order.customer.city}</p>
            <hr />
            {order.items.map((item) => (
              <div key={item.id}>
                <p>Product ordered</p>
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))}
      </ul>
    </>
  );
};

export default History;
