import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Alert, Modal} from "react-bootstrap";

//icons
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
//inner components
import AdminLayout from "../../AdminLayout";
import {getCategories, createCategory, deleteCategory} from "../../functions/serverFunctionsForCategories"



//Список категорий для данного проекта
//
export default function AdminCategoriesListPage(){
    
    
    const [categoriesList, setCategoriesList] = useState();
    const [CategoryName, setCategoryName] = useState("");
    const [CategoryDescription, setCategoryDescription] = useState("");

    const [alertData, setAlertData] = useState({text: "", variant:""})
    const [alertShow, setAlertShow] = useState(false);


    const updateCategories = () =>{
        const getResp = getCategories();

        getResp.then(resp => {
            console.log({resp});
            if(resp.success){
                setCategoriesList(resp.categories);
            }
          });
    }

    useEffect(() => {
        updateCategories();
    } 
    ,[]);

    //для модального окна
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    async function handleSave () {
        const resp = await createCategory(CategoryName, CategoryDescription);
        if(resp.success){
            setAlertData({variant:"success", text: resp.message});
        }
        else {
            setAlertData({variant:"danger", text: resp.message});
        }

        setAlertShow(true);
        updateCategories();
    }

    async function handleDelete (id) {
        const resp = await deleteCategory(id);
        if(resp.success){
            //setAlertData({variant:"success", text: resp.message});
        }
        else {
            //setAlertData({variant:"danger", text: resp.message});
        }

        //setAlertShow(true);
        alert(resp.message);
        updateCategories();
    }


    return(
        <AdminLayout>
             <br/>
        <Container>
            <div style={{textAlign:"right", paddingBottom:"10px"}}>
            <Button onClick={() => setShowModal(true)}><IoMdAddCircleOutline/> Добавить категорию</Button>
            </div>
            <Table bordered>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Наименование категории</th>
                        <th>Описание категории</th>
                        <th>Дата добавления</th>
                        <th></th>
                    </tr>
                </thead>
                
            <tbody>
        {
            (categoriesList !== undefined && categoriesList.length>0) ? 

            categoriesList.map((ch, i)=>{
            return(
            
            <tr key={i}>
                <td>{ch.id}</td>
                <td>{ch.name}</td>
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
            <Modal.Title>Создание категории</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3" controlId="input1">
                    <Form.Label>Наименование категории</Form.Label>
                    <Form.Control onChange={(e) => setCategoryName(e.target.value)} value={CategoryName} type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="textarea1">
                    <Form.Label>Описание категории</Form.Label>
                    <Form.Control onChange={(e) => setCategoryDescription(e.target.value)} value={CategoryDescription} as="textarea" rows={3} />
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
    )

}