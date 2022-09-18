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


export function ProjectMain () {
    
  const [projectId, setProjectId] = useState(null);

  let { projectid } = useParams();
  const pId = projectid.replace('project', '');

  if(projectid == null || projectid === undefined)
  {
    //redirect
    window.location.replace('/')
  }


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

      <CollapsibleNavbar />
      
        
      
      <GorizontalMenu pId={pId}/>
      <ControlledCarousel pId={pId} />
      <Cards />
      
      
      </Container>

      <ProductsOnMainPage />
        

      
      <NavbarMainFooter/>
      <NavbarFooter2/>

      </>
    );


  }