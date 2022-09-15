
import { Card, Button, Container, CardGroup}  from 'react-bootstrap';


import { BsCartFill } from "react-icons/bs";









export function ProductCard1() {


    return (

        <Card>


        <img 
        style={{display: "block", marginLeft: "auto", marginRight: "auto"}}
        src={require('../../img/huawei-p20-1.jpg')}
        height="204px"
        width="100px"
        />
        

        <Card.Body>
            <Card.Title>Смартфон HUAWEI P20</Card.Title>
            <Card.Text>
            128 ГБ/	4 ГБ/3400 мА·ч/2 sim
            </Card.Text>
            <Button style={{display: "block", marginLeft: "auto", marginRight: "auto"}} variant="outline-success"><BsCartFill/></Button>
        </Card.Body>
        </Card>

    );


}