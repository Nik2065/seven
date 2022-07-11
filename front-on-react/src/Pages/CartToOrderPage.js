import { useState } from 'react';


import {Container,  Form, Button} 
    from 'react-bootstrap';
import Layout from '../Layout';







export default function CartToOrderPage(){
    
    const [orderCreated, setOrderCreated] = useState(false);

    async function CreateOrder(){



    }
    
    async function CreateOrderFromCartOnServerSide(){
        let orderCreated = false;

        const url='';
        const resp = await fetch(url);
        const result = await resp.json();
        
        


        return orderCreated;
    }
        
    
    return(<Layout>
        <br/>
        <h4>Оформление заказа</h4>

        <Container>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ваше имя</Form.Label>
            <Form.Control type="email" placeholder="Ваше имя" />
            <Form.Text className="text-muted">
            
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Адрес доставки</Form.Label>
            <Form.Control type="email" placeholder="Адрес доставки" />
            <Form.Text className="text-muted">
            
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Введите email" />
            <Form.Text className="text-muted">
            
            </Form.Text>
        </Form.Group>
        <div style={{textAlign:"right"}}>
        <Button onClick={()=> CreateOrder()}  variant="primary" type="button">
            Отправить
        </Button>
        </div>

        </Form>
        </Container>

    </Layout>);
}