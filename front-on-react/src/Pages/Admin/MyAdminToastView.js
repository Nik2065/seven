import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'

import {ToastContainer, Toast, Button} from "react-bootstrap";

import notificationStore from '../../NotificationStore';



const MyAdminToastView = observer((props) => {

    //const {currentProduct} = props;
    //const productCount = mainStore.getProductCount(currentProduct.id);

    //const {notificationsState} = props;

    //const notifications = notificationStore.getNotifications();


    //const [notifications, setNotifications] = useState();


    //читаем данные из стора
    /*useEffect(()=>{

        const n = notificationStore.getNotifications();
        setNotifications(n);

    }, []);*/



    return (
      <>
          {/*
          <Button onClick={() => {

            const a100 = notificationStore.getCount();
            console.log({a100});

            }}>show</Button>
          */}


        <ToastContainer position="top-end" className="p-3" style={{zIndex: "2"}}>
            {

                (notificationStore.notifications != null) ?
                notificationStore.notifications.map((item,i) => {
                    return (<Toast onClose={() => notificationStore.deleteNotification(item.id)}>
                    <Toast.Header >
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">{item.title}</strong>
                    <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>
                      {item.body}
                      <br/>
                      {item.id}
                    </Toast.Body>
                    </Toast>)
                    
                })
                : ""
            }


            {
                /*

            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this. </Toast.Body>
            </Toast>



            
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
            <Toast>
            <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>*/
            }

            </ToastContainer>
            </>
    )

})



export default MyAdminToastView