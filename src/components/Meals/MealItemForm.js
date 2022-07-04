import classes from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {

  const [amountIsValid, setAmountIsValid] = useState(true);

  const inputRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredValue = inputRef.current.value;
    const enteredValueAmt = +enteredValue;
    if (enteredValue.trim().length === 0 || enteredValue < 1 || enteredValue > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredValueAmt);



  }


  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "Amount" + `${props.id}`,
          type: "Number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
};

export default MealItemForm;
