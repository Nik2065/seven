import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Alert} from "react-bootstrap";
import  { getCharacteristics, createCharacteristic, deleteCharacteristic } from "../../functions/serverFunctions"


import AdminLayout from "../../AdminLayout";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-bootstrap/Modal'


//Список характеристика для данного проекта
//
export default function AdminCharListPage(){

    const [characteristicsList, setCharacteristicsList] = useState();
    //для модального окна
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    async function handleSave () {
        const resp = await createCharacteristic(CName, CDescription);
        if(resp.success){
            setAlertData({variant:"success", text: resp.message});
        }
        else {
            setAlertData({variant:"danger", text: resp.message});
        }

        setAlertShow(true);
        updateCharacteristics();
    }

    async function handleDelete (id) {
        const resp = await deleteCharacteristic(id);
        if(resp.success){
            //setAlertData({variant:"success", text: resp.message});
        }
        else {
            //setAlertData({variant:"danger", text: resp.message});
        }

        //setAlertShow(true);
        alert(resp.message);
        updateCharacteristics();
    }

    const [CName, setCName] = useState("");
    const [CDescription, setCDescription] = useState("");

    const [alertData, setAlertData] = useState({text: "", variant:""})
    const [alertShow, setAlertShow] = useState(false);
    //

    const updateCharacteristics = () =>{
        const getResp = getCharacteristics();

        getResp.then(resp => {
            console.log({resp});
            if(resp.success){
                setCharacteristicsList(resp.characteristics);
            }
          });
    }


    useEffect(() => {
        updateCharacteristics();
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
                        <th>Описание характеристики</th>
                        <th>Дата добавления</th>
                        <th></th>
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
                <td>{ch.description}</td>
                <td>{ch.created}</td>
                <td>
                    <Button onClick={() => handleDelete(ch.id)}>
                    <MdDeleteOutline/>
                    </Button>
                </td>
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
            <br/>
            </Modal.Footer>

            <div>
            <Alert key={1} variant={alertData.variant} dismissible onClose={() => setAlertShow(false)} show={alertShow} >
                {alertData.text}
            </Alert>
            </div>
        </Modal>

        </AdminLayout>
    );

}


