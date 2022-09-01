import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

import { Container, Table, Button, Form} from "react-bootstrap";

import AdminLayout from "../../AdminLayout";
import {getCategories} from "../../functions/serverFunctionsForCategories"
import  { getCharacteristics, saveProject } from "../../functions/serverFunctions"

import { createProduct, saveProduct } from "../../functions/serverFunctionsForProducts"


export default function AdminProductPage(){

    let params = useParams();
    const  [createMode, setCreateMode] = useState(false);
    const  [categories, setCategories] = useState();
    const [characteristicsList, setCharacteristicsList] = useState();

    //даннные продукта
    const  [PName, setPName] = useState("");
    const  [PDescription, setPDescription] = useState("");
    const  [PCost, setPCost] = useState(0);
    const  [category, setCategory] = useState(-1);


    /*function createInnerState() {
        let arr = [];

        additionalCharacteristic.forEach((item) => {
            arr.push({id: item.id, val: ""});
        });

        return arr;
    }*/

    /*
    function getVal(id) {
        let v = "";
        additionalCharacteristic.forEach((item) => {
            if(item.id === id)
            v = item.val
        });
    }*/


    const  [additionalCharacteristic, setAdditionalCharacteristic] = useState({});


    useEffect(() => {

        console.log(params.productid);
        console.log({createMode});


        if(params.productid == null || params.productid === undefined)
        {
            setCreateMode(true);
        }

        //
        const getResp = getCategories();

        getResp.then(resp => {
            console.log(resp.categories);

            if(resp.success){
                setCategories(resp.categories);
            }
          });
        //
        const getResp2 = getCharacteristics();

        getResp2.then(resp2 => {
            console.log({resp2});
            if(resp2.success){
                setCharacteristicsList(resp2.characteristics);
            }
          });


    }
    ,[]);


    async function HandleSaveProduct(){

        //Если создаем продукт
        if(createMode) {
            const resp = await createProduct();

        }
        else {
        //Если меняем
        const resp = await saveProject();

        }
    }




return(
    <AdminLayout>
        <br/>
    <Container>

    {
    
    (createMode) ?
    <h3>Создание товара</h3>
    : <h3>Редактирование товара #{params.productid}</h3>
    }
    


    <Form className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Наименование товара</Form.Label>
        <Form.Control type="text" placeholder="Наименование товара" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Описание товара</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Описание товара" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Цена</Form.Label>
        <Form.Control type="number"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
      <Form.Label>Категория товара</Form.Label>
      <Form.Select aria-label="Выберите основную категорию">
        
        {
            (categories != null && categories !== undefined) ? 
            categories.map((item, i) => {
                return <option key={i} value={item.id}>{item.name}</option>
            })

            : ""
        }

        </Form.Select>
      </Form.Group>

    {
        //дополнительно созданные характеристики товаров
    }
    <h6>Дополнительные характеристики</h6>

     {
      ( characteristicsList != null && characteristicsList !== undefined) ?
      characteristicsList.map((item,i) => {

        return <Form.Group key={i} className="mb-3" controlId="">
        <Form.Label>{item.сName}</Form.Label>
        <Form.Control type="text"  onChange={(e) => {
            if(additionalCharacteristic.length === 0)
            {
                additionalCharacteristic.push({
                    id: item.id,
                    val: e.target.value});
            }
            else {
                additionalCharacteristic.forEach(element => {
                    if(element.id === item.id)
                    element.val = e.target.value
                })
            }

            console.log({additionalCharacteristic});

        }}  />
        </Form.Group>


      }) : "Дополнительных характеристик еще не задано"
     }

      <Button onClick={()=> HandleSaveProduct()} variant="primary" >Сохранить</Button>

    </Form>


      
        

    </Container>
    </AdminLayout>


)

}