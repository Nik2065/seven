import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';


export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      

      <Button onClick={() => dispatch(decrement())} >Decrement value</Button>
      <Button onClick={() => dispatch(increment())} >Increment value</Button>
      <Button onClick={() => dispatch(incrementAsync(incrementValue))} > Add Async</Button>
      <Button onClick={() => dispatch(increment())} >Increment value</Button>

      <div className={styles.row}>
        <span>{count}</span>
      </div>

    </div>
  );
}
