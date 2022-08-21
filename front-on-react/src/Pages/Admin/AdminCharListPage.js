import { useEffect, useState } from "react";
import { Container, Table, Button, Form} from "react-bootstrap";
import  { getCharacteristics, createCharacteristic } from "../../functions/serverFunctions"


import AdminLayout from "../../AdminLayout";
import { IoMdAddCircleOutline } from "react-icons/io";

import Modal from 'react-bootstrap/Modal'


//Список характеристика для данного проекта
//
export default function AdminCharListPage(){

    const [characteristicsList, setCharacteristicsList] = useState();
    //для модального окна
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleSave = () => {

    }

    const [CName, setCName] = useState("");
    const [CDescription, setCDescription] = useState("");
    //




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
            <div style={{textAlign:"right", paddingBottom:"10px"}}>
            <Button onClick={() => setShowModal(true)}><IoMdAddCircleOutline/> Добавить характеристику</Button>
            </div>
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

        <Modal show={showModal} >
            <Modal.Header closeButton>
            <Modal.Title>Создание характеристики</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3" controlId="input1">
                    <Form.Label>Наименование характеристики</Form.Label>
                    <Form.Control onChange={(e) => setCName(e.target.value)} value={CName} type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="textarea1">
                    <Form.Label>Описание характеристики</Form.Label>
                    <Form.Control onChange={(e) => setCDescription(e.target.value)} value={CDescription} as="textarea" rows={3} />
                </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>

            <Button variant="primary" onClick={handleSave}>
                Сохранить
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            </Modal.Footer>
        </Modal>

        </AdminLayout>
    );

}


