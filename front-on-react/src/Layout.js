import React, {useContext} from 'react';
import {Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, 
    Navbar} 
    from 'react-bootstrap';

import { BsCartFill } from "react-icons/bs";

import {CartContext} from './CartContext'


export default function Layout ({children}) {

  const [cartContext, setCartContext] = useContext(CartContext);

    return ( 
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Link className="navbar-brand" to="/">ProjectSeven ReactShop</Link>
    
        <Nav className="me-auto">
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
        </Nav>
    
          <Navbar.Collapse className="justify-content-end">
            <Link title="Перейти к корзине" className="nav-link" to="/shopping-cart">   <BsCartFill style={{fontSize:"1.9rem", color:"white"}} />   </Link>
            <span style={{color:"white"}}>{cartContext}</span>
            
        </Navbar.Collapse>
        </Container>
        </Navbar>
        
        <Container style={{minHeight:"550px"}}>
        {children}
        </Container>

        <Navbar bg="dark" variant="dark" style={{height:"100px"}}>
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