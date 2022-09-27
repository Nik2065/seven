
import {baseUrl,  getAuthHeader } from './auth.js'



//с авторизацией
export async function getProjects() {

    const url= baseUrl + '/Projects/GetAccountProjects';

    const resp = await fetch(url, {
        method:'GET',
        headers: 
        getAuthHeader(),

    });

    const obj = await resp.json();
    //const p = await obj.product;
    //console.log()
    return obj;
}


export async function getProject(projectId){

    
    const url= baseUrl + '/Projects/GetProject/' + projectId;

    const resp = await fetch(url, {
        method:'GET',
        headers: getAuthHeader(),
    });

    const obj = await resp.json();
    return obj;
}



export async function saveProject(projectId, projectName, projectDescription){

    
    const url= baseUrl + '/Projects/SaveProjectMainData';

    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
    };

    const h = Object.assign(h1, getAuthHeader());

    const req = {
        id: parseInt(projectId),
        projectName: projectName,
        description: projectDescription
    }
    
    //console.log(req);

    const resp = await fetch(url, {
        method:'POST',
        headers: h,
        body: JSON.stringify(req)
    });

    const obj = await resp.json();
    return obj;

    //return {};
}


export async function createProject(projectName, projectDescription){

    
    const url= baseUrl + '/Projects/CreateProject';

    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const h = Object.assign(h1, getAuthHeader());

    const req = {
        projectName: projectName,
        projectDescription: projectDescription
    }
    
    //console.log(req);

    const resp = await fetch(url, {
        method:'POST',
        headers: h,
        body: JSON.stringify(req)
    });

    const obj = await resp.json();
    return obj;

    //return {};
}



export async function getAccountId(projectid){

    const url= baseUrl + '/Projects/GetAccountIdByProjectId/' + projectid;
    const resp = await fetch(url);
    const obj = await resp.json();
    return obj;
}


export async function GetProjectPageComponents(projectid){

    const url= baseUrl + '/Projects/GetProjectPageComponents/' + projectid;
    const resp = await fetch(url);
    const obj = await resp.json();
    return obj;

}

export async function GetCarouselSettings(componentid){

    const url= baseUrl + '/Projects/GetCarouselComponentSettings/' + componentid;
    const resp = await fetch(url);
    const obj = await resp.json();
    return obj;

}

