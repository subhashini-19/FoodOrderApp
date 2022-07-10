import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};
const inValidatePostalCode = (value) => {
  return value.trim().length !== 6;
};

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    post: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const nameValue = nameRef.current.value;
    const streetValue = streetRef.current.value;
    const postalCodeValue = postalCodeRef.current.value;
    const cityValue = cityRef.current.value;

    const validName = !isEmpty(nameValue);
    const validStreet = !isEmpty(streetValue);
    const validPostalCode =
      !isEmpty(postalCodeValue) && !inValidatePostalCode(postalCodeValue);
    const validCity = !isEmpty(cityValue);

    const isValidForm =
      validName && validStreet && validPostalCode && validCity;

    setFormInputValidity({
      name: validName,
      street: validStreet,
      city: validCity,
      post: validPostalCode,
    });

    if(isValidForm){
        props.onConfirm({
            name : nameValue ,
            city : cityValue ,
            street : streetValue ,
            postalCode : postalCodeValue
        })
    }
  };
  const onCancelHandler = (event) => {
    event.preventDefault();
    props.onCancel();
  };

  

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name"> Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          
        />
        {!formInputValidity.name && (
          <p className={classes.error}>Please enter name.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          ref={streetRef}
         
        />
        {!formInputValidity.street && (
          <p className={classes.error}>Please enter street.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.post ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Postal Code</label>
        <input
          type="text"
          id="postalcode"
          ref={postalCodeRef}
          
        />
        {!formInputValidity.post && (
          <p className={classes.error}>Please enter a postalCode.</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">City</label>
        <input
          type="text"
          id="city"
          ref={cityRef}
          
        />
        {!formInputValidity.city && (
          <p className={classes.submit}>Please enter a city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button onClick={onCancelHandler}>cancel</button>
        <button className={classes.submit} >Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
