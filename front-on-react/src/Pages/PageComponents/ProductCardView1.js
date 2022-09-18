
import { Card}  from 'react-bootstrap';





//import mainStore from '../../MainStore';
import CartButtonsView from './CartButtonsView';



export function ProductCardView1(product) {


    //console.log({product});


    return (

        <Card>


        <img 
        style={{display: "block", marginLeft: "auto", marginRight: "auto"}}
        src={require('../../img/huawei-p20-1.jpg')}
        height="204px"
        width="100px"
        />
        

        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
            {product.description}
            </Card.Text>
            

            <CartButtonsView currentProduct={product} />

        </Card.Body>
        </Card>

    );


}


