import React from 'react';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
import  PropTypes  from 'prop-types';
import {AddToCartButton} from '../features/cart/AddCartButton';

function CardComponent(props) {
    return (
      <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>
        {props.product.description}
        </Card.Text>
        <AddToCartButton  product={props.product}/>
      </Card.Body>
    </Card>
    );
  }
  

  CardComponent.propTypes = {
    product: PropTypes.object.isRequired,

  }

  export default CardComponent;