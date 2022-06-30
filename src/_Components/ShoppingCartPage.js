import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {Row, Col, Button} from 'react-bootstrap';

import MainLayout from './MainLayout';

function ShoppingCartPage() {
    return (
        <MainLayout>
            <Container>
<br/>
<h4>Корзина</h4>

<Row>

    <Col sm={8}>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </Table>
    </Col>
    <Col sm={4}>
        <Button>{"Оформить заказ >"}</Button>
    </Col>
    </Row>
            </Container>
        </MainLayout>
    );
  }
  
  export default ShoppingCartPage;