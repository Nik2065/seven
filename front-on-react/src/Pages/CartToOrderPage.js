import { useState } from 'react';


import {Container,  Form, Button, Alert } 
    from 'react-bootstrap';
import Layout from '../Layout';


import {createOrderFromCartOnServerSide} from '../functions/serverFunctions'
import { getLocalSessionId } from '../functions/commonFunctions';





export default function CartToOrderPage(){
    
    const [orderAttribute, setOrderAttribute] = useState(
        {created: false, orderId: 0});


    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [alertAttribute, setAlertAttribute] = useState({show: false, msg: ''});

    async function CreateOrder(){


        const obj =  {
            sessionId: getLocalSessionId(),
            customerName: customerName, 
            customerAddress: customerAddress,
            customerEmail: customerEmail
        }

        var res = await createOrderFromCartOnServerSide(obj);
        if(res.success){
            setOrderAttribute({
                created: res.success,
                orderId: res.orderId
            });

        }
        else{
            //показываем ошибку
            setAlertAttribute({show: true, msg: res.message})
        }

    }
    
    
        
    
    return(<Layout>
        <br/>
        <h4>Оформление заказа</h4>

        {
            (orderAttribute.created !== undefined && orderAttribute.created)
            ?
            <div>Создан заказ № {orderAttribute.orderId}</div>
            :
        
            <Container>
                <Alert key={'warning'} 
                variant={'warning'} 
                show={alertAttribute.show}
                onClose={() => setAlertAttribute({show: false})} 
                dismissible>
                    {alertAttribute.msg} fdghg
                </Alert>
            <Form>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control value={customerName} onChange={(event)=> setCustomerName(event.target.value)} type="text" placeholder="Ваше имя" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Адрес доставки</Form.Label>
                <Form.Control value={customerAddress} onChange={(event)=> setCustomerAddress(event.target.value)} type="text" placeholder="Адрес доставки" />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control  value={customerEmail}  onChange={(event)=> setCustomerEmail(event.target.value)} type="email" placeholder="Ваш email" />
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
        }
            </Layout>);

}


