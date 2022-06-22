import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCart,
} from './cartSlice';


export function CartContent() {
  const cartProducts = useSelector(selectCart);
  const someProducts = [1,2,3];

  return (
    <div>
      
      {console.log(cartProducts.cart)}

      {
        someProducts.map((item) => {
        return <div key={item}>dfasds</div>
      })
      }
      {
      cartProducts.cart.map((item, i) => {
        return <div key={i}>{item.product.name}</div>
      })
      }
    </div>
  );
}


