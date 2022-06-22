import React from 'react';
import { Button } from 'react-bootstrap';
//import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  //increment,
  //incrementAsync,
  //selectCount,
} from './cartSlice';
//import styles from './Counter.module.css';
import  PropTypes  from 'prop-types';


export function AddToCartButton(product) {
  //const count = useSelector(selectCount);
  const dispatch = useDispatch();
  //const [incrementAmount] = useState('2');

  //const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <Button onClick={() => dispatch(addToCart(product))} >Add to cart</Button>
    </div>
  );
}


AddToCartButton.propTypes = {
  product: PropTypes.object.isRequired,

}