const baseUrl = 'http://localhost:49153';


export async function getCartBySessionId(sessionId) {
    const url = baseUrl + '/Cart/GetCartBySessionId?sessionId=' + sessionId;

    const resp = await fetch(url);
    const res = await resp.json();
    
    return res;

}

export async function getAllCatalogItems(){
    const url = baseUrl + '/Catalog/GetAllCatalogItems';

    const resp = await fetch(url);
    const res = await resp.json();
    return res;
}


export async function setProductsInCartOnServer(productQuantityPair, localSessionId){
    const url = 'http://localhost:49153/Cart/ChangeCartProductQuantity';

    console.log({productQuantityPair});

    let request = {
        SessionId: localSessionId,
        ProductId: productQuantityPair.product.id,
        NewQuantity: productQuantityPair.qty
    };
    
    
    console.log({request});

    const response = await fetch(url, {
        method:"POST", 
        body: JSON.stringify(request),
        //body: request,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });

    const result = await response.json();
    console.log(result);

    if(result.success){
        //все хорошо
        return true;
    }
    else {
        //все плохо
        return false;
    }

}



export async function createOrderFromCartOnServerSide(obj){
    //let orderCreated = false;

    const url= baseUrl + '/Orders/CreateOrder';


    const resp = await fetch(url, {
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });

    const result = await resp.json();

    

    return result;
}


export async function getProduct(productId) {

    const url= baseUrl + '/Catalog/GetProduct?productId=' + productId;
    const resp = await fetch(url);
    const obj = await resp.json();
    const p = await obj.product;
    //console.log()
    return p;
}