//import React, { Component, PropTypes }  from 'react';
import React  from 'react';
import Menu from './Menu';
import BottomNavbar from './BottomNavbar';

import  PropTypes  from 'prop-types';

function MainLayout(props) {
    return (
      
      <>
      <Menu/>
      <div style={{height:"30px"}}>
      &nbsp;
      </div>

      <div style={{minHeight: "700px"}}>{props.children}</div>
      <div style={{height:"50px"}}>
      &nbsp;
      </div>
      <BottomNavbar/>
      </>
    );
  }
  

  MainLayout.propTypes = {
    children: PropTypes.node.isRequired
  }


export default MainLayout;