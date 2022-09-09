
import {baseUrl, frontBaseUrl, loginPage, getAuthHeader, redirectToLoginPage } from './auth.js'



//
//TODO: добавить паджинацию
//
export async function getAllProducts(accountId){
    const url = baseUrl + '/Products/GetAllProducts/';
    
    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const obj = {
        AccountId: accountId
    }

    const resp = await fetch(url, {
        method:'POST',
        body: JSON.stringify(obj),
        headers: h1,
    });

    const res = await resp.json();
    return res;
}


//
//TODO: добавить паджинацию
//
export async function getProductsForCategory(accountId, catId) {
    const url= baseUrl + '/Products/GetAllProducts/' + accountId + "/" + catId;
    const resp = await fetch(url);
    const obj = await resp.json();
    const p = await obj.product;
    //console.log()
    return p;

}


export async function getProduct(productId) {

    const url= baseUrl + '/Products/GetProduct?productId=' + productId;
    const resp = await fetch(url);
    const obj = await resp.json();
    const p = await obj.product;
    //console.log()
    return p;
}



export async function saveProduct(product) {
    const url= baseUrl + '/Products/SaveProduct';


    const obj = {
        id: product.id,
        name: product.name,
        description: product.description,
        cost: product.cost
    };

    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

    const resp = await fetch(url, {
        method:'POST',
        body: JSON.stringify(obj),
        headers: h,
    });
    const resp2 = await resp.json();
    console.log(resp2);

    //const p = await resp2;
    //console.log()
    return resp2;
}


//
//Сорздание продукта
//
export async function createProduct(data) {
    const url= baseUrl + '/Products/CreateProduct';




    let values = [];

    if(data.characteristics != null){
        data.characteristics.forEach(element => {
         
        });
    }

    
    const obj = {
        name: data.name,
        description: data.description,
        cost: data.cost,
        mainCategoryId: data.mainCategoryId,
        characteristicsValues: values
    };


    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

    const resp = await fetch(url, {
        method:'POST',
        body: JSON.stringify(obj),
        headers: h,
    });
    const resp2 = await resp.json();
    console.log(resp2);

    //const p = await resp2;
    //console.log()
    return resp2;
}

