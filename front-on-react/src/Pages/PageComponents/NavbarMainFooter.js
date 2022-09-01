import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Row, Col, Card, ListGroup } from 'react-bootstrap';

export function NavbarMainFooter() {
  return (
    <>

      <br />
      

    <Container style={{backgroundColor:""}}>
      <hr/>
    <Row>
            <Col md={3}>
            <span style={{paddingTop:"10px", display:"block"}} className='h4'>ShopLogo</span>
            </Col>
            
            <Col md={3}>
              <span className='h3' style={{paddingBottom:"10px", display:"block"}}>Category</span>
              <ListGroup variant="flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              </ListGroup>
              
            </Col>

            <Col md={3}>
            <span className='h3' style={{paddingBottom:"10px", display:"block"}}>Header</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            </Col>
            <Col md={3}>
            <span className='h3' style={{paddingBottom:"10px", display:"block"}}>Opening Hours</span>

            <p>Monday-Friday      8.00-20.00</p>
            <p>Saturday           10.00-20.00</p>
            <p>Sunday             12.00-20.00</p>
            </Col>
    </Row>
    <br/>
    </Container>


          
          
      
    </>
  );
}

