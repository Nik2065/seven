import React, {useContext, useEffect} from 'react';
import {Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Row,
    Navbar,
    Button} 
    from 'react-bootstrap';

import { generateGuid } from './functions/commonFunctions';


import { BsDoorOpen } from "react-icons/bs";



import {CartContext} from './CartContext'
import { getLocalSessionId /*, createCartTitle, countItems, countCartSum*/} from './functions/commonFunctions'
import { getCartBySessionId } from './functions/serverFunctions'


import 'bootstrap/dist/css/bootstrap.min.css';
import  MyAdminToastView from './Pages/Admin/MyAdminToastView'
import notificationStore from './NotificationStore';





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
            //setCartContext(createCartTitle(countItems(cartItems), countCartSum(cartItems)));
        })

    }, []);


    const logout=()=>{
        localStorage.removeItem('authData');
        //TODO: сделать нормально
        window.location.replace('/adminlogin')
    }


    return ( 
        <>

        


        <Navbar bg="dark" variant="dark">
        <Container>
        <Link className="navbar-brand" to="/">ProjectSeven ReactShop</Link>
    
        <Nav className="me-auto">
        <LinkContainer to="/admin">
          <Nav.Link>Проекты</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/products">
          <Nav.Link>Каталог</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/categories">
          <Nav.Link>Категории</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/characteristics">
          <Nav.Link>Характеристики</Nav.Link>
        </LinkContainer>
        </Nav>
    
        <Nav className="justify-content-end" activeKey="/home">
            
            <Nav.Link onClick={() => logout()} >Выход <BsDoorOpen/></Nav.Link>
            
        </Nav>

        </Container>
        </Navbar>
        
        
        


        <Container style={{minHeight:"550px"}}>

        


        {children}
        </Container>

        <Navbar sticky='bottom' style={{ backgroundColor:"#ccc", maxHeight:"12%", height:"100px", marginTop: "10px"}}>
            <Container>
                <Row>
                    <div  style={{width:"45%", fontSize:"0.8em"}}>
                        Техническая поддержка: 8(499)001-22-33<br/>
                        info@sevenProjectSiteBuilder.ru
                    </div>
                    <div style={{width:"45%", textAlign:"right", fontSize:"0.8rem"}}>
                        &copy; 2022 Разработано "ООО СамДиджиталСолюшенс"

                        <Button onClick={() => { 
                            const msg = {
                                title: "123", 
                                body: "gjhkgfdghkjdfhghfdkgjhd kjfdhgkjfdh kfhgkdfjhg",
                                id: generateGuid(),
                                type: 1
                            };

                            notificationStore.createNotification(msg)
                            //msg.type = 2;
                            //notificationStore.createNotification(msg)
                            //msg.type = 3;
                            //notificationStore.createNotification(msg)

                        }}>add</Button>
                        &nbsp;
                        <Button onClick={() => {

                            const a100 = notificationStore.getNotifications();
                            console.log({a100});

                        }}>show</Button>



                    </div>
                    
                </Row>
 
            </Container>
            </Navbar>
        </>
    );

}