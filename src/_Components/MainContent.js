import React , { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';

import CarouselComponent from './CarouselComponent';
import CardComponent from './CardComponent';
import MainLayout from './MainLayout';
import { fetchProductsListMainPage } from '../features/catalog/catalogAPI';

//import { Counter } from '../features/counter/Counter';
//import {CartContent} from '../features/cart/CartContent';


function MainContent() {

    const [Products, 
        fetchProducts] = useState([])

    const getData = () => {
        fetchProductsListMainPage()
        //.then((res) => {
            //console.log(res)
            //res.json()})
        .then((res) => {
            console.log(res)
            fetchProducts(res)
          })
      }

    useEffect(() => {
        getData()
      }, [])
    
    return (
        <>
        <MainLayout>
            
        <Container>
                <CarouselComponent/>
                <br/>
                <Row>

                {
                Products.map((item, i) => {
                    //return <li key={i}>{item.name}</li>
                    return  <Col key={i}><CardComponent 
                    key={i} 
                    product={item}/></Col>
                })
                }

                </Row>
{
            //<CartContent />
}
    


                

            </Container>
     
            </MainLayout>
            
            </>
    );
  }
  
  export default MainContent;
  
  