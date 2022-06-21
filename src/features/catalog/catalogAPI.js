
// A mock function to mimic making an async request for data
export function fetchProductsListMainPage() {
    return new Promise((resolve) =>
      setTimeout(() => resolve(
        [
          { id: 1,
            name: "Product 1",
            description: "very usefull product",
            cost: 100
          },
          { id: 2,
            name: "Product 2",
            description: "very usefull product",
            cost: 34
          },
          { id: 3,
            name: "Product 3",
            description: "very usefull product",
            cost: 38
          },
          { id: 4,
            name: "Product 4",
            description: "very usefull product",
            cost: 90.4
          }
        ] 
      ), 2000)
    );
}

export function fetchProductsListByCategory(amount = 1) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
}
