
import { Container, Form, Button,Row, Col, Table, Navbar } from "react-bootstrap";





export default function AdminLoginPage () {





return(
<>
  <br/>
<Container>
  <div style={{minHeight:"150px", height:"20%"}}>&nbsp;</div>
<Row>
  <Col sm={2} lg={3}></Col>
  <Col xs={12} sm={8} lg={6}>

<div style={{backgroundColor:"#ccc", padding:"10px"}}>
<div className="h4" style={{textAlign:"center"}}>Администрирование</div>
<Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
         <Form.Text className="text-muted">
          
         </Form.Text>
      </Form.Group>
      <div style={{textAlign:"right"}}>
      <Button  variant="primary" type="button">
        Войти
      </Button>
      </div>
    </Form>

    </div>
    </Col>
    </Row>


</Container>

<Navbar bg="dark" variant="light"  fixed="bottom" style={{height:"150px"}}>
<Container style={{color:"white"}}>
        <div style={{textAlign:"right", width:"100%"}} >
        Администрирование для ProjectSeven Site Builder
        </div>
  </Container>

</Navbar>

</>
);


}