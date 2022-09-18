import { useEffect, useState } from "react";
import { Navbar, Nav, Container}  from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import { getPublicCategories } from "../../functions/serverFunctionsForCategories"





//
// Меню для отображения категорий
//
export function GorizontalMenu(props) {

  const [categoriesList, setCategoriesList] = useState();

  

  const { pId } = props;

  console.log({pId});

      const updateCategories = () =>{
        if(pId != null && pId !== ""){
          const getResp = getPublicCategories(pId);

          getResp.then(resp => {
              console.log({resp});
              if(resp.success){
                  setCategoriesList(resp.categories);
              }
            });
        }
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