import React, {useContext, useEffect} from 'react';
import {Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {Col, Container, Nav, Row,
    Navbar} 
    from 'react-bootstrap';

import { BsCartFill } from "react-icons/bs";

import {CartContext} from './CartContext'
import { getLocalSessionId, createCartTitle, countItems, coutCartSum} from './functions/commonFunctions'
import { getCartBySessionId } from './functions/serverFunctions'


import 'bootstrap/dist/css/bootstrap.min.css';


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

        <Navbar fixed='bottom' style={{ backgroundColor:"#ccc", height: "150px"}}>
            <Container>
                <Row>
                    <div  style={{width:"45%"}}>
                        Техническая поддержка: 8(499)001-22-33<br/>
                        info@sevenProjectSiteBuilder.ru
                    </div>
                    <div style={{width:"45%", textAlign:"right"}}>
                        &copy; 2022 Разработано "ООО СамДиджиталСолюшенс"
                    </div>
                </Row>
 
            </Container>
            </Navbar>
        </>
    );

}