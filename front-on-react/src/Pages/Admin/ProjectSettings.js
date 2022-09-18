import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Form, Button, Tabs, Tab, InputGroup, Alert,Col,Row } from "react-bootstrap";
import AdminLayout from "../../AdminLayout";



import  { getProject, saveProject, createProject } from '../../functions/serverFunctionsForProjects'




export default function ProjectSettings () {

    //идентификатор проекта
    let { pid } = useParams();
    const [key, setKey] = useState('mainSettings');
    const  [createMode, setCreateMode] = useState(false);

    /*if(pid == null || pid === undefined)
    {
        setCreateMode(true);
    }*/
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
            
            {
              ProjectSettingsForm(pid)
            }
          </Tab>
          <Tab eventKey="title" title="Заголовок страницы">
            Варианты заголовка страницы:
            
          </Tab>

          <Tab eventKey="productsPageSettings" title="Настройки каталога товаров">
          


            <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="8">
              Отображать каталог продуктов
              </Form.Label>
              <Col sm="4">
              <Form.Check type="checkbox" id="checkbox" label="" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="8">
                Порядок отображения секции на сайте
              </Form.Label>
              <Col sm="4">
                  <Form.Select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  </Form.Select>
              </Col>
            </Form.Group>
          </Form>



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
 const [alertShow, setAlertShow] = useState(false);
 const [alertData, setAlertData] = useState({text:"", variant:""});



 //получаем данные о проекте
 useEffect(()=> {
  
  if(pid != null && pid !== undefined){
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
    }


  },[])


  const SaveProject = () => {

    if(pid === undefined || pid == null)
    {
        //создаем
        const resp = createProject(projectName, projectDescription);

        resp.then(result => {
          console.log({result});
          setAlertShow(true);
          

          if(result.success){
            setAlertData({text:result.message, variant:"success"})
          }
          else {
            setAlertData({text:result.message, variant:"danger"})
          }
          
        })

    }
    else {
        //сохраняем
        const resp = saveProject(pid, projectName, projectDescription);
        //console.log({resp});
        

        resp.then(result => {
          console.log({result});
          setAlertShow(true);
          

          if(result.success){
            setAlertData({text:result.message, variant:"success"})
          }
          else {
            setAlertData({text:result.message, variant:"danger"})
          }
          
        })
      }
  }



  return (
<Form className={'col-lg-6'}>
      <Form.Group className="mb-3">
        <Form.Label>Имя проекта</Form.Label>
        <Form.Control type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <Form.Text className="text-muted">
          Имя должно быть не короче пяти символов
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Краткое описание проекта</Form.Label>
        <Form.Control type="text" value={projectDescription} onChange={(e) => setProjectDesc(e.target.value)} />
      </Form.Group>
      
      <Button onClick={() => SaveProject("","", "")} variant="primary" type="button">
        Сохранить
      </Button>
      
      <Form.Group className="" style={{paddingTop:"10px"}}  >
        <Alert key={1} variant={alertData.variant} dismissible onClose={() => setAlertShow(false)} show={alertShow} >{alertData.text}</Alert>
      </Form.Group>

    </Form>

  )
}