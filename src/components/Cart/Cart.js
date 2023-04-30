import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
  const [isCheckout,setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const {isLoading:isSubmitting,httpError:orderSubmitError,sendRequest:placeOrder} = useHttp();

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount:1
    });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
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

  const orderHandler  = () => {
    setIsCheckout(true);
  }

  const submitOrderHandler  = (userDetail) => {
    placeOrder({
      url: `https://udemy-couse.firebaseio.com/orders.json`,
      method:'POST',
      body: {
        user:userDetail,
        orderItems: cartCtx.items,
        totalAmount:cartCtx.totalAmount
      } 
    }).then(()=> {
      cartCtx.clearCart();
      setDidSubmit(true);
    });

  }
  


  //cart actions buttons
  const modalActions = (
  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
  </div>);

  //default: cart items and when we click on order button show checkout form
  let cartModalContent = (<> 
     {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && hasItems && <Checkout onSubmit={submitOrderHandler} onCancel= {props.onClose} />}
      {!isCheckout && modalActions}
  </>)

  //when http request is send for order placement
  if(isSubmitting) {
    cartModalContent = (<p>Sending order data...</p>);
  }

  //show success message on successfully order placed
  if(didSubmit) {
    cartModalContent = (<>
      <p>Successfully sent the order!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>)
  }

  //show error message if http request is failed
  if(orderSubmitError) {
    console.log(orderSubmitError)
    cartModalContent = (<>
      <p>Failed: Order placement is failed due to  {orderSubmitError} </p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>);
  }


  return (
    <Modal onClose={props.onClose}>
      {cartModalContent}
    </Modal>
  );
};

export default Cart;
