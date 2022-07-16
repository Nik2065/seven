import {useEffect, useState} from 'react';
import { Container, Card, Button} from "react-bootstrap";

import AdminLayout from "../../AdminLayout";



export default function AdminPage () {


  const [projects, setProjects] = useState([]);

  useEffect(()=> {
    //идем на сервер, скачиваем для учетки список проектов

  },[])

return(
<AdminLayout>
<br/>
<Container>

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

</Container>


</AdminLayout>
);


}