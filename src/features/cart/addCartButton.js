import React from 'react';
import { Button } from 'react-bootstrap';
//import React, { useState } from 'react';
import {
  //addToCart,
  //increment,
  //incrementAsync,
  //selectCount,
} from './cartSlice';

//import styles from './Counter.module.css';
import  PropTypes  from 'prop-types';


//export function AddToCartButton(product) {
  export function AddToCartButton() {
  //const dispatch = useDispatch();

  return (
    <div>
      {
        //<Button onClick={() => dispatch(addToCart(product))} >Add to cart</Button>
        <Button/>
      }
    </div>
  );
}


AddToCartButton.propTypes = {
  product: PropTypes.object.isRequired,

}