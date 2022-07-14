
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../Layout";



export default function ContactsPage () {

return(
<Layout>
  <br/>
<Container>
<Row>
    <Col sm={6}>
      Карта
    </Col>

    <Col sm={6}>
      Данные 
    </Col>
</Row>
</Container>


</Layout>
);


}