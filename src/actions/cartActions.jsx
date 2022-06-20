
const addProductToCart = function (product) {
    return {
      type: "ADD_PRODUCT",
      product
    }
  };
  const deleteProductFromCart = function (product) {
    return {
      type: "DELETE_PRODUCT",
      product
    }
  };
   
//module.exports = {addProductToCart, deleteProductFromCart};
export  {addProductToCart, deleteProductFromCart};