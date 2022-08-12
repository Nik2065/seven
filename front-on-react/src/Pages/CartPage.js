import React, {useState, useEffect} from "react";
import Layout from "../Layout";

import {Button, Container, Table} 
    from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { getLocalSessionId, countCartSum } from "../functions/commonFunctions";
import { getCartBySessionId } from "../functions/serverFunctions";


export default function CartPage() {


    const [productsInCart, setProductsInCart] = useState([]);


    //получаем содержимое корзины
    useEffect(()=>{
        const sId = getLocalSessionId();

        //загружаем корзину
        getCartBySessionId(sId)
        .then(result => {
            let cartItems = [];
            if(result.cartItems != null && result.cartItems.length>0){
                result.cartItems.forEach((item, i) => {
                cartItems.push({
                    qty: item.qty,
                    product: item.product
                })
                }
            )
            }
            
            console.log({cartItems});

            setProductsInCart(cartItems);
            setCartSum(countCartSum(cartItems));
        })


    }, []);

    const [cartSum, setCartSum] = useState(countCartSum(productsInCart));



return(<Layout>
        <Container>
            <br/>
        <h4>Корзина</h4>
        <Table bordered hover striped responsive >
            <tbody>
            {
                (productsInCart !== undefined && productsInCart.length>0) ?
                    productsInCart.map((item, i) =>{
                    //sum +=item.product.cost;
                    return <tr key={i}>
                        <td>{item.qty}</td>
                        <td>{item.product.name}</td>
                        <td>{item.product.cost}</td>

                    </tr>
                }) : ""
            }
            
            {
                <tr>
                    <td></td>
                    <td>Итого:</td>
                    <td>Сумма:{cartSum}</td>
                    
                </tr>
            }
            </tbody>
        </Table>
        <div style={{textAlign:"right"}}>
            <LinkContainer to="/order">
                <Button type="button" variant="primary">{'Оформить заказ >'}</Button>
            </LinkContainer>
        </div>
        </Container>

    </Layout>);


}