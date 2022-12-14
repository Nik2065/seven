import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite'

import {ToastContainer, Toast, Button} from "react-bootstrap";

import notificationStore from '../../NotificationStore';



import { BsExclamationTriangleFill, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

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


    const [date, setDate] = useState(new Date());


    //TODO:
    //const timeToDeleteInMinutes = 3;

    
    function refreshClock() {
      setDate(new Date());
    }

    useEffect(() => {
      
      const timerId = setInterval(refreshClock, 5000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
   

    function calcTime(created){

      let result = "";
      const nowDt =  new Date();
      const seconds = parseInt((nowDt - created)/1000);
      console.log({seconds});
      if(seconds < 10)
        result = "Только что";
      else if(seconds >= 10 && seconds <60) {
        result = seconds + " сек. назад"
      }
      else if(seconds >= 60){
        const a = parseInt(seconds/60);
        result = a + " мин. назад";
      }

      return result;
    }


    function GetIcon(type){
      if(type === 1)
        return <BsCheckCircleFill style={{color:"green"}}/>
  
      else if(type === 2)
        return <BsExclamationTriangleFill style={{color:"orange"}}/>

      else if (type === 3) 
         return <BsXCircleFill style={{color:"tomato"}}/>
      else      
       return "";
    }

    return (
      <>

        <ToastContainer position="top-end" className="p-3" style={{zIndex: "2"}}>
            {

                (notificationStore.notifications != null) ?
                notificationStore.notifications.map((item,i) => {
                    return (<Toast key={item.id} onClose={() => notificationStore.deleteNotification(item.id)}>
                    <Toast.Header >
                    {/*<img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />*/}
                    
                    
                    {GetIcon(item.type)}
                    
                    
                    <strong className="me-auto">{item.title}</strong>
                    <small className="text-muted">{calcTime(item.created)}</small>
                    &nbsp; 
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
            </Toast>*/
            }

            </ToastContainer>
            </>
    )

})



export default MyAdminToastView