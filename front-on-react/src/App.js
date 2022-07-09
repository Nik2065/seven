import React from "react";

import { Routes, Route
} from "react-router-dom";
import CartPage from "./CartPage";


import MainContent from './MainContent';
import CartToOrderPage from './CartToOrderPage';


function App() {
  return (
    <Routes>
        <Route exact path="/" element={<MainContent/>} />
        <Route exact path="/shopping-cart" element={<CartPage/>} />
        <Route exact path="/order" element={<CartToOrderPage/>} />
    </Routes>
  );
}

export default App;
