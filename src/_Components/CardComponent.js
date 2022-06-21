import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  PropTypes  from 'prop-types';

function CardComponent(props) {
    return (
      <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>
        {props.product.description}
        </Card.Text>
        <Button variant="primary">add to cart</Button>
      </Card.Body>
    </Card>
    );
  }
  

  CardComponent.propTypes = {
    product: PropTypes.object.isRequired,

  }

  export default CardComponent;