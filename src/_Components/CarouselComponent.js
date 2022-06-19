import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselComponent() {
    return (
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/mikrotik-1022x320.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{color:"darkblue"}}>First slide label</h3>
            <p  style={{color:"darkblue"}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/ubiquiti-1022x320.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3 style={{color:"darkblue"}}>Second slide label</h3>
            <p style={{color:"darkblue"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/zyxel_banner-1022x320.png"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3 style={{color:"darkblue"}}>Third slide label</h3>
            <p style={{color:"darkblue"}}>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default CarouselComponent;