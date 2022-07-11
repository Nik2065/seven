
const baseUrl = 'http://localhost:49153';


export async function GetCartBySessionId(sessionId) {
    const url = baseUrl + '/Cart/GetCartBySessionId?sessionId=' + sessionId;

    const resp = await fetch(url);
    const res = await resp.json();
    
    return res;

}