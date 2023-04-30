import { useState } from 'react';

import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = (value) =>  value.trim().length !== 5;

const Checkout = (props) => {
  const [isSubmit,setIsSubmit] = useState(false);

  const {
    changeHandler:nameChangeHandler,
    blurHandler:nameBlurHandler,
    reset:nameReset,
    value:nameValue,
    isInvalid:nameIsInvalid,
    hasError:nameHasError,
  } = useInput(isSubmit,isEmpty);


  const {
    changeHandler:streetChangeHandler,
    blurHandler:streetBlurHandler,
    reset:streetReset,
    value:streetValue,
    isInvalid:streetIsInvalid,
    hasError:streetHasError,
  } = useInput(isSubmit,isEmpty);

  const {
    changeHandler:postalCodeChangeHandler,
    blurHandler:postalCodeBlurHandler,
    reset:postalCodeReset,
    value:postalCodeValue,
    isInvalid:postalCodeIsInvalid,
    hasError:postalCodeHasError,
  } = useInput(isSubmit,isNotFiveChars);


  const {
    changeHandler:cityChangeHandler,
    blurHandler:cityBlurHandler,
    reset:cityReset,
    value:cityValue,
    isInvalid:cityIsInvalid,
    hasError:cityHasError,
  } = useInput(isSubmit,isEmpty);


  const resetForm = () => {
    cityReset();
    nameReset();
    postalCodeReset();
    streetReset();
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    setIsSubmit(true);

    if(cityIsInvalid || nameIsInvalid || postalCodeIsInvalid || streetIsInvalid) {
      return;
    }

    props.onSubmit({
      name:nameValue,
      city:cityValue,
      street:streetValue,
      postalCode:postalCodeValue
    })

    resetForm();

  };

  const nameControlClasses = nameHasError ? `${classes.control} ${classes.invalid}` : classes.control;
  const streetControlClasses = streetHasError ? `${classes.control} ${classes.invalid}` : classes.control;
  const postalCodeControlClasses = postalCodeHasError ? `${classes.control} ${classes.invalid}` : classes.control;
  const cityControlClasses = cityHasError ? `${classes.control} ${classes.invalid}` : classes.control;
 
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={nameValue} onChange={nameChangeHandler}  onBlur={nameBlurHandler} />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={streetValue} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' value={postalCodeValue}  onChange={postalCodeChangeHandler} onBlur={postalCodeBlurHandler} />
        {postalCodeHasError && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={cityValue}  onChange={cityChangeHandler} onBlur={cityBlurHandler} />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;