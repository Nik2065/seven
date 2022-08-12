import {useState} from 'react';
import { Navigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert, Navbar } from "react-bootstrap";



import {Auth } from '../../functions/serverFunctions';

export default function AdminLoginPage () {

  const [authErr, setAuthErr] = useState(
    {Success: true,
    Message:""});

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");


const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const auth = () => {

    //валидируем
    //логин - это email
    if(!validateEmail(login)){
      setAuthErr({
        Success:false,
        Message:"Ошибка в email"
      });
      return;
    }

    //длина пароля не меньше 6 символов
    if(password.length < 6){
      setAuthErr({
        Success:false,
        Message:"Пароль не может быть короче 6ти символов"
      });
      return;
    }

    var authResult = Auth(login, password);
    //console.log({authResult});
      //если успешно авторизовались
      //сохраняем результат в localstorage
      //if()
      
    //})



    authResult.then((res) => {

      console.log({res});

      const aData = {
        access_token:res.access_token,
        expires: res.expires,
        username: res.username
      };

      if(res.success){
        console.log("success");
        localStorage.setItem('authData', JSON.stringify(aData));
        //TODO: вот тут переход на предыдущую страницу на которой были
        //пока просто переходим к проектам
        //history.push("/home");
        
        //TODO: сделать нормально
        window.location.replace('admin')


      }
      else {
        setAuthErr({
          Success: res.success,
          Message: res.message
        });
      }


    });
    
}

const something = (event)=>{
  if (event.keyCode === 13) {
    //console.log('enter')
    auth();
}
}

return(
<>
  <br/>
<Container>
  <div style={{minHeight:"150px", height:"20%"}}>&nbsp;</div>
<Row>
  <Col sm={2} lg={3}></Col>
  <Col xs={12} sm={8} lg={6}>

<Alert  key="warning" variant="warning" show={!authErr.Success}>
<Alert.Heading>Ошибка авторизации</Alert.Heading>
<p>
{authErr.Message}
</p>
</Alert>

<div style={{backgroundColor:"#ccc", padding:"10px"}}>
<div className="h4" style={{textAlign:"center"}}>Администрирование</div>
<Form onKeyDown={(e) => something(e) }>
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

<Navbar bg="dark" variant="light"  fixed="bottom" style={{height:"10%"}}>
<Container style={{color:"white"}}>
        <div style={{textAlign:"right", width:"100%"}} >
        Администрирование для ProjectSeven Site Builder
        </div>
  </Container>

</Navbar>

</>
);


}