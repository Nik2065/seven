import React, {useEffect, useState, useContext} from "react";

import {Link} from 'react-router-dom';

import {Container, Card,
    Button, Row, Col} 
    from 'react-bootstrap';

import Layout from "../Layout.js";

import {CartContext} from '../CartContext'
import {getLocalSessionId, countCartSum, createCartTitle, countItems} from '../functions/commonFunctions'
import {getCartBySessionId, setProductsInCartOnServer} from '../functions/serverFunctions'
import {getAllProducts} from '../functions/serverFunctionsForProducts'


export default function MainPage() {


    const [cartContext, setCartContext] = useContext(CartContext);

    //сохраняем номер сессии в localstorage
    //const [localSessionId, setLocalSessionId] = useState(getLocalSessionId());

   
    /*useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        //console.log(sid);
        if(sessionId == null) {
            const g = createGuid();
            localStorage.setItem('sessionId', g);
        }
    }, []);*/



    const [productsInCatalog, setProductsInCatalog] = useState([]);

    //получаем каталог товаров
    useEffect(() => {
        //TODO: откуда-то брать идентификатор аккаунта
        const aid = "d7066528-4027-4ef0-bc2a-cd8fa9a3f199";

        getAllProducts(aid)
        .then( result => {
            console.log({result})
            setProductsInCatalog(result.paginationResult.resultList);

        });
    },[])

   
    
    const [productsInCart, setProductsInCart] = useState([]);

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

            setProductsInCart(cartItems);
            setCartSum(countCartSum(cartItems));
            setCartContext(createCartTitle(countItems(cartItems), countCartSum(cartItems)));
        })

    }, []);


   
    const [cartSum, setCartSum] = useState(countCartSum(productsInCart));




    //increment
    function AddToCart(product) {
        
        //console.log(product);
        //console.log(productsInCart);

        let newCartProducts = [];
        let inCart = false;
        let productQuantityPair;

        if(productsInCart!= null && productsInCart.length>0){
            productsInCart.forEach(item => {
                //если продукт уже добавлен
                if(item.product.id === product.id){
                    item.qty +=1;
                    newCartProducts.push(item);
                    productQuantityPair = item;
                    inCart = true;
                }
                else {
                    productQuantityPair = item;
                    newCartProducts.push(item);
                }
            })
        }

        if(!inCart){
            productQuantityPair = {qty:1, product:product};
            newCartProducts.push(productQuantityPair);
        }

        //отправляем данные на сервер
        if(setProductsInCartOnServer(productQuantityPair, getLocalSessionId())){
            setProductsInCart(newCartProducts);
            setCartSum(countCartSum(newCartProducts));
            setCartContext(createCartTitle(countItems(newCartProducts), countCartSum(newCartProducts)))
        }
    }

    //decrement 
    function DeleteFromCart(product){
        //let newState = productsInCart.slice();
        let newCartProducts = [];
        let productQuantityPair;

        productsInCart.forEach(item => {
            if(item.product.id === product.id){
                if(item.qty === 1) {
                    //собираемся удалить единственный продует
                    //просто не добавляем его в массив
                    //игнор
                    item.qty=0;
                    productQuantityPair = item;
                }
                else{
                    //добавляем с уменьшиным кол-вом элементов
                    item.qty -=1;
                    productQuantityPair = item;
                    newCartProducts.push(item);
                }
            }
            else{
                //newState.push({qty:1, product: product})
                newCartProducts.push(item);
                productQuantityPair = item;
            }
        })

        console.log(productQuantityPair);

        //отправляем данные на сервер
        if(setProductsInCartOnServer(productQuantityPair, getLocalSessionId())){
            setProductsInCart(newCartProducts);
            setCartSum(countCartSum(newCartProducts));
            setCartContext(countItems(newCartProducts) + ' | ' + countCartSum(newCartProducts) + ' ₽');
        }
    }

    return (
        <Layout>


      {/*
        <Container>
        <h4>Корзина</h4>
        <Table bordered hover striped responsive >
            <tbody>
            {
                (productsInCart !== undefined && productsInCart.length>0) ?
                    productsInCart.map((item, i) =>{
                    //sum +=item.product.cost;
                    return <tr key={i}>
                        <td>{item.qty}</td>
                        <td>{item.product.name}</td>
                        <td>{item.product.cost}</td>

                    </tr>
                }) : ""
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
        */}
        

        <Container>
        <h4>Каталог</h4>
        <Row>
        {
        
        (productsInCatalog != null) ? productsInCatalog.map((item, i) => {
            return <Col key={i}>
            <Card>
            <Card.Body>
                <Card.Title>
                    <Link to={'/catalog/' + item.id}>{item.name}</Link>
                    
                </Card.Title>
                <Card.Text>
                {item.cost}
                </Card.Text>
                <Button onClick={() => AddToCart(item)} style={{width:"40px"}} variant="outline-success">+</Button>&nbsp;
                <Button onClick={() => DeleteFromCart(item)} style={{width:"40px"}} variant="outline-success">-</Button>
            </Card.Body>
            </Card>
            </Col>
        })
        : ""

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



        </Layout>
      );

}