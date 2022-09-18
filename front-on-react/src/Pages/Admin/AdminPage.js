import {useEffect, useState} from 'react';
import { Container, Card, Row, Col} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import AdminLayout from "../../AdminLayout";

import { getProjects } from '../../functions/serverFunctionsForProjects'
import { getArrayOfSubArray } from '../../functions/commonFunctions'

import { ProjectCardView1 } from '../PageComponents/ProjectCardView1'



//Количество элементов в строке
const ElementsInRow = 4;

export default function AdminPage () {


  const [projects, setProjects] = useState([]);
  const [projectsByRows, setProjectsByRows] = useState(null);


  useEffect(()=> {
    //идем на сервер, скачиваем для учетки список проектов
    const getProjectsResp = getProjects();

    //console.log({getProjectsResp});

    getProjectsResp.then(resp => {
      //console.log({resp});

      if(resp.success){
        setProjects(resp.projects);
        const pbr = getArrayOfSubArray(resp.projects, ElementsInRow);
        setProjectsByRows(pbr);
      }
    });


  },[])

  
return(
<AdminLayout>
<br/>
<Container style={{paddingTop:"10px"}}>

<Card>
  <Card.Body>
  <Card.Title>Список проектов</Card.Title>
  <Card.Text>
                   
  </Card.Text>
  <LinkContainer to={"/admin/addproject/"} >
  <Card.Link>Добавить проект</Card.Link>
  </LinkContainer>
  <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>



{
  (projectsByRows != null) ?
  projectsByRows.map((item, i) =>{
      return createRow(item, i);
  })
  
  : ""
}

</Container>


</AdminLayout>
);


}


function createRow(rowArray, i) {

  

  return (
  <Row key={i} >
      {
      rowArray.map((item) => {
          
          //console.log({item});

          return <Col key={item.id} style={{paddingTop:"10px"}} xs={12} sm={6} md={6} lg={3}>
              <ProjectCardView1  id={item.id} name={item.projectName} description={item.description} cost={item.cost} />
          </Col>
      })
      }
  </Row>)
}

