import React from 'react';
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';

import CarouselComponent from './CarouselComponent';
import CardComponent from './CardComponent';
import MainLayout from './MainLayout';

function MainContent() {
    return (
        <>
        <MainLayout>
            
        <Container>
                <CarouselComponent/>
                <br/>
                <Row>
                    <Col><CardComponent/></Col>
                    <Col><CardComponent/></Col>
                    <Col><CardComponent/></Col>
                    <Col><CardComponent/></Col>
                </Row>
            </Container>
     
            </MainLayout>
            
            </>
    );
  }
  
  export default MainContent;
  
  