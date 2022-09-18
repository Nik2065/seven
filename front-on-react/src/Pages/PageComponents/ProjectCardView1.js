
import { Card,  Button }  from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import {RiSettings3Line} from 'react-icons/ri'
//import { BsCartFill, BsPlusSquare} from "react-icons/bs";


export function ProjectCardView1(project) {


    //console.log({project});


    return (

        <Card>

        <RiSettings3Line style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "40px", height:"40px", paddingTop:"10px" }}  />

        <Card.Body>
            <Card.Title>{project.name}</Card.Title>
            <Card.Text>
            {project.description}
            </Card.Text>
            
            <LinkContainer to={"/admin/project/" + project.id} >
                <Button variant="link">Настройки</Button>
            </LinkContainer>

            <LinkContainer to={"/project" + project.id} >
                <Button variant="link">Сайт</Button>
            </LinkContainer>

        </Card.Body>
        </Card>
    );


}


