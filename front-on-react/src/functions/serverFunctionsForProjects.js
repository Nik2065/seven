
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


//
//загрузка лого на сервер
//
export async function uploadLogoOnServer(fileb64, filename, type, projectId){

    const url= baseUrl + '/FileStore/SaveFile';

    const req = {
        fileName: filename,
        extension: filename.split(".").pop(),
        fileDataBase64: fileb64,
        //fileDataBase64: "",
        destinationCode: "LOGO", //TODO: заменить константой
        projectId: parseInt(projectId),
        filetype: type
    }

    /*console.log(req.fileName);
    console.log(req.extension);
    console.log(req.fileDataBase64);
    console.log(req.destinationCode);
    console.log(req.projectId);*/


    //console.log();

    const h1 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    const h = Object.assign(h1, getAuthHeader());

    console.log(getAuthHeader());
    
    const resp = await fetch(url, {
        method: 'POST',
        headers: h,
        body: JSON.stringify(req)
    })

    const obj = await resp.json();
    return obj;
}


/*
function _arrayBufferToBase64String( buffer ) {
    let data = 'stackabuse.com';
    let buff = new Buffer(data);
    let base64data = buff.toString('base64');
    return base64data;
}*/