import React , { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';

import CarouselComponent from './CarouselComponent';
//import CardComponent from './CardComponent';
import MainLayout from './MainLayout';
import SimpleCart from '../features/cart/SimpleCart';
import { fetchProductsListMainPage } from '../features/catalog/catalogAPI';

//import { Counter } from '../features/counter/Counter';
//import {CartContent} from '../features/cart/CartContent';


function MainContent() {

    const [products, setProducts] = useState(
        []
        //()=> {
        //let storageProducts = localStorage.getItem('products');
        //if(storageProducts == undefined && storageProducts == null){
        //    products = new [];
        //}
    //}
    );


    //setProducts = product => {
    //    products.push(product);
    //}


    const [productsOnPage, 
        fetchProductsOnPage] = useState([])

    const getData = () => {
        fetchProductsListMainPage()
        //.then((res) => {
            //console.log(res)
            //res.json()})
        .then((res) => {
            console.log(res)
            fetchProductsOnPage(res)
          })
      }

    useEffect(() => {
        getData()
      }, [])
    

    //let myClick = () => {
    //}

    return (
        <>
        <MainLayout>
            
        <Container>
                <CarouselComponent/>
                <br/>
                <Row>

                {
                //Products.map((item, i) => {
                //    return  <Col key={i}><CardComponent 
                //    key={i} 
                //    product={item} 
                //    /></Col>
                //})
                }
                {
                    
                    productsOnPage.map((item, i) => {
                    //return <li key={i}>{item.name}</li>
                    return  <Col key={i}>
                        <div  >{item.name}-{item.cost}<button onClick={() => setProducts(item)} >add to cart</button></div>
                    </Col>
                    })
                }
                </Row>

            <SimpleCart products={products}/>

    


                

            </Container>
     
            </MainLayout>
            
            </>
    );
  }
  
  export default MainContent;
  
  