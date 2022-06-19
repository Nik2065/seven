import React from "react";
import {Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { BsFillArrowRightSquareFill, BsCartFill } from "react-icons/bs";


function Menu() {
return (
<>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Link className="navbar-brand" to="/">Brand</Link>

        <Nav className="me-auto">
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/features">
          <Nav.Link>Features</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/pricing">
          <Nav.Link>Pricing</Nav.Link>
        </LinkContainer>
          
          
        </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Link title="Перейти к корзине" className="nav-link" to="/shopping-cart">   <BsCartFill style={{fontSize:"1.9rem", color:"white"}} />          </Link>
          <Navbar.Text>
            Signed in as: Mark Otto
            &nbsp;<Link title="Выйти" to="" ><BsFillArrowRightSquareFill/></Link>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
</>
);

}

export default Menu