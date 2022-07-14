import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../Layout";

import {getProduct} from '../functions/serverFunctions'



export default function ProductPage(){


    const [product, setProduct] = useState();
    //const { productId } = useParams();
    let params = useParams();

    useEffect(()=>{
        
        getProduct(params.productid)
        .then(p => {
            console.log({p});
            setProduct(p);
        })

    }, []);


    return(

        

        <Layout>
            
        {
            
            product !== undefined ?
        <Container>
            <br/>
            
        <Row>
            <Col sm={3}>
            <img width={200} height={200} src=""/>
            </Col>
            <Col  sm={9}>
            <h3>{product.name}</h3>
            art: iuweryt<br/>
            {product.description}
            </Col>
        </Row>

        </Container>
          : ""
        }
        </Layout>
    );
}