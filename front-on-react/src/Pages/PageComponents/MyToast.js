import {useState} from 'react'
import { Form, ToastContainer, Toast, Row, Button, Col } from "react-bootstrap";




/*
export function MyToast() {
    //const [position, setPosition] = useState('top-start');
  
    return (
  
        <Toast>
            <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            </Toast.Header>
        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
    );
  }
*/
  

export function MyToast() {


    return (
        <ToastContainer>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small className="text-muted">2 seconds ago</small>
        </Toast.Header>
        <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
      </Toast>
    </ToastContainer>


    )

}