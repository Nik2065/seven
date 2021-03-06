//
import { useHistory } from "react-router-dom";

const baseUrl = 'http://localhost:49153';

const loginPage = baseUrl + '/adminlogin'



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





//
// для администрирования
//

/*export async function getAdminProductsList(){
    const url = baseUrl + '/Catalog/GetAllCatalogItems';

    const resp = await fetch(url);
    const res = await resp.json();
    return res;
}*/



 
 function getAuthHeader(){
    const d = localStorage.getItem('authData');

    return {
        'Authorization': 'Bearer ' + d.access_token,
    }
 }

//с авторизацией
export async function getProjects() {

    const url= baseUrl + '/Projects/GetAccountProjects';

    const resp = await fetch(url, {
        method:'GET',
        headers: getAuthHeader(),
    });
    
    const obj = await resp.json();
    const p = await obj.product;
    //console.log()
    return p;
}




export async function SaveProduct(product) {
    const url= baseUrl + '/Catalog/SaveProduct';


    const obj = {
        id: product.id,
        name: product.name,
        description: product.description,
        cost: product.cost
    };

    const resp = await fetch(url, {
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });
    const resp2 = await resp.json();
    console.log(resp2);

    //const p = await resp2;
    //console.log()
    return resp2;
}


export async function Auth(login, password) {

    let authResult = {
        success: true,
        message: "",
        token: ""
    };

    const url= baseUrl + '/Auth/Token';

    const obj = {
        username: login,
        password: password
    };

    /*const res = await fetch(url, {
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });*/

    //try {

        fetch(url, {
            method:'POST',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            console.log({res});


            if(res.status === 200) {
                authResult.success = true;

            }
            else if(res.status === 403){
                authResult.success = false;
                authResult.message = "Неправильный логин или пароль";
                
            }
            else {
                authResult.success = false;
                authResult.message = res.statusText;
            }

            return authResult;

        })
        .catch(error => {
            //console.log(error);
            if(error.name == 'NetworkError')
                console.log("some network error");

            authResult.success = false;
            authResult.message = "Ошибка сети";
            return authResult;
        });
        
    //}
    //catch(catchErr){
    //    console.log({catchErr});
    //    authResult.success = false;
    //    authResult.message = catchErr;
    //    return authResult;
    //}

    //const res2 = await res.json();

    //console.log({res2});

    //return res2;
}

/*export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
}*/


function redirectToLoginPage(){
    window.location.replace(loginPage);
    //let history = useHistory();
    //history.push("/home");
}




//запрос, обернутый авторизацией
export async function CreateAuthPostRequest(url, requestBody, addHeaders){
    
    const localStorageUser = localStorage.getItem('user');
    if(localStorageUser == null || localStorageUser== undefined)
        redirectToLoginPage();

    const user = JSON.parse(localStorageUser);
    if(!user || !user.accessToken){
        redirectToLoginPage();
    }
    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let h =  Object.assign(h1, addHeaders);

    const res = await fetch(url, {
        method:'POST',
        body: JSON.stringify(requestBody),
        headers: h,
    });

    console.log({res});

    //проверка кода
    //todo: дополнить обработкой других кодов
    let resStatus = res.status;
    if(resStatus === 403)
        redirectToLoginPage();

    
    const res2 = await res.json();
    return res2;
} 