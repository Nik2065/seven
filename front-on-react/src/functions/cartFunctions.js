
//импортим стор


export function countCartSum(items){

    let s = 0;
    if(items != null && items !== undefined && items.length >0)
        items.forEach(item =>{s+=(item.product.cost * item.qty)});
 
    return s;
 }











//increment
/*
function AddToCart(product) {

    //console.log(product);
    //console.log(productsInCart);

    let newCartProducts = [];
    let inCart = false;
    let productQuantityPair;

    if(productsInCart!= null && productsInCart.length>0){
        productsInCart.forEach(item => {
            //если продукт уже добавлен
            if(item.product.id === product.id){
                item.qty +=1;
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
        setProductsInCart(newCartProducts);
        setCartSum(countCartSum(newCartProducts));
        setCartContext(createCartTitle(countItems(newCartProducts), countCartSum(newCartProducts)))
    }
}

//decrement 
function DeleteFromCart(product){
    //let newState = productsInCart.slice();
    let newCartProducts = [];
    let productQuantityPair;

    productsInCart.forEach(item => {
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
        setProductsInCart(newCartProducts);
        setCartSum(countCartSum(newCartProducts));
        setCartContext(countItems(newCartProducts) + ' | ' + countCartSum(newCartProducts) + ' ₽');
    }
}
*/
