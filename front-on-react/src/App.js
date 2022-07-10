import React, {useState} from "react";

import { Routes, Route
} from "react-router-dom";
import CartPage from "./CartPage";


import MainContent from './MainContent';
import CartToOrderPage from './CartToOrderPage';

import {CartContext} from './CartContext';

function App() {
  
  //в данном контексте храним кол-во покупок в корзине и сумму товаров
  const [context, setContext] = useState("2|567 руб.");


  return (
    <CartContext.Provider value={[context, setContext]}>
    <Routes>
        <Route exact path="/" element={<MainContent/>} />
        <Route exact path="/shopping-cart" element={<CartPage/>} />
        <Route exact path="/order" element={<CartToOrderPage/>} />
    </Routes>
    </CartContext.Provider>
  );
}

export default App;
