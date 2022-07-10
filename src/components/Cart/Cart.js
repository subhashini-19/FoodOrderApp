import React, { useContext, useState } from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOrderHandler = (event) => {
    event.preventDefault();
    setShowCheckout(true);
  };

  const onConfirm = async (userData) => {
    setSubmittingOrder(true);
    const response = await fetch(
      "https://reactbackend-2d008-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orders: cartCtx.items,
        }),
      }
    );
    setSubmittingOrder(false);
    setSubmittedOrder(true);
    cartCtx.clearCart();
  };

  const showOrder = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={onConfirm} />
      )}
      {!showCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={onOrderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const orderSubmissionMsg = <p>Order submission in progress</p>;
  const orderSubmittedMsg = (
    <React.Fragment>
      <p>
        Order submitted successfully
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </p>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!submittingOrder && !submittedOrder && showOrder}
      {submittingOrder && !submittedOrder && orderSubmissionMsg}
      {!submittingOrder && submittedOrder && orderSubmittedMsg}
    </Modal>
  );
};

export default Cart;
