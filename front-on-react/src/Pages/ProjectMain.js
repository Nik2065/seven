
//import {useParams} from 'react-router-dom';

import { Card, Button, Container, CardGroup, Row, Col}  from 'react-bootstrap';

import { CollapsibleNavbar } from "./PageComponents/CollapsibleNavbar"
import {GorizontalMenu} from "./PageComponents/GorizontalMenu";

import { ControlledCarousel } from "./PageComponents/ControlledCarousel"
import { Cards } from "./PageComponents/Cards"

import { ProductsOnMainPage } from './PageComponents/ProductsOnMainPage';

import {NavbarFooter2} from "./PageComponents/NavbarFooter2"
import {NavbarMainFooter} from "./PageComponents/NavbarMainFooter"


export function ProjectMain () {
    //const params = useParams();
    
    return (
      <>
      <Container>
      <CollapsibleNavbar/>

      
      <GorizontalMenu/>
      <ControlledCarousel/>
      <Cards />
      </Container>

      <ProductsOnMainPage />

      <NavbarMainFooter/>
      <NavbarFooter2/>

      </>
    );


  }