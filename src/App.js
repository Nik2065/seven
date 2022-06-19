import React from "react";

import { Routes, Route
} from "react-router-dom";

import LoginPage from './_Components/LoginPage';
import PricingPage from './_Components/PricingPage';
import FeaturesPage from './_Components/FeaturesPage';
import MainContent from './_Components/MainContent';
import ShoppingCartPage from './_Components/ShoppingCartPage';



function App() {
  return (
    <Routes>
        <Route exact path="/" element={<MainContent/>} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route exact path="/features" element={<FeaturesPage/>} />
        <Route exact path="/pricing" element={<PricingPage/>} />
        <Route exact path="/shopping-cart" element={<ShoppingCartPage/>} />
    </Routes>
  );
}

export default App;