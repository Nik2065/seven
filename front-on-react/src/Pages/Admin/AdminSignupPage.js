import {useState} from 'react';
import { Container, Form, Button, Row, Col, Alert, Navbar, InputGroup, Card } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';


export default function AdminSignupPage () {

  const [authErr, setAuthErr] = useState(
    {Success: true,
    Message:""});

  const [login, setLogin] = useState("");
  const [phone, setPhone] = useState("");
  const [firmName, setFirmName] = useState("");


const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



const createAccount = () => {

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
    if(phone.length < 10){
      setAuthErr({
        Success:false,
        Message:"Номер телефона не может быть короче 10-ти символов"
      });
      return;
    }


    //TODO:вызвать метод создания аккаунта




    //var authResult = Auth(login, password);


    //console.log({authResult});
      //если успешно авторизовались
      //сохраняем результат в localstorage
      //if()
      
    //})



    /*authResult.then((res) => {

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


    });*/
    
}

const onPressEnter = (event)=>{
  if (event.keyCode === 13) {
    //console.log('enter')
    //auth();
    //TODO: вызывать метод создания аккаунта

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


<Card style={{backgroundColor:"", padding:"10px"}} >
  <Card.Title style={{textAlign:"center"}}>Новый аккаунт</Card.Title>

  <Card.Body>
<Form onKeyDown={(e) => onPressEnter(e) }>
<Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email<sup style={{color:"red"}}>*</sup></Form.Label>
    <Form.Control value={login} onChange={(e)=> setLogin(e.target.value)} type="email" placeholder="Введите email" />
    <Form.Text className="text-muted">
          
    </Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Телефон<sup style={{color:"red"}}>*</sup></Form.Label>
      <Form.Control value={phone} onChange={(e)=> setPhone(e.target.value)} type="text" placeholder="Номер телефона" />
      <Form.Text className="text-muted">
          
      </Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="firmName">
      <Form.Label>Наименование проекта или организации<sup style={{color:"red"}}>*</sup></Form.Label>
      <Form.Control value={firmName} onChange={(e)=> setFirmName(e.target.value)} type="text" placeholder="Проект или организация" />
      <Form.Text className="text-muted">
          
      </Form.Text>
</Form.Group>

<InputGroup className="mb-3">
    <InputGroup.Text>ФИО</InputGroup.Text>
    <Form.Control aria-label="Фамилия" placeholder='Фамилия' />
    <Form.Control aria-label="Имя" placeholder='Имя' />
    <Form.Control aria-label="Отчество" placeholder='Отчество' />
</InputGroup>




    <Row>
      <Col sm={6} style={{textAlign:"left"}}>
      <LinkContainer to="/signin">
        <Button variant="link" type="button">Войти (если аккаунт уже есть)</Button>
      </LinkContainer>
      </Col>
      <Col sm={6} style={{textAlign:"right"}}>
        <Button onClick={() => createAccount()}  variant="outline-primary" type="button">Создать</Button>
      </Col>
    </Row>
    </Form>
    </Card.Body>
    </Card>

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