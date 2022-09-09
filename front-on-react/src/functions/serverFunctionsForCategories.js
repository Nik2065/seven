
import {baseUrl, frontBaseUrl, loginPage, getAuthHeader, redirectToLoginPage } from './auth.js'


//Получение списка категорий
export async function getPublicCategories(accountId) {

    const url= baseUrl + '/Categories/GetAccounCategories/' + accountId;

    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const resp = await fetch(url, {
        method:'GET',
        headers: h1
    });

    const obj = await resp.json();
    return obj;
}



//Получение списка категорий
export async function getAdminCategories() {

    const url= baseUrl + '/AdminCategories/GetAccounCategories';
    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

    const resp = await fetch(url, {
        method:'GET',
        headers: h
    });

    const obj = await resp.json();
    return obj;
}


//Создание новой категории
export async function createCategory(name, description) {

    const url= baseUrl + '/AdminCategories/CreateCategory';

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

    const url= baseUrl + '/AdminCategories/DeleteCategory';
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

//Удаление  характеристики
export async function getCategory(id) {

    const url= baseUrl + '/Categories/GetCategory/' + id;
    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const resp = await fetch(url, {
        method:'GET',
        headers: h1,
    });

    const obj = await resp.json();
    return obj;
}

