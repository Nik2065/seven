import { useEffect, useState } from "react";
import { Container, Table, Button} from "react-bootstrap";
import  { getCharacteristics } from "../../functions/serverFunctions"

import AdminLayout from "../../AdminLayout";

//Список характеристика для данного проекта
//
export default function AdminCharListPage(){

    const [characteristicsList, setCharacteristicsList] = useState();

    useEffect(() => {
        
        const getResp = getCharacteristics();

        getResp.then(resp => {
            console.log({resp});
            if(resp.success){
                setCharacteristicsList(resp.characteristics);
            }
          });
    } 
    ,[]);
    

    return(
        <AdminLayout>
        <br/>
        <Container>
            <Table bordered>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Наименование характеристики</th>
                        <th>Дата добавления</th>
                    </tr>
                </thead>
                
            <tbody>
        {
            (characteristicsList !== undefined && characteristicsList.length>0) ? 

        characteristicsList.map((ch, i)=>{
            return(
            
            <tr key={i}>
                <td>{ch.id}</td>
                <td>{ch.сName}</td>
                <td>{ch.created}</td>
            </tr>
            
            )
        }) : ""

        }
        </tbody>
        </Table>
        </Container>
        </AdminLayout>
    );

}