
import { Card, Button, Container, CardGroup}  from 'react-bootstrap';


import { BsCartFill } from "react-icons/bs";









export function ProductCard1() {


    return (

        <Card style={{ width: '18rem' }}>


        <img 
        style={{display: "block", marginLeft: "auto", marginRight: "auto"}}
        src={require('../../img/shirt-1.jpg')}
        height="200px"
        width="156px"
        />

        <Card.Body>
            <Card.Title>Рубашка мужская</Card.Title>
            <Card.Text>
            Some quick example text
            </Card.Text>
            <Button style={{display: "block", marginLeft: "auto", marginRight: "auto"}} variant="outline-success"><BsCartFill/></Button>
        </Card.Body>
        </Card>



    );


}