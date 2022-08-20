import {useEffect, useState} from 'react';
import { Container, Card, Button} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import AdminLayout from "../../AdminLayout";

import {getProjects} from '../../functions/serverFunctions'


export default function AdminPage () {


  const [projects, setProjects] = useState([]);

  useEffect(()=> {
    //идем на сервер, скачиваем для учетки список проектов
    const getProjectsResp = getProjects();

    //console.log({getProjectsResp});

    getProjectsResp.then(resp => {
      console.log({resp});
      if(resp.success){
        setProjects(resp.projects);
      }
    });


  },[])

  
return(
<AdminLayout>
<br/>
<Container>

{/*
<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>The one project</Card.Title>
        <Card.Text>
          Some project description
        </Card.Text>
        <Button variant="primary">Перейти к настройкам</Button>
      </Card.Body>
    </Card>
*/}

{
  (projects !== undefined && projects.length>0) ? 
  projects.map((project, i)=>{ 
    return <Card key={i} style={{ width: '18rem' }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{project.projectName}</Card.Title>
        <Card.Text>
          {project.description}
        </Card.Text>
        <LinkContainer to={"/admin/project/" + project.id} >
        <Button variant="primary">Настройки</Button>
        </LinkContainer>
      </Card.Body>
  </Card>
    }) : ""
}

</Container>


</AdminLayout>
);


}