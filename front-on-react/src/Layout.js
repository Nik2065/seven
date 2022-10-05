import React, {useContext, useEffect} from 'react';
import {Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, 
    Navbar} 
    from 'react-bootstrap';

import { BsCartFill } from "react-icons/bs";

//import {CartContext} from './CartContext'

import { getLocalSessionId, createCartTitle, countItems, countCartSum} from './functions/commonFunctions'
import { getCartBySessionId } from './functions/serverFunctions'

import mainStore from './MainStore';
import CartIconView from './Pages/PageComponents/CartIconView';


export default function Layout ({children}) {

  //const [cartContext, setCartContext] = useContext(CartContext);

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
            
            console.log({cartItems});

            //setProductsInCart(cartItems);
            //setCartSum(coutCartSum(cartItems));

            //теперь храним данные не в контексте а в mobx
            //2022-09-11
            //setCartContext(createCartTitle(countItems(cartItems), countCartSum(cartItems)));
            
            mainStore.setCartItems(cartItems);

        })

    }, []);

    
    return ( 
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Link className="navbar-brand" to="/">ProjectSeven ReactShop</Link>
    
        <Nav className="me-auto">
        <LinkContainer to="/contacts">
          <Nav.Link>Контакты</Nav.Link>
        </LinkContainer>
        </Nav>
    
          <Navbar.Collapse className="justify-content-end">
            {
            //<Link title="Перейти к корзине" className="nav-link" to="/shopping-cart">   <BsCartFill style={{fontSize:"1.9rem", color:"white"}} />   </Link>
            //<span style={{color:"white"}}>{cartContext}</span>
            }
            <CartIconView mainState={mainStore} />

        </Navbar.Collapse>
        </Container>
        </Navbar>
        
        <Container style={{minHeight:"550px"}}>
        {children}
        </Container>

        <Navbar  bg="dark" variant="dark" style={{maxHeight:"7%", height:"40px"}}>
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>

            </Navbar>
        </>
    );

}