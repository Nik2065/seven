
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



export function generateGuid(){
   var d = new Date().getTime();//Timestamp
   var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16;//random number between 0 and 16
       if(d > 0){//Use timestamp until depleted
           r = (d + r)%16 | 0;
           d = Math.floor(d/16);
       } else {//Use microseconds since page-load if supported
           r = (d2 + r)%16 | 0;
           d2 = Math.floor(d2/16);
       }
       return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
   });
}



export function getLocalAuthData(){
   localStorage.getItem('authData');
}

export function getLocalAuthToken(){
   const d = localStorage.getItem('authData');
   return d.access_token;
}

export function setLocalAuthToken(authData){
   localStorage.getItem('authData', authData);
}

/*
export function countCartSum(items){

   let s = 0;
   if(items != null && items !== undefined && items.length >0)
       items.forEach(item =>{s+=(item.product.cost * item.qty)});

   return s;
}

export function createCartTitle(cout, sum){
   return  cout + ' | ' + sum + ' ₽'
}

export function countItems(items){
   let s = 0;
   if(items != null && items !== undefined && items.length >0)
       items.forEach(item =>{s+= item.qty});

   return s;
}
*/

export function getArrayOfSubArray(array, elementsInRow){
    
   let size = elementsInRow; //размер подмассива
   let arrayOfSubArray = [];
   let subarray = []; //массив в который будет выведен результат.

   for (let i = 0; i <Math.ceil(array.length/size); i++){
       subarray[i] = array.slice((i*size), (i*size) + size);
       arrayOfSubArray.push(subarray[i]);
   }
   
   return arrayOfSubArray;
}

