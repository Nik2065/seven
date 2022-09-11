

import { Container, Row, Col}  from 'react-bootstrap';

import { ProductCardView1 } from "./ProductCardView1"


//
//TODO: передавать список id продуктов для тотображения на главной странице
//
export function ProductsOnMainPage() {




    return(
        <Container style={{paddingTop:"10px"}}>
        <Row>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1/>
            </Col>
        </Row>
        </Container>
    )


}