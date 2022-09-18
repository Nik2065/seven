
import {baseUrl, frontBaseUrl, loginPage, getAuthHeader, redirectToLoginPage } from './auth.js'


export async function getCartBySessionId(sessionId) {
    const url = baseUrl + '/Cart/GetCartBySessionId?sessionId=' + sessionId;

    const resp = await fetch(url);
    const res = await resp.json();
    
    return res;

}



export async function setProductsInCartOnServer(productQuantityPair, localSessionId){
    const url = baseUrl + '/Cart/ChangeCartProductQuantity';

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





//
// для администрирования
//

/*export async function getAdminProductsList(){
    const url = baseUrl + '/Catalog/GetAllCatalogItems';

    const resp = await fetch(url);
    const res = await resp.json();
    return res;
}*/



 




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

        let body = {};
        const res = await fetch(url, {
            method:'POST',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        //пока убираем ограничение по коду
        //if(res.status === 200){

            body = await res.json();
            return body;
        //}




        /*.then((res) => {
            //console.log({res});
            //console.log("res.status " + res.status);

            //const j = res.json();
            //console.log({j});


            if(res.status === 200) {
                authResult.success = true;

                res.json().than(body => {
                    
                    return body;

                });
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

        })*/
        //TODO: обработка отсутствия сети
        /*.catch(error => {
            //console.log(error);
            if(error.name == 'NetworkError')
                console.log("some network error");

            authResult.success = false;
            authResult.message = "Ошибка сети";
            return authResult;
        });*/
        
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



//Получение списка характеристик
export async function getCharacteristics() {

    const url= baseUrl + '/Characteristics/GetAccountCharacteristics';

    const resp = await fetch(url, {
        method:'GET',
        headers: 
        getAuthHeader(),

    });

    const obj = await resp.json();
    return obj;
}

//Создание новой характеристики
export async function createCharacteristic(name, description) {

    const url= baseUrl + '/Characteristics/CreateCharacteristic';

    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

	
    const resp = await fetch(url, {
        method:'POST',
        headers: h,
        body: JSON.stringify({cname: name, description: description})
    });

    const obj = await resp.json();
    return obj;
}

//Удаление  характеристики
export async function deleteCharacteristic(id) {

    const url= baseUrl + '/Characteristics/DeleteCharacteristic';
    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

    const resp = await fetch(url, {
        method:'POST',
        headers: h,
        body: JSON.stringify({characteristicid: id})
    });

    const obj = await resp.json();
    return obj;
}