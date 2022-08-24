
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


//Создание новой категории
export async function createCategory(name, description) {

    const url= baseUrl + '/Categories/CreateCategory';

    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

	
    const resp = await fetch(url, {
        method:'POST',
        headers: h,
        body: JSON.stringify({name: name, description: description})
    });

    const obj = await resp.json();
    return obj;
}


//Удаление  характеристики
export async function deleteCategory(id) {

    const url= baseUrl + '/Categories/DeleteCategory';
    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

    const resp = await fetch(url, {
        method:'POST',
        headers: h,
        body: JSON.stringify({categoryid: id})
    });

    const obj = await resp.json();
    return obj;
}