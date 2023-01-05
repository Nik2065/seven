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
            <LinkContainer to="/">
                <Navbar.Brand>CORE-7</Navbar.Brand>
            </LinkContainer>

          <Nav className="me-auto">
            <LinkContainer to="/help">
                <Nav.Link>Частые вопросы</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>

            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <LinkContainer to="/admin">
                <Nav.Link>Проекты</Nav.Link>
            </LinkContainer>

          </Nav>

          <Form className="d-flex">
          <LinkContainer to="/signup">
            <Button variant="outline-warning" >Создать аккаунт</Button>
            </LinkContainer>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <LinkContainer to="/adminlogin">
            <Button variant="outline-success">Войти</Button>
            </LinkContainer>
          </Form>
        </Container>
      </Navbar>

    <Container>
        <br/>
        <p>
            <div className="h2 text-center" >
            
            <strong>CORE-7</strong><br/>
            Простая платформа для организации онлайн торговли
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
                <Card.Title>Что внутри?</Card.Title>
                    <Card.Text>
                    Каждому аккаунту соответвует несколько проектов (зависит от тарифа). Каждый проект условно может быть 3х типов: лендинг без корзины, лендинг с корзиной и интернет магазин.



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



    <br/>
        <Row>
        <Col md={3}>
        <Card>
                <Card.Body>
                <Card.Title style={{backgroundColor:"lightgray", padding:"5px", textAlign:"center"}}>Тариф TEST<sup>β</sup></Card.Title>
                    <Card.Text>
                    
                    <ul>
                        <li>Создание до 3х проектов</li>
                        <li></li>


                    </ul>


                    </Card.Text>

                    <div style={{textAlign:"center"}}>
                    <Button  variant="outline-success">Выбрать</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>

        <Col md={3}>
            <Card>
                <Card.Body>
                <Card.Title style={{backgroundColor:"lightyellow", padding:"5px", textAlign:"center"}}>Тариф ONE</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>

                    <div style={{textAlign:"center"}}>
                    <Button  disabled variant="outline-success">Выбрать</Button>
                    </div>

                </Card.Body>
            </Card>
        
        </Col>

        <Col md={3}>
            <Card>
                <Card.Body>
                <Card.Title style={{backgroundColor:"Orange", padding:"5px", textAlign:"center"}}>Тариф STANDARD</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>

                    <div style={{textAlign:"center"}}>
                    <Button  disabled variant="outline-success">Выбрать</Button>
                    </div>

                </Card.Body>
            </Card>
        
        </Col>

        <Col md={3}>
            <Card>
                <Card.Body>
                <Card.Title style={{backgroundColor:"SteelBlue", padding:"5px", textAlign:"center", color:"white"}}>Тариф EXTRA</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Card.Text>

                    <div style={{textAlign:"center"}}>
                    <Button  disabled variant="outline-success">Выбрать</Button>
                    </div>

                </Card.Body>
            </Card>
        
        </Col>
    </Row>
    <br/>
    <Row>
    <Col md={12}>
            <Card>
                <Card.Body>
                    <Card.Text>
                    * Сайт используется в тестовом режиме, поэтому доступны функции только тестового тарифа
                    </Card.Text>

                </Card.Body>
            </Card>
        
        </Col>
    </Row>




    </Container>



    <Navbar sticky='bottom' style={{ backgroundColor:"#ccc", maxHeight:"12%", height:"100px", marginTop: "50px"}}>
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