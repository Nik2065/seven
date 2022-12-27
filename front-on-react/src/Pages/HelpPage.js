import React from "react";

//import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'

import {Container, Card,
    Button, Row, Col, Nav, Navbar, Form, Accordion } 
    from 'react-bootstrap';

//import Layout from "../Layout.js";
//import {getAllProducts} from '../functions/serverFunctionsForProducts'
//import mainStore from '../MainStore';


export default function HelpPage() {


    function sendQuestion(){
        alert('еще не реализовано');
    }


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
            <LinkContainer to="/adminlogin">
            <Button variant="outline-success">Войти</Button>
            </LinkContainer>
          </Form>
        </Container>
      </Navbar>




      <Container style={{minHeight:"500px"}}>

      <br/>
        <Row>
        <Col md={4}>
        <Card>
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>

        <Col md={8}>
            <Card>
                
            <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Accordion Item #3</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header>Accordion Item #4</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
                <Accordion.Header>Accordion Item #5</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>


            </Card>
        
        </Col>
    </Row>



       

    <br/>

    </Container>

    <Container>
        <br/>
        <p>
            <div className="h6 text-center" >
            
            
            Не нашли ответ на свой вопрос?
            <br/>
            Задайте его в этой форме
            </div>
        </p>
        <Form>
        <Row>

        <Col lg="2" xs="0"></Col>

        <Col lg="8" xs="12">
        <Form.Control as="textarea" rows="3" placeholder="Мой вопрос" />
        </Col>

        <Col lg="2" xs="0"></Col>

        </Row>
        <br/>
        <Row>

        <Col lg="2" xs="0"></Col>

        <Col lg="4" xs="6">
          <Form.Control placeholder="my@email.ru" />
        </Col>
        <Col lg="4" xs="6">
          <Button onClick={sendQuestion} style={{width:"100%"}} variant="outline-primary">Отправить</Button>
        </Col>

        <Col lg="2" xs="0"></Col>

        </Row>
        </Form>



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