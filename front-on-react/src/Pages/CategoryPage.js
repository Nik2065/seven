
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import { Card, Container, Row, Col }  from 'react-bootstrap';

import Layout from '../Layout'
import { ProductCardView1 } from './PageComponents/ProductCardView1';

import  { getArrayOfSubArray } from '../functions/commonFunctions'
import  { getCategory} from '../functions/serverFunctionsForCategories';
import  { getAllProducts, getProductsForCategory  } from '../functions/serverFunctionsForProducts'; 
import  { getAccountId } from '../functions/serverFunctionsForProjects'


//Количество элементов в строке
const ElementsInRow = 4;



export function CategoryPage() {

    const params = useParams();

    const  [accountId, setAccountId] = useState("");
    const  [categoryData, setCategoryData] = useState(null);
    const  [products, setProducts] = useState(null);
    const  [productsByRows, setProductsByRows] = useState(null);

    //console.log({params});


    //получаем по имени проекта идентификатор аккаунта
    useEffect(() => {
        if(params.projectid != null && params.projectid !== undefined)
        {
            var id = params.projectid.replace('project', '');

            const getResp = getAccountId(id);
            getResp.then(resp => {
                
                //console.log({resp});
                if(resp.success)
                {
                    setAccountId(resp.accountId);
                    //console.log(resp.accountId);

                    getProductsForCategory(resp.accountId);
                }
            });
            


        }
        else {
            //редиректим на главную?
            window.location.replace("/");
        }

    },[])



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
    //useEffect(() => {
    //},[])


    function getProductsForCategory(accountId){

        const resp3 = getAllProducts(accountId)
        //console.log({resp3});

        resp3.then( result => {
            
            setProducts(result.paginationResult.resultList);
            
            const pbr = getArrayOfSubArray(result.paginationResult.resultList, ElementsInRow);
            setProductsByRows(pbr);
            //console.log({pbr})
        });

    }



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
                (productsByRows != null) ?
                productsByRows.map((item, i) =>{
                    return createRow(item, i);
                })
                
                : ""
            }


            </Container>
        </Layout>
    )




}





function createRow(rowArray, i) {

    //console.log({i});

    return (
    <Row key={i} >
        {
        rowArray.map((item) => {
            return <Col key={item.id} style={{paddingTop:"10px"}} xs={12} sm={6} md={6} lg={3}>
                <ProductCardView1  id={item.id} name={item.name} description={item.description} cost={item.cost} />
            </Col>
        })
        }
    </Row>)
}