
import { Card, Button, Container, CardGroup}  from 'react-bootstrap';












export function Cards() {


    return (
        <>
        <CardGroup>

        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" 
        src={require('../../img/card-2.jpg')}
        height="120px"
        />

        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>


        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" 
        src={require('../../img/card-2.jpg')}
        height="120px"
        />
        
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>


        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" 
        src={require('../../img/card-2.jpg')}
        height="120px"
        />
        
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </Card>
        </CardGroup>

        




    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>New Arrivals</Card.Title>
        <Card.Text>
        The best Online sales to shop these weekend
        </Card.Text>
        <Button variant="primary">Go to collection</Button>
      </Card.Body>
      <Card.Footer className="text-muted">don't miss</Card.Footer>
    </Card>
        </>

    );


}