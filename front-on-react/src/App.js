import React, {useState} from "react";

import { Routes, Route
} from "react-router-dom";

//pages
import CartPage from "./Pages/CartPage";
import MainPage from './Pages/MainPage';
import CartToOrderPage from './Pages/CartToOrderPage';
import ProductPage from './Pages/ProductPage'

import {CartContext} from './CartContext';
import { Example } from "./Pages/Example";
import ContactsPage from "./Pages/ContactsPage";
import AdminPage from "./Pages/Admin/AdminPage";
import AdminProductsListPage from './Pages/Admin/AdminProductsListPage'
import LogoutAdmin from "./Pages/LogoutAdmin";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";

function App() {
  
  //в данном контексте храним кол-во покупок в корзине и сумму товаров
  const [context, setContext] = useState("");


  return (
    <CartContext.Provider value={[context, setContext]}>
    <Routes>
        <Route exact path="/" element={<MainPage/>} />
        <Route exact path="/shopping-cart" element={<CartPage/>} />
        <Route exact path="/order" element={<CartToOrderPage/>} />
        {
         // <Route path="/catalog/:id" element={<ProductPage/>} />
        }
        <Route path='/catalog/:productid' element={<ProductPage/>} />
        <Route path='/ex/:id/:slug' element={<Example/>} />
        <Route exact path='/contacts' element={<ContactsPage/>} />

        <Route exact path='/admin' element={<AdminPage/>} />

        <Route exact path='/adminlogin' element={<AdminLoginPage/>} />
        <Route exact path='/admin-logout' element={<LogoutAdmin/>} />
        
    </Routes>
    </CartContext.Provider>
  );
}

export default App;
