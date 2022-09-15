import { makeAutoObservable, observable, action, computed} from 'mobx'

import {getLocalSessionId} from "./functions/commonFunctions"
import { setProductsInCartOnServer } from "./functions/serverFunctions"


class MainStore {


    constructor() {
        makeAutoObservable(this, {
            productsInCart: observable,
            cartTitle: observable,
            cartCount: observable,
            cartSum: observable,
            getProductCount: observable,
            setCartItems: action,
            addToCart: action,
            deleteFromCart: action
        })

        //this.productsInCart = productsInCart
    }



    //для теста
    cnt = 0;
    
    //Заголовок для компонента "корзина"
    cartTitle = "";
    
    //Сумма стоимостей элементов в корзине
    cartSum = 0;
    //Количество элементов в корзине
    cartCount = 0;

    //cartProducts = [];
    productsInCart = [];




    /*setCartTitle(val) {
        this.cartTitle = val;
    }*/

    /*setCartSum(val){
        this.cartSum = val;
    }*/

    /*setCartCount(val){
        this.cartCount = val;
    }*/


    getProductCount(productId) {
        let cnt = 0;

        //console.log("productId:" + productId);
        //console.log(this.productsInCart);

        if(this.productsInCart != null && this.productsInCart !== undefined){


            this.productsInCart.forEach(item => {
                //console.log({item});

                if(item.product.id === productId){
                    cnt = item.qty;
                    return cnt;
                }
            })
        }

        return cnt;
    }


    setCartItems(cartItems) {

        //console.log({cartItems})


        this.productsInCart = cartItems;
        //this.setCartTitle("sds")

        this.cartCount = countItems(cartItems);
        this.cartSum = countCartSum(cartItems);

        const title = createCartTitle(this.cartCount, this.cartSum);
        this.cartTitle = title;
        
    }

     
    /*countItems(items){
        let s = 0;
        if(items != null && items !== undefined && items.length >0)
            items.forEach(item =>{s+= item.qty});
    
        return s;
    }*/

    /*countCartSum(items){

        let s = 0;
        if(items != null && items !== undefined && items.length >0)
            items.forEach(item =>{s+=(item.product.cost * item.qty)});
     
        return s;
     }*/


    deleteFromCart(product) {
        let newCartProducts = [];
        let productQuantityPair;
    
        this.productsInCart.forEach(item => {
            if(item.product.id === product.id){
                if(item.qty === 1) {
                    //собираемся удалить единственный продует
                    //просто не добавляем его в массив
                    //игнор
                    item.qty=0;
                    productQuantityPair = item;
                }
                else{
                    //добавляем с уменьшиным кол-вом элементов
                    item.qty -=1;
                    productQuantityPair = item;
                    newCartProducts.push(item);
                }
            }
            else{
                //newState.push({qty:1, product: product})
                newCartProducts.push(item);
                productQuantityPair = item;
            }
        })
    
        console.log(productQuantityPair);
    
        //отправляем данные на сервер
        if(setProductsInCartOnServer(productQuantityPair, getLocalSessionId())){
            this.setCartItems(newCartProducts);
            //setProductsInCart(newCartProducts);
            //setCartSum(countCartSum(newCartProducts));
            //setCartContext(countItems(newCartProducts) + ' | ' + countCartSum(newCartProducts) + ' ₽');
        }
    }

    

    addToCart(product) {

        console.log("addProduct");
        console.log(product);


        let newCartProducts = [];
        let inCart = false;
        let productQuantityPair;

        if(this.productsInCart!= null && this.productsInCart.length>0){
            this.productsInCart.forEach(item => {

                //console.log({item});

                //если продукт уже добавлен
                if(item.product.id === product.id){
                    item.qty=item.qty + 1;
                    newCartProducts.push(item);
                    productQuantityPair = item;
                    inCart = true;
                }
                else {
                    productQuantityPair = item;
                    newCartProducts.push(item);
                }
            })
        }

        if(!inCart){
            productQuantityPair = {qty:1, product:product};
            newCartProducts.push(productQuantityPair);
        }

        //отправляем данные на сервер
        if(setProductsInCartOnServer(productQuantityPair, getLocalSessionId())){
            this.setCartItems(newCartProducts);
            //console.log("отправили успешно")
            //this.productsInCart = newCartProducts;
        }

    }





    increase() {
        this.cnt++
    }

    decrease() {
        this.cnt--
    }


    reset() {
        this.cnt = 0
    }
}


const mainStore = new MainStore()
export default mainStore


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
 



