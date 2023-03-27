
export const baseUrl = 'http://localhost:5000';
export const frontBaseUrl = 'http://localhost:3000';

export const loginPage = frontBaseUrl + '/signin'

export function getAuthHeader(){
    const d = localStorage.getItem('authData');

    if(d == null) {
        redirectToLoginPage();
    }
    const data = JSON.parse(d);



    
    const end = Date.parse(data.expires);
    const current = new Date();
    //console.log(data.expires);
    //console.log({end});

    //если ключ просрочен, то тоже идем на страницу логина
    if(end<current){
        redirectToLoginPage();
    }

    return {
        'Authorization': 'Bearer ' + data.access_token,
    }
 }


export function redirectToLoginPage(){
    window.location.replace(loginPage);
    //let history = useHistory();
    //history.push("/home");
}


