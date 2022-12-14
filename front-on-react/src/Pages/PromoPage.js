import React, {useEffect, useState, useContext} from "react";

import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'

import {Container, Card,
    Button, Row, Col, Nav, Navbar, Form } 
    from 'react-bootstrap';

import Layout from "../Layout.js";
import {getAllProducts} from '../functions/serverFunctionsForProducts'
import mainStore from '../MainStore';


export default function PromoPage() {




    return (
        <>
        
      <Navbar bg="light" variant="light" expand="md">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>

            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <LinkContainer to="/admin">
                <Nav.Link>Проекты</Nav.Link>
            </LinkContainer>

          </Nav>
        </Container>
      </Navbar>

    <Container>
        <br/>
        <p>
            <div className="h2 text-center" >
            
            <strong>CMS7</strong><br/>
            Простой конструтор интернет магазина
            </div>
        </p>


        <Form>
        <Row>

        <Col lg="3" xs="0"></Col>

        <Col lg="3" xs="6">
          <Form.Control placeholder="my@email.ru" />
        </Col>
        <Col lg="3" xs="6">
          <Button style={{width:"100%"}} variant="outline-primary">Попробовать бесплатно</Button>
        </Col>

        <Col lg="3" xs="0"></Col>

        </Row>
        </Form>

    </Container>


      <Container>

      <br/>
        <Row>
        <Col md={4}>
        <Card>
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>

        <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>
                </Card.Body>
            </Card>
        
        </Col>

        <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>
                </Card.Body>
            </Card>
        
        </Col>
    </Row>



        <br/>
        <Row>
        <Col md={4}>
            <img src={require('./../img/promo/promo_pic1small.jpg')}  width="100%" alt="som text" />
        </Col>

        <Col md={8}>
            <Card>
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>
                </Card.Body>
            </Card>
        
        </Col>
    </Row>

    <br/>
        <Row>


        <Col md={8}>
            <Card>
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>
                </Card.Body>
            </Card>

        </Col>

        <Col md={4}>
            <img src={require('./../img/promo/promo_pic1small.jpg')}  width="100%" alt="som text" />
        </Col>
    </Row>
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
                    </div>
                    
                </Row>
 
            </Container>
            </Navbar>
        </>
      );

}