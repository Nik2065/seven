import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { GetCarouselSettings } from '../../functions/serverFunctionsForProjects';



export function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);
  const { componentId } = props;

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  useEffect(()=> {
    const getResp = GetCarouselSettings(componentId);
    getResp.then(resp =>{
      console.log({resp})

    })

  }
  ,[])



  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../../img/carousel_images/img800-300.jpg')}
          alt="First slide"
          height="300px"
        />
        
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../../img/carousel-1.jpg')}
          alt="Second slide"
          height="300px"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../../img/carousel-1.jpg')}
          alt="Third slide"
          height="300px"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}