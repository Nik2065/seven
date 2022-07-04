import React from 'react';


export default function SimpleCart(products) {
{
    //<ul>
    //{products.map((item, i) => {
    //    return <li key={i}>{item.id + "-" + item.name}</li>})}
    //</ul>
    console.log(products);
    <div><hr/></div>
    if(products.array != undefined){
        products.array.map((item, i) => {
        return <div key={i}>{item.name}</div>
   });
}
}
}