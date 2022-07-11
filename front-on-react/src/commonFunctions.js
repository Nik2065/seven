




export function getLocalSessionId() { 
        const sessionId = localStorage.getItem('sessionId');
        //console.log(sid);
        if(sessionId == null) {
            const g = createGuid();
            localStorage.setItem('sessionId', g);
        }

        return sessionId;
}

function createGuid()
{  
   /*return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   });*/
   return '167438a6-4e75-4c15-bd5b-0a6610f92212';  
}

export function coutCartSum(items){

   let s = 0;
   if(items != null && items !== undefined && items.length >0)
       items.forEach(item =>{s+=(item.product.cost * item.qty)});

   return s;
}
