import React, {useContext, useEffect} from 'react';
import {Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, 
    Navbar} 
    from 'react-bootstrap';

import { BsCartFill } from "react-icons/bs";

import {CartContext} from './CartContext'
import { getLocalSessionId, createCartTitle, countItems, coutCartSum} from './functions/commonFunctions'
import { getCartBySessionId } from './functions/serverFunctions'

export default function AdminLayout ({children}) {

  const [cartContext, setCartContext] = useContext(CartContext);

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
            setCartContext(createCartTitle(countItems(cartItems), coutCartSum(cartItems)));
        })

    }, []);

    return ( 
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Link className="navbar-brand" to="/">ProjectSeven ReactShop</Link>
    
        <Nav className="me-auto">
        <LinkContainer to="/contacts">
          <Nav.Link>Инструкция по добавлению товаров</Nav.Link>
        </LinkContainer>
        </Nav>
    
        <LinkContainer to="/logout-admin">
          <Nav.Link>{'exit >'}</Nav.Link>
        </LinkContainer>

        </Container>
        </Navbar>
        
        <Container style={{minHeight:"550px"}}>
        {children}
        </Container>

        <Navbar variant="dark" style={{height:"100px", backgroundColor:"#ccc"}}>
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">


                </Navbar.Collapse>
            </Container>

            </Navbar>
        </>
    );

}