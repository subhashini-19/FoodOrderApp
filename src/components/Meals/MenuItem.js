import classes from "./MenuItem.module.css";
import MealItemForm from './MealItemForm';
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const MenuItem = (props) => {
  //const price = `$${props.price.toFixed(2)}`;
  const cartContext = useContext(CartContext);

  const onAddCartHandler = (amount) => {

    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });



  }

  return (
    <li>
      <div className={classes.meal}>
        <div>
          <h3>{props.item.name}</h3>
          <div className={classes.description}>{props.item.description}</div>
          <div className={classes.price}>{props.price}</div>
        </div>
        <div>
          <MealItemForm id={props.item.id} onAddToCart={onAddCartHandler}></MealItemForm>
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
