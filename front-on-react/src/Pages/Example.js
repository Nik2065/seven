
import {useParams} from 'react-router-dom';

import { Card, Button, Container, CardGroup, Row, Col}  from 'react-bootstrap';

import { CollapsibleNavbar } from "./PageComponents/CollapsibleNavbar"
import { ControlledCarousel } from "./PageComponents/ControlledCarousel"
import { Cards } from "./PageComponents/Cards"
import { ProductCard1 } from "./PageComponents/ProductCard1"

import {NavbarFooter2} from "./PageComponents/NavbarFooter2"
import {NavbarMainFooter} from "./PageComponents/NavbarMainFooter"


export function Example () {
    //const params = useParams();
    
    
    
    
    
    
    
    
    return (
      <>
      <Container>
      <CollapsibleNavbar/>
      <ControlledCarousel/>
      <Cards />
      </Container>

      <Container>
      <Row>
          <Col xs={12} sm={6} md={6} lg={3}>
          <ProductCard1/>
          </Col>
          <Col xs={12} sm={6} md={6} lg={3}>
          <ProductCard1/>
          </Col>


          <Col xs={12} sm={6} md={6} lg={3}>
          <ProductCard1/>
          </Col>
          <Col xs={12} sm={6} md={6} lg={3}>
          <ProductCard1/>
          </Col>
      </Row>
      </Container>

      <NavbarMainFooter/>
      <NavbarFooter2/>


      </>
    );


  }