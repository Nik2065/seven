
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
<Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="button">
        Отправить
      </Button>
    </Form>
    </Col>
    </Row>


</Container>
<Navbar bg="dark" variant="light"  fixed="bottom">
<Container style={{color:"white"}}>
        Администрирование для ProjectSeven Shop
  </Container>

</Navbar>

</>
);


}