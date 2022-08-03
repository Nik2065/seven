import {useState} from 'react';

import { Container, Form, Button, Row, Col, Alert, Navbar } from "react-bootstrap";



import {Auth } from '../../functions/serverFunctions';

export default function AdminLoginPage () {

  const [authErr, setAuthErr] = useState({});

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

const auth = () => {

    Auth(login, password)
    .then((authResult) => {
      console.log({authResult});

      
    })

    //if(authResult.)
    

    //если успешно авторизовались
    //сохраняем результат в localstorage
    //if()
    
    //localStorage
}


return(
<>
  <br/>
<Container>
  <div style={{minHeight:"150px", height:"20%"}}>&nbsp;</div>
<Row>
  <Col sm={2} lg={3}></Col>
  <Col xs={12} sm={8} lg={6}>

<Alert  key="warning" variant="warning">
<Alert.Heading>Ошибка авторизации</Alert.Heading>
<p>

</p>
</Alert>

<div style={{backgroundColor:"#ccc", padding:"10px"}}>
<div className="h4" style={{textAlign:"center"}}>Администрирование</div>
<Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={login} onChange={(e)=> setLogin(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
         <Form.Text className="text-muted">
          
         </Form.Text>
      </Form.Group>
      <div style={{textAlign:"right"}}>
      <Button onClick={() => auth()}  variant="primary" type="button">
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