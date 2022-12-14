import { makeAutoObservable, observable, action, computed} from 'mobx'



class NotificationStore {


    constructor() {
        makeAutoObservable(this, {
            notifications: observable,
            //createNotification: action,
            //getNotifications: action
        }
        )

        //this.productsInCart = productsInCart
    }


    //список уведомлений
    notifications = [];


    /*count = 0;

    plus(){
        this.count++;
    }

    minus(){
        this.count--;
    }*/



    //структура уведомления = 
    //{
    //  title: "some title",
    //  body: "some body",
    //  id: someguid,
    //  created:  //время создания уведомления
    //  type: 1 - success, 2 - warn, 3 - error
    //}


    //опубликовать уведомление
    createNotification(notificationData){

        notificationData.created = Date.now();

        //const a = notificationData;
        console.log({notificationData});


        //const b = this.notifications;
        //console.log({b});

        const newArr = []
        
        this.notifications.forEach(element => {
            newArr.push(element);
        });
        
        newArr.push(notificationData);

        this.notifications = newArr;

    }


    deleteNotification(guid){

        const newArr = [];
        this.notifications.forEach(element => {
            if(element.id !== guid){
            newArr.push(element);
            }
        });

        this.notifications = newArr;
    }


    //Получить все не уничтоженные уведомления
    getNotifications(){
        return this.notifications;
    }

    
    /*
    getCount(){
        return this.count;
    }


    increase(){
        this.count++;
    }*/

    /*

    increase() {
        this.cnt++
    }

    decrease() {
        this.cnt--
    }


    reset() {
        this.cnt = 0
    }
    */
}


const notificationStore = new NotificationStore()
export default notificationStore



/*
function createCartTitle(cout, sum){
    return  cout + ' | ' + sum + ' ₽'
}


function countItems(items){
    let s = 0;
    if(items != null && items !== undefined && items.length >0)
        items.forEach(item =>{s+= item.qty});
 
    return s;
}

function countCartSum(items){

    let s = 0;
    if(items != null && items !== undefined && items.length >0)
        items.forEach(item =>{s+=(item.product.cost * item.qty)});
 
    return s;
 }
 
 */



