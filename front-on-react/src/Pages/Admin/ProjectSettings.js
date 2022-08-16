import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Form, Button, Tabs, Tab, Sonnet } from "react-bootstrap";
import AdminLayout from "../../AdminLayout";

import  { getProject, saveProject } from '../../functions/serverFunctions'




export default function ProjectSettings () {

    //идентификатор проекта
    let { pid } = useParams();
    const [key, setKey] = useState('mainSettings');
    

   
  
    //console.log({pid});


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

  //const [project, setProject] = useState({projectName:"", description:""});
 const [projectName, setProjectName] = useState("");
 const [projectDescription, setProjectDesc] = useState("");

 //получаем данные о проекте
 useEffect(()=> {
      
  const getProjectResp =  getProject(pid);

  //console.log({getProjectsResp});

  getProjectResp.then(resp => {
    //console.log({resp});

    if(resp.success){
      //setProject(resp.project);
      setProjectName(resp.project.projectName);
      setProjectDesc(resp.project.description);
    }
  });

  },[])


  const SaveProject = () => {
    const resp = saveProject(pid, projectName, projectDescription);
    //console.log({resp});

    resp.then(result => {
      console.log({result});
    })
  }



  return (
<Form className={'col-lg-6'}>
      <Form.Group className="mb-3">
        <Form.Label>Имя проекта</Form.Label>
        <Form.Control type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Краткое описание проекта</Form.Label>
        <Form.Control type="text" value={projectDescription} onChange={(e) => setProjectDesc(e.target.value)} />
      </Form.Group>
      <Button onClick={() => SaveProject("","", "")} variant="primary" type="button">
        Сохранить
      </Button>
    </Form>

  )
}