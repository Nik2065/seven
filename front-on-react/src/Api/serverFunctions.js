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