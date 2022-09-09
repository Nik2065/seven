

import { Container, Row, Col}  from 'react-bootstrap';

import { ProductCard1 } from "./ProductCard1"


//
//TODO: передавать список id продуктов для тотображения на главной странице
//
export function ProductsView1() {




    return(
        <Container style={{paddingTop:"10px"}}>
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
    )


}