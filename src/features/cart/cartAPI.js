

export function fetchCart(sessionId){
  return new Promise((resolve) =>
  {
    console.log(sessionId);
    setTimeout(() => resolve( 
      [
        { id: 1,
          name: "Product 1",
          description: "very usefull product",
          cost: 100
        },
        { id: 4,
          name: "Product 4",
          description: "very usefull product",
          cost: 90.4
        }
      ] 
  ), 500)
}
);
}



