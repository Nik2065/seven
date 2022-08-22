
import {baseUrl, frontBaseUrl, loginPage, getAuthHeader, redirectToLoginPage } from './auth.js'


//Получение списка характеристик
export async function getCategories() {

    const url= baseUrl + '/Categories/GetAccounCategories';

    const resp = await fetch(url, {
        method:'GET',
        headers: 
        getAuthHeader(),

    });

    const obj = await resp.json();
    return obj;
}