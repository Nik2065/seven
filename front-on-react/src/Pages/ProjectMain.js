import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Button, Container, CardGroup, Row, Col}  from 'react-bootstrap';

import { CollapsibleNavbar } from "./PageComponents/CollapsibleNavbar"
import {GorizontalMenu} from "./PageComponents/GorizontalMenu";

import { ControlledCarousel } from "./PageComponents/ControlledCarousel"
import { Cards } from "./PageComponents/Cards"

import { ProductsOnMainPage } from './PageComponents/ProductsOnMainPage';

import {NavbarFooter2} from "./PageComponents/NavbarFooter2"
import {NavbarMainFooter} from "./PageComponents/NavbarMainFooter"

import { GetProjectPageComponents } from "../functions/serverFunctionsForProjects"

export function ProjectMain () {
    
  const [projectId, setProjectId] = useState(null);
  const [headerSettings, setHeaderSettings] = useState(null);
  const [footerSettings, setFooterSettings] = useState(null);
  const [pageComponentsList, setPageComponentsList]= useState([]);

  let { projectid } = useParams();
  const pId = projectid.replace('project', '');



  if(projectid == null || projectid === undefined)
  {
    //redirect
    window.location.replace('/')
  }

  //читаем настройки проекта
  useEffect(() => {
    //ReadProjectPageComponents(pId)

    const getResp = GetProjectPageComponents(pId);
    console.log({getResp});
    getResp.then(result1 => {
        console.log({result1});
        if(result1.success) {
          setHeaderSettings(result1.headerComponent);
          setFooterSettings(result1.footerComponent);

          setPageComponentsList(result1.bodyPageComponents);
        }
        else {
          //TODO: выводим ошибку
        }
      });

  }
  ,[]);


//
// Страница отображения проекта
//

/*function ReadProjectPageComponents(pId){
  //читае настройки, записываем нужное в стэйт  
  const getResp = GetProjectPageComponents(pId);

  console.log({getResp});

  getResp.then(result1 => {
      
      console.log(result1);

    });

  }*/

    /*useEffect(() => {
      if(projectid == null || projectid === undefined)
      {
        //redirect
        window.location.replace('/')
      }
      else {
        const p = projectid.replace('project', '');
        //console.log({p});

        setProjectId(p);
      }
    } 
    ,[]);*/

 



    return (
      <>
      <Container>
       

      {
        (headerSettings != null && headerSettings.visible) ?
        <CollapsibleNavbar />
        : ""
      }
      
      
      {
        //цикл по компонентам страницы

        pageComponentsList.map((item, i) => {
          if(item.componentGroupId === 2) {
              //карусель
              return <>
                <ControlledCarousel componentId={item.componentId} />
              </>
          }
          else if(item.componentGroupId === 3) {
              //меню
              return <>
                <GorizontalMenu pId={pId}/>
              </>
          }
          else {
            return <></>
          }
        })


      }
      
      

      


      <Cards />
      
      
      </Container>

      <ProductsOnMainPage />
        

      {
        (footerSettings != null && footerSettings.visible) ?
        <>
        <NavbarMainFooter/>
        <NavbarFooter2/>
        </>
        : ""
      }


      </>
    );


  }