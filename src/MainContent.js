import React, {useEffect, useState} from "react";
import {Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'

import {Container, Card, Nav, 
    Navbar, Button, Row, Col, Table} 
    from 'react-bootstrap';

import { BsCartFill } from "react-icons/bs";


export default function MainContent() {


    //сохраняем номер сессии в localstorage
    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        //console.log(sid);
        if(sessionId == null) {
            const g = createGuid();
            localStorage.setItem('sessionId', g);
        }
    });



    function createGuid()  
    {  
       /*return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
          var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
          return v.toString(16);  
       });*/
       return '167438a6-4e75-4c15-bd5b-0a6610f92212';  
    }

    const [productsInCatalog, setProductsInCatalog] = useState([
        {id:1, name:"Product 1", cost:10},
        {id:2, name:"Product 2", cost:16.7},
        {id:3, name:"Product 3", cost:86.2}
    ]);

    //получаем каталог товаров
    useEffect(() => {
        
        const url = 'http://localhost:49153/Catalog/GetAllCatalogItems';
        fetch(url)
        .then( resp => resp.json())
        .then( result => {
            //console.log(items)
            setProductsInCatalog(result.items);
        }, [] );
    })

    let initialCart = [
        {qty:3, product:{id:1, name:"Product 1", cost:10}},
        {qty:1, product:{id:3, name:"Product 3", cost:86.2}}
    ];

    //получаем содержимое корзины
    useEffect(()=>{

        const sId = localStorage.getItem('sessionId');
        //загружаем корзину
        const url = 'http://localhost:49153/Cart/GetCartBySessionId?sessionId=' + sId;
        fetch(url)
        .then(resp => resp.json())
        .then(result => {
            console.log(result);
        })
    }, []);


    const [productsInCart, setProductsInCart] = useState(initialCart);

    const [cartSum, setCartSum] = useState(CoutSum(productsInCart));

    function CoutSum(items){
        let s = 0;
        items.forEach(item =>{s+=(item.product.cost * item.qty)})
        return s;
    }

    function AddToCart(product) {
        
        console.log(product);
        console.log(productsInCart);

        let newCartProducts = [];
        let inCart = false;
        productsInCart.forEach(item => {
            //если продукт уже добавлен
            if(item.product.id === product.id){
                item.qty +=1;
                newCartProducts.push(item);
                inCart = true;
            }
            else 
                newCartProducts.push(item);
        })

        if(!inCart)
            newCartProducts.push({qty:1, product:product});

        setProductsInCart(newCartProducts);
        setCartSum(CoutSum(newCartProducts));
    }

    function DeleteFromCart(product){
        //let newState = productsInCart.slice();
        let newCartProducts = [];

        productsInCart.forEach(item => {
            if(item.product.id === product.id){
                if(item.qty === 1) {
                    //собираемся удалить единственный продует
                    //просто не добавляем его в массив
                    //игнор
                }
                else{
                    //добавляем с уменьшиным кол-вом элементов
                    item.qty -=1;
                    newCartProducts.push(item);
                }
            }
            else{
                //newState.push({qty:1, product: product})
                newCartProducts.push(item);
            }
        })

        setProductsInCart(newCartProducts);
        setCartSum(CoutSum(newCartProducts));
    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Link className="navbar-brand" to="/">Brand</Link>

        <Nav className="me-auto">
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
        </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Link title="Перейти к корзине" className="nav-link" to="/shopping-cart">   <BsCartFill style={{fontSize:"1.9rem", color:"white"}} />          </Link>
        </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{minHeight:"550px"}}>
        <Container>
        <h4>Корзина</h4>
        <Table bordered hover striped responsive >
            <tbody>
            {
                
                productsInCart.map((item, i) =>{
                    //sum +=item.product.cost;
                    return <tr key={i}>
                        <td>{item.qty}</td>
                        <td>{item.product.name}</td>
                        <td>{item.product.cost}</td>

                    </tr>
                })
            }
            

            
            {
                <tr>
                    <td></td>
                    <td>Итого:</td>
                    <td>Сумма:{cartSum}</td>
                    
                </tr>
            }
            </tbody>
        </Table>
        </Container>
        

        <Container>
        <h4>Каталог</h4>
        <Row>
        {
        
        productsInCatalog.map((item, i) => {
            return <Col key={i}>
            <Card>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                {item.cost}
                </Card.Text>
                <Button onClick={() => AddToCart(item)} style={{width:"40px"}} variant="outline-success">+</Button>&nbsp;
                <Button onClick={() => DeleteFromCart(item)} style={{width:"40px"}} variant="outline-success">-</Button>
            </Card.Body>
            </Card>
            </Col>
        })
        }
        </Row>
<Row>
            <Col>
            <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title>Title 1</Card.Title>
                <Card.Text>
                Some description
                </Card.Text>
                <Button variant="primary">add to cart</Button>
            </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title>Title 2</Card.Title>
                <Card.Text>
                Some description 2
                </Card.Text>
                <Button variant="primary">add to cart</Button>
            </Card.Body>
            </Card>
            </Col>
            
            </Row>
        </Container>
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