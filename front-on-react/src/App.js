import React, { useState, useEffect } from "react";

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
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import AdminProductPage from "./Pages/Admin/AdminProductPage"

import AdminCharListPage from "./Pages/Admin/AdminCharListPage"
import AdminCategoriesListPage from "./Pages/Admin/AdminCategoriesListPage"

import ProjectSettings from "./Pages/Admin/ProjectSettings"

import { CategoryPage } from "./Pages/CategoryPage";



//import { getPublicCategories } from "./functions/serverFunctionsForCategories"
import { getLocalSessionId } from './functions/commonFunctions'
import { getCartBySessionId } from './functions/serverFunctions'
import mainStore from "./MainStore";

import {ProjectMain} from './Pages/ProjectMain';
import PromoPage from "./Pages/PromoPage";
import HelpPage from "./Pages/HelpPage";


function App() {
  
  //в данном контексте храним кол-во покупок в корзине и сумму товаров
  const [context, setContext] = useState("");
  /*const [categoriesList, setCategoriesList] = useState();


  const updateCategories = () =>{
    const getResp = getPublicCategories('d7066528-4027-4ef0-bc2a-cd8fa9a3f199');

        getResp.then(resp1 => {
            console.log({resp1});
            if(resp1.success){
                setCategoriesList(resp1.categories);
            }
          });
    }
  
    //загружаем категории
    useEffect(() => {
      updateCategories();
    }   
   ,[]);*/
   

    //получаем содержимое корзины
    useEffect(()=>{

      const sId = getLocalSessionId();
      //загружаем корзину

      getCartBySessionId(sId)
      .then(result => {
          //console.log({result});
          //initialCart = result.CartItems;
          let cartItems = [];
          if(result.cartItems != null && result.cartItems.length>0){
              result.cartItems.forEach((item, i) => {
              cartItems.push({
                  qty: item.qty,
                  product: item.product
              });
              }
          )
          }
          
          //console.log({cartItems});

          //setProductsInCart(cartItems);
          //setCartSum(coutCartSum(cartItems));

          //теперь храним данные не в контексте а в mobx
          //2022-09-11
          //setCartContext(createCartTitle(countItems(cartItems), countCartSum(cartItems)));
          
          //сохраняем в store
          mainStore.setCartItems(cartItems);

      })

    }, []);







  return (
    <CartContext.Provider value={[context, setContext]}>
    <Routes>

        {/* 1. публичные и маркетинговые страницы */}
        
        
        
        <Route exact path="/" element={<PromoPage/>} />
        <Route exact path="/help" element={<HelpPage/>} />
        <Route exact path='/contacts' element={<ContactsPage/>} />


        {/* 2. пример отображения страниц магазина */}
        <Route exact path="/main" element={<MainPage/>} />
        <Route exact path='/ex' element={<Example/>} />


        <Route exact path="/shopping-cart" element={<CartPage/>} />
        <Route exact path="/order" element={<CartToOrderPage/>} />
        {
         // <Route path="/catalog/:id" element={<ProductPage/>} />
        }
        <Route path='/catalog/:productid' element={<ProductPage/>} />
        
        


        

        <Route exact path='/admin' element={<AdminPage/>} />
        <Route exact path='/adminlogin' element={<AdminLoginPage/>} />
        



        <Route exact path='/admin/project/:pid' element={<ProjectSettings/>} />
        <Route exact path='/admin/addproject' element={<ProjectSettings/>} />

        <Route exact path='/admin/products' element={<AdminProductsListPage/>} />
        <Route exact path='/admin/product/:productid' element={<AdminProductPage/>} />
        <Route exact path='/admin/addproduct' element={<AdminProductPage/>} />

        <Route exact path='/admin/categories' element={<AdminCategoriesListPage/>} />
        <Route exact path='/admin/characteristics/' element={<AdminCharListPage/>} />

        <Route exact path='/category/:catid' element={<CategoryPage />} />

        {
          //имя проекта пока формируем как project+id
        }

        <Route exact path=':projectid/category/:catid' element={<CategoryPage />} />

        <Route exact path=':projectid' element={<ProjectMain />} />
        {
          //Пути для категорий
        }

        {
                    /*(categoriesList !== undefined && categoriesList.length>0) ? 
                    categoriesList.map((ch, i)=>{

                      const path = '/category/' + ch.id;
                      console.log({path});

                    return(
                    <Route key={i} exact path={path} element={<CategoryPage />} />
                    )
                    }) : ""*/
        }

        {
          /*
          (categoriesList !== undefined && categoriesList.length>0) ? 
          categoriesList.forEach((element) => {
            console.log({element});
          }): ""*/
        }

    </Routes>
    </CartContext.Provider>
  );
}

export default App;
