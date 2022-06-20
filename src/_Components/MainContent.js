import React , { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';

import CarouselComponent from './CarouselComponent';
import CardComponent from './CardComponent';
import MainLayout from './MainLayout';
//import { fetchProductsListMainPage } from '../features/catalog/catalogAPI';

import { Counter } from '../features/counter/Counter';



function MainContent() {

    const [Users, fetchUsers] = useState([])

    const getData = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            fetchUsers(res)
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

                {Users.map((item, i) => {
                return <li key={i}>{item.name}</li>
                })}

                
                    <Col><CardComponent/></Col>
                    <Col><CardComponent/></Col>
                    <Col><CardComponent/></Col>
                    <Col><CardComponent/></Col>
                </Row>

                <Counter />

            </Container>
     
            </MainLayout>
            
            </>
    );
  }
  
  export default MainContent;
  
  