
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import { Card, Container, Row, Col }  from 'react-bootstrap';

import Layout from '../Layout'
import { ProductCardView1 } from './PageComponents/ProductCardView1';


import  { getCategory} from '../functions/serverFunctionsForCategories';
import  { getAllProducts  } from '../functions/serverFunctionsForProducts'; 





//Количество элементов в строке
const ElementsInRow = 4;



export function CategoryPage() {

    const params = useParams();
    const  [categoryData, setCategoryData] = useState(null);
    const  [products, setProducts] = useState(null);

    //console.log({params});

    
    useEffect(() => {


        if(params.catid != null && params.catid !== undefined)
        {

            const getResp2 = getCategory(params.catid);

            getResp2.then(resp2 => {
                //console.log({resp2});
                if(resp2.success){
                    setCategoryData({
                        id: resp2.id,
                        name: resp2.name,
                        description: resp2.description
                    });
                }
              });
            
        }

    }
    ,[]);

        //получаем каталог товаров
        useEffect(() => {
        
            const resp3 = getAllProducts("d7066528-4027-4ef0-bc2a-cd8fa9a3f199")
            //console.log({resp3});

            resp3.then( result => {
                console.log({result})
                setProducts(result.paginationResult.resultList);
    
            });
        },[])

        


    return(
        <Layout>
            <Container style={{paddingTop:"10px"}}>

            {
            (categoryData != null) ?
                
                <Card>
                <Card.Body>
                    <Card.Title>{categoryData.name}</Card.Title>
                    <Card.Text>
                    {categoryData.description}
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Card>
                
            : ""

            } 

            {
                //тут публикуем продукты категории
                //разбиваем на строки и разбиваем на страницы

            }

            {

                /*(products != null) ?
                products.map((item, i) => {

                    //Теперь разбиваем на строки
                    

                    //return <ProductCardView1 key={i} name={item.name} description={item.description} id={item.id} />
                    
                })
                : ""*/
            }


            {
                (products != null) ?
                createRow(products)

                : ""
            }


            </Container>
        </Layout>
    )




}


function createRow(array) {

    console.log({array});

    let size = ElementsInRow; //размер подмассива
    let subarray = []; //массив в который будет выведен результат.
    for (let i = 0; i <Math.ceil(array.length/size); i++){
        subarray[i] = array.slice((i*size), (i*size) + size);
        return (
        <Container style={{paddingTop:"10px"}}>
        <Row>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1 name={array[i].name} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1/>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1/>
            </Col>
        </Row>
        </Container>
        );
    }

}