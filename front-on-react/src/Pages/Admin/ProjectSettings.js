import {useState} from 'react';
import { useParams } from 'react-router-dom';

import { Container, Row, Col, Table, Tabs, Tab, Sonnet } from "react-bootstrap";

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
            Номер проекта:{pid}
            
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