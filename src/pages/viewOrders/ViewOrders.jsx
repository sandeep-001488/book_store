import React, { useEffect, useState } from "react";
import "./viewOrder.css";
import { useFirebase } from "../../context/Firebase";
import Cards from "../../components/cards/Cards";

function ViewOrders() {
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.getMyOrders().then((orders) => {
        if (orders) {
          setOrders(orders);
        }
      });
    }
  }, [firebase]);


  return (
    <div className="view-orders">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <Cards book={order.book} bookId={order.bookId} />
            <p className="qty">Quantity purchased:  <span className="qty-color">{order.quantity}</span> </p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default ViewOrders;
