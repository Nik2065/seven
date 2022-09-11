import { useEffect, useState } from "react";
import { Navbar, Nav, Container}  from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import { getPublicCategories } from "../../functions/serverFunctionsForCategories"





//
// Меню для отображения категорий
//
export function GorizontalMenu() {

  const [categoriesList, setCategoriesList] = useState();


      const updateCategories = () =>{
        const getResp = getPublicCategories('d7066528-4027-4ef0-bc2a-cd8fa9a3f199');

        getResp.then(resp => {
            console.log({resp});
            if(resp.success){
                setCategoriesList(resp.categories);
            }
          });
    }

    //загружаем категории
      useEffect(() => {
        updateCategories();
      }   
     ,[]);


    return (
        <>
        <Navbar bg="light" variant="light">
        <Container>
          <Nav >
            {
                  (categoriesList !== undefined && categoriesList.length>0) ? 
                   categoriesList.map((ch, i)=>{
                   return(
                        <>
                          <LinkContainer to={"/category/" + ch.id}><Nav.Link>{ch.name}</Nav.Link></LinkContainer>
                          &nbsp;
                        </>
                        )
                  }) : ""
            }
          </Nav>
        </Container>
      </Navbar>
        </>

    );


}