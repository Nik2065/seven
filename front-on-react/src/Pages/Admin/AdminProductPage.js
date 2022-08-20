import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

import { Container, Table, Button} from "react-bootstrap";

import AdminLayout from "../../AdminLayout";


export default function AdminProductPage(){

    let params = useParams();
    const  [createMode, setCreateMode] = useState(false);

    useEffect(() => {

        console.log(params.productid);
        console.log({createMode});


        if(params.productid == null || params.productid === undefined)
        {
            setCreateMode(true);
        }
    } 
    ,[]);

return(
    <AdminLayout>
        <br/>
    <Container>

    {createMode}
    {params.productid}

    <Table bordered hover>
    <tbody>
        <tr>
            <td></td>
            <td></td>
        </tr>
    </tbody>
    </Table>
        
        <Button variant="primary" >Сохранить</Button>

    </Container>
    </AdminLayout>


)

}