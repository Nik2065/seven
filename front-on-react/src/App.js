import React from "react";

import { Routes, Route
} from "react-router-dom";
import CartPage from "./CartPage";


import MainContent from './MainContent';



function App() {
  return (
    <Routes>
        <Route exact path="/" element={<MainContent/>} />
        <Route exact path="/shopping-cart" element={<CartPage/>} />
    </Routes>
  );
}

export default App;
