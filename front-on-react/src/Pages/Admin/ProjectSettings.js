import {useState} from 'react';
import { useParams } from 'react-router-dom';

import { Container, Form, Button, Tabs, Tab, Sonnet } from "react-bootstrap";
import AdminLayout from "../../AdminLayout";





export default function ProjectSettings () {

    //идентификатор проекта
    let { pid } = useParams();
  

    //получаем данные о проекте

    const [key, setKey] = useState('mainSettings');
    console.log({pid});


    return (
    <AdminLayout>
      <br/>
    <Container>
    <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="mainSettings" title="Основные настройки">
            {
            //Номер проекта:{pid}
            }
            
            {ProjectSettingsForm(pid)}
          </Tab>
          <Tab eventKey="title" title="Заголовок страницы">
            Варианты заголовка страницы:
            
          </Tab>
          <Tab eventKey="products" title="Каталог товаров">
          Some text 2
          </Tab>
          <Tab eventKey="article" title="Описание">
          Some text 3
          </Tab>
          <Tab eventKey="contact" title="Данные организации">
          Some text 4
          </Tab>
        </Tabs>

    </Container>


    </AdminLayout>
  );


}




function ProjectSettingsForm(pid){

  return (
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

  )
}