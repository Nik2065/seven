import { useEffect, useState } from "react";

import { Button, Container, Table, Form, Modal, Toast  } from "react-bootstrap";
import AdminLayout from "../../AdminLayout";

//import {getAdminProductsList} from '../functions/serverFunctions'
import {getAllCatalogItems, SaveProduct} from '../../functions/serverFunctions'
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";


export default function AdminProductsListPage(){

    
    const [products, setProductsList] = useState([]);
    //модалка
    const [showModal, setShowModal] = useState(false);

    //редактирование строки
    const [editProductId, setEditProductId] = useState();
    const [editProductName, setEditProductName] = useState();
    //const [editProductName, setEditProductName] = useState();

    useEffect(()=>{
    
        //TODO: возможно добавить постраничное разбиение
        getAllCatalogItems()
        .then(result => {
            const page = result.paginationResult.resultList;
            console.log({page});
            setProductsList(page);
        })

    }, []);


    function handleEditName(v){
        setEditProductName(v);
    }


    const handleCloseModal = () => {
        setShowModal(false);
    }



    return(

        

        <AdminLayout>
            
        {
            
            products !== undefined ?
        <Container>
            <br/>
            
        <Table bordered hover>
            <tbody>
            {
                products.map((item,i)=> {

                    if(item.id === editProductId)
                    return <tr key={i}>    
                    <td>{item.id}</td>
                    <td>
                        <Form.Control onChange={(e)=>handleEditName(e.target.value)} value={editProductName} type="text" />
                    </td>
                    <td>
                        <Form.Control value={item.description} type="text" />
                    </td>
                    <td>
                        <Form.Control value={item.cost} type="text" />
                    </td>
                    <td>
                        <AiOutlineEdit onClick={() => setEditProductId(item.id)}/>
                    </td>
                    <td>
                        <AiOutlineSave onClick={() => {
                            //отправляем данные на сервер
                            const p = {
                                id: editProductId,
                                name: editProductName,
                                description: item.description,
                                cost: item.cost
                            }
                            SaveProduct(p)
                            .then((saveResult) => {
                                if(saveResult.success){
                                    setShowModal(true);
                                    
                                    //меняем измененный продукт в массиве продуктов
                                    let newProducts = products.slice();
                                    newProducts.forEach((item, i )=> {
                                        if(item.id === editProductId) {
                                            newProducts[i] = p;
                                        }
                                    })
                                    setProductsList(newProducts);
                                    setEditProductId(undefined);//сбрасываем строку редактирования

                                }
                            })
                            
                            
                        }}/>
                    </td>
                    </tr>

                    else 
                    return <tr key={i}>    
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.cost}</td>
                    <td>
                        <AiOutlineEdit onClick={
                            () => {
                                setEditProductId(item.id);
                                setEditProductName(item.name);
                            }
                            }/>
                    </td>
                    <td>
                        <AiOutlineSave/>
                    </td>
                    </tr>
                })
            }
                
            </tbody>
        </Table>
            {'редактируем строку:' + editProductId}
            <div style={{textAlign:"right"}}>
                <Button onClick={()=> setEditProductId(undefined) } variant="secondary">Сбросить редактирование</Button>
            </div>
        </Container>
          : ""
        }

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{'Описание продукта сохранено!'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Закрыть</Button>
        </Modal.Footer>
        </Modal>
        </AdminLayout>
    );
}